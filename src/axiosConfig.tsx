import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Create an Axios instance
const api = axios.create({
  baseURL: "https://amme-api-pied.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
