import os
import geemap
import ee
import rasterio
from flask import Blueprint, request, jsonify
from utils.clustering import flood_clustering
from utils.raster_loader import load_rasters

# Explicitly specify the project ID when initializing Earth Engine
ee.Initialize(project='my-project-disaster-assessment')  # Replace with your actual GEE project ID

# Create Blueprint
analysis_bp = Blueprint('analysis', __name__)

# Export image from Google Earth Engine to local storage
def export_ee_image_to_local(image, region, filename, scale=30):
    out_dir = 'data/exports'
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, filename)
    geemap.ee_export_image(
        image.clip(region),  # Use positional argument
        path,                # filename
        scale=scale,
        region=region.getInfo(),  # Required in latest geemap
        file_per_band=False
    )
    return path

# Function to save the clustered image as GeoTIFF
def save_clustered_image(clustered_image, filename):
    # Create raster profile dynamically
    height, width = clustered_image.shape
    profile = {
        'driver': 'GTiff',
        'height': height,
        'width': width,
        'count': 1,
        'dtype': clustered_image.dtype,
        'crs': 'EPSG:4326',
        'transform': rasterio.transform.from_origin(0, 0, 0.00025, 0.00025)  # Modify as per real georeferencing
    }

    with rasterio.open(filename, 'w', **profile) as dst:
        dst.write(clustered_image, 1)

# Endpoint to process flood data
@analysis_bp.route('/process_flood_data', methods=['POST'])
def process_flood_data():
    try:
        # Receive data from frontend
        data = request.json
        longitude = float(data['longitude'])
        latitude = float(data['latitude'])
        pre_start = data['pre_start']
        pre_end = data['pre_end']
        post_start = data['post_start']
        post_end = data['post_end']

        # Define region of interest (AOI) using provided coordinates (buffered by 10 km)
        aoi = ee.Geometry.Point([longitude, latitude]).buffer(10000).bounds()

        # Retrieve pre- and post-disaster satellite images from Sentinel-2
        preImage = ee.ImageCollection('COPERNICUS/S2') \
            .filterBounds(aoi) \
            .filterDate(pre_start, pre_end) \
            .median()
        postImage = ee.ImageCollection('COPERNICUS/S2') \
            .filterBounds(aoi) \
            .filterDate(post_start, post_end) \
            .median()

        # Define functions to calculate NDVI, NDWI, and NDBI
        def compute_ndvi(image):
            return image.normalizedDifference(['B8', 'B4'])

        def compute_ndwi(image):
            return image.normalizedDifference(['B3', 'B8'])

        def compute_ndbi(image):
            return image.normalizedDifference(['B11', 'B8'])

        # Calculate the change in indices (post - pre)
        ndviChange = compute_ndvi(postImage).subtract(compute_ndvi(preImage)).clip(aoi)
        ndwiChange = compute_ndwi(postImage).subtract(compute_ndwi(preImage)).clip(aoi)
        ndbiChange = compute_ndbi(postImage).subtract(compute_ndbi(preImage)).clip(aoi)

        # Export the change maps to local files
        ndvi_path = export_ee_image_to_local(ndviChange, aoi, 'ndvi_change.tif')
        ndwi_path = export_ee_image_to_local(ndwiChange, aoi, 'ndwi_change.tif')
        ndbi_path = export_ee_image_to_local(ndbiChange, aoi, 'ndbi_change.tif')

        # # Load the rasters for clustering
        # ndwi, ndvi, ndbi, _ = load_rasters(ndwi_path, ndvi_path, ndbi_path)

        # # Perform PCA and clustering (DBSCAN)
        # clustered_image = flood_clustering(ndwi, ndvi, ndbi)

        # # Save the clustered image
        # clustered_image_path = 'data/exports/flood_impact_pca.tif'
        # save_clustered_image(clustered_image, clustered_image_path)

        # Return success response
        return jsonify({
            'status': 'success',
            'message': 'Flood index maps exported successfully.',
            'files': {
                'ndvi': ndvi_path,
                'ndwi': ndwi_path,
                'ndbi': ndbi_path
            }
        })


    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })
