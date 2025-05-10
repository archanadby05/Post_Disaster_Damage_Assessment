import rasterio
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from rasterio.features import shapes
import json
import os

def load_raster(file_path):
    with rasterio.open(file_path) as src:
        data = src.read(1)
        profile = src.profile
    return data, profile

def generate_geojson_from_clusters(ndwi_path, ndvi_path, ndbi_path, n_clusters=4):
    # Load rasters
    ndwi, profile = load_raster(ndwi_path)
    ndvi, _ = load_raster(ndvi_path)
    ndbi, _ = load_raster(ndbi_path)

    # Create valid data mask
    mask = (~np.isnan(ndwi)) & (~np.isnan(ndvi)) & (~np.isnan(ndbi))
    features = np.column_stack([ndwi[mask], ndvi[mask], ndbi[mask]])

    # Normalize and reduce dimensionality
    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)
    reduced = PCA(n_components=2).fit_transform(scaled)

    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(reduced)

    # Build clustered raster image
    clustered = np.full(ndwi.shape, -1, dtype=np.int32)
    clustered[mask] = labels

    # Extract geometries
    geometries = []
    for geom, val in shapes(clustered.astype(np.int32), mask=mask, transform=profile['transform']):
        geometries.append({
            "type": "Feature",
            "geometry": geom,
            "properties": {"cluster": int(val)}
        })

    geojson = {
        "type": "FeatureCollection",
        "features": geometries
    }

    # Save to static folder
    os.makedirs("static", exist_ok=True)
    with open("static/flood_clusters.geojson", "w") as f:
        json.dump(geojson, f)

    return geojson
