import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-3itu.onrender.com/api"
});

export default API;