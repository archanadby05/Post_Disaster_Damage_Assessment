import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000", 
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000 // timeout to 10s
});

export default instance;
