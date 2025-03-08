import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
