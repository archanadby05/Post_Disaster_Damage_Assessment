import React, { useState } from 'react';
import axios from 'axios';
import './styles/InputForm.css';

const InputForm = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [preStart, setPreStart] = useState('');
  const [preEnd, setPreEnd] = useState('');
  const [postStart, setPostStart] = useState('');
  const [postEnd, setPostEnd] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState(null); // To store file paths

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longitude || !latitude || !preStart || !preEnd || !postStart || !postEnd) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/process_flood_data', {
        longitude,
        latitude,
        pre_start: preStart,
        pre_end: preEnd,
        post_start: postStart,
        post_end: postEnd,
      });

      if (response.data.status === 'success') {
        setError('');
        setFiles(response.data.files); // Store file paths
      } else {
        setError('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error sending data to Flask:', error);
      setError('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="input-form">
        {/* Form fields */}
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />
        <input
          type="date"
          value={preStart}
          onChange={(e) => setPreStart(e.target.value)}
        />
        <input
          type="date"
          value={preEnd}
          onChange={(e) => setPreEnd(e.target.value)}
        />
        <input
          type="date"
          value={postStart}
          onChange={(e) => setPostStart(e.target.value)}
        />
        <input
          type="date"
          value={postEnd}
          onChange={(e) => setPostEnd(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* Display download links if files are received */}
      {files && (
        <div>
          <h2>Download the Resulting Files:</h2>
          <p><a href={files.ndvi} target="_blank" rel="noopener noreferrer">Download NDVI Change</a></p>
          <p><a href={files.ndwi} target="_blank" rel="noopener noreferrer">Download NDWI Change</a></p>
          <p><a href={files.ndbi} target="_blank" rel="noopener noreferrer">Download NDBI Change</a></p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
