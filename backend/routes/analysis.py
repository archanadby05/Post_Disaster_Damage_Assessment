from flask import Blueprint, request, jsonify
import ee

analysis_bp = Blueprint('analysis', __name__)

# Initialize Earth Engine only once
ee.Initialize(project='my-project-disaster-assessment')

@analysis_bp.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    latitude = float(data.get('latitude'))
    longitude = float(data.get('longitude'))
    pre_start = data.get('pre_start')
    pre_end = data.get('pre_end')
    post_start = data.get('post_start')
    post_end = data.get('post_end')

    try:
        aoi = ee.Geometry.Point(longitude, latitude).buffer(5000)

        pre_image = ee.ImageCollection("COPERNICUS/S2") \
            .filterBounds(aoi).filterDate(pre_start, pre_end).median()

        post_image = ee.ImageCollection("COPERNICUS/S2") \
            .filterBounds(aoi).filterDate(post_start, post_end).median()

        def compute_ndvi(img):
            return img.normalizedDifference(['B8', 'B4']).rename('NDVI')

        pre_ndvi = compute_ndvi(pre_image)
        post_ndvi = compute_ndvi(post_image)

        ndvi_diff = post_ndvi.subtract(pre_ndvi).rename('NDVI_Change')

        def get_mean(img):
            return img.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=aoi,
                scale=30,
                maxPixels=1e9
            ).get('NDVI').getInfo()

        pre_mean = get_mean(pre_ndvi)
        post_mean = get_mean(post_ndvi)
        change_mean = post_mean - pre_mean

        return jsonify({
            "status": "success",
            "pre_ndvi_mean": pre_mean,
            "post_ndvi_mean": post_mean,
            "ndvi_change_mean": change_mean
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
