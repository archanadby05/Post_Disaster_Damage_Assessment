import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapDisplay = () => {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_cluster_geojson')
      .then((res) => res.json())
      .then((data) => setGeojson(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err));
  }, []);

  const style = (feature) => ({
    fillColor: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3'][feature.properties.cluster % 4],
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6,
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.cluster !== undefined) {
      layer.bindPopup(`Cluster: ${feature.properties.cluster}`);
    }
  };

  return (
  <div style={{ height: '100%', width: '100%', position: 'relative', zIndex: 0 }}>
    <MapContainer
      center={[26.7, 67.8]}
      zoom={10}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojson && <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} />}
    </MapContainer>
  </div>
);
};

export default MapDisplay;
