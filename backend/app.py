from flask import Flask, jsonify, request
from flask_cors import CORS  # For enabling CORS between React and Flask

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Post Disaster Damage Assessment System"})

if __name__ == '__main__':
    app.run(debug=True)