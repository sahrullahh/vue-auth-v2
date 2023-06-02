import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    withCredentials: true,
    "Content-Type": "application/json",
  },
});

export default $axios;
