import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ onSubmit }) => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [preStart, setPreStart] = useState('');
  const [preEnd, setPreEnd] = useState('');
  const [postStart, setPostStart] = useState('');
  const [postEnd, setPostEnd] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longitude || !latitude || !preStart || !preEnd || !postStart || !postEnd) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/process_data', {
        longitude,
        latitude,
        pre_start: preStart,
        pre_end: preEnd,
        post_start: postStart,
        post_end: postEnd,
      });
      console.log('Response:', response.data);
      setError('');
      onSubmit(); // Submit the form and switch to the next page layout
    } catch (error) {
      console.error('Error sending data to Flask:', error);
      setError('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="input-form">
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />

        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />

        <label>Pre-disaster Start Date:</label>
        <input
          type="date"
          value={preStart}
          onChange={(e) => setPreStart(e.target.value)}
        />

        <label>Pre-disaster End Date:</label>
        <input
          type="date"
          value={preEnd}
          onChange={(e) => setPreEnd(e.target.value)}
        />

        <label>Post-disaster Start Date:</label>
        <input
          type="date"
          value={postStart}
          onChange={(e) => setPostStart(e.target.value)}
        />

        <label>Post-disaster End Date:</label>
        <input
          type="date"
          value={postEnd}
          onChange={(e) => setPostEnd(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
