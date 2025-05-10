# Post Disaster Damage Assessment System

A full-stack web application designed for detecting and visualizing flood-impacted zones using satellite image analysis, clustering algorithms, and weather data. Built with React for the frontend, Flask for the backend, and integrated with Google Earth Engine for geospatial analysis and OpenWeatherMap for weather data.

---

## Features

- Analyze satellite images for flood detection using NDVI, NDWI, and NDBI.
- Use PCA and KMeans clustering to detect flood zones.
- Display flood clusters on an interactive map.
- Fetch and display live weather data using the OpenWeatherMap API.
- Generate and download GeoJSON for flood zones.

---

## Tech Stack

- **Frontend**: React, Leaflet, Bootstrap 5
- **Backend**: Flask (Python), Flask-Restful
- **Geospatial & Analysis**: Google Earth Engine, rasterio, numpy, scikit-learn
- **Weather Data**: OpenWeatherMap API

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/post-disaster-damage-assessment.git
cd post-disaster-damage-assessment
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### Authenticate with Google Earth Engine:

```bash
earthengine authenticate
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

#### Create a `.env` file in the `frontend/` directory with your OpenWeatherMap API key:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

---

## Running the Application

### Start Flask Backend

```bash
cd backend
flask run
```

### Start React Frontend

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

---

## Project Structure

```
post-disaster-damage-assessment/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── utils/
│   ├── data/exports/
│   └── static/
│
├── frontend/
│   ├── src/components/
│   ├── src/styles/
│   └── .env
```

Powered by Google Earth Engine and OpenWeatherMap API.
