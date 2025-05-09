from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.analysis import analysis_bp 

app = Flask(__name__)
CORS(app)
app.register_blueprint(analysis_bp)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Post Disaster Damage Assessment System"})

if __name__ == '__main__':
    app.run(debug=True)
