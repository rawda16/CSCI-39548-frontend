// file to config api calls with axios

import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:8000",
});

// adding token to headers for authenticated routes
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

// remove token and go to homepage if unauthorized
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem("token");
         window.location.href = "/";
      }
      return Promise.reject(error);
   }
);

export default api;
