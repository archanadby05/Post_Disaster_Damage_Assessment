import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [preStart, setPreStart] = useState('');
  const [preEnd, setPreEnd] = useState('');
  const [postStart, setPostStart] = useState('');
  const [postEnd, setPostEnd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error('Error sending data to Flask:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Longitude:</label>
      <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />

      <label>Latitude:</label>
      <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />

      <label>Pre-disaster Start Date:</label>
      <input type="date" value={preStart} onChange={(e) => setPreStart(e.target.value)} />

      <label>Pre-disaster End Date:</label>
      <input type="date" value={preEnd} onChange={(e) => setPreEnd(e.target.value)} />

      <label>Post-disaster Start Date:</label>
      <input type="date" value={postStart} onChange={(e) => setPostStart(e.target.value)} />

      <label>Post-disaster End Date:</label>
      <input type="date" value={postEnd} onChange={(e) => setPostEnd(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
