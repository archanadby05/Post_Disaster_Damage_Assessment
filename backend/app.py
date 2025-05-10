from flask import Flask, jsonify
from flask_cors import CORS

from routes.geojson import geojson_bp
from routes.analysis import analysis_bp 

app = Flask(__name__)
CORS(app)

app.register_blueprint(geojson_bp)
app.register_blueprint(analysis_bp)

@app.route('/')
def home():
    return "Server is running."

if __name__ == '__main__':
    app.run(debug=True)
