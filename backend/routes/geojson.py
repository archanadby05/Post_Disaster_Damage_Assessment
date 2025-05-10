from flask import Blueprint, jsonify
from utils.geojson_generator import generate_geojson_from_clusters

geojson_bp = Blueprint('geojson', __name__)

@geojson_bp.route('/get_cluster_geojson', methods=['GET'])
def get_cluster_geojson():
    try:
        ndwi_path = 'data/exports/ndwi_change.tif'
        ndvi_path = 'data/exports/ndvi_change.tif'
        ndbi_path = 'data/exports/ndbi_change.tif'

        geojson = generate_geojson_from_clusters(ndwi_path, ndvi_path, ndbi_path)
        return jsonify(geojson)

    except Exception as e:
        return jsonify({'error': str(e)})
