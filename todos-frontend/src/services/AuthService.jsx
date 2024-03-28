import axios from "axios";

const REST_API_AUTH_BASE_URL = "http://localhost:8080/api/auth";

export const registerUser = (user) => axios.post(`${REST_API_AUTH_BASE_URL}/register`, user);
export const loginUser = (user) => axios.post(`${REST_API_AUTH_BASE_URL}/login`, user);
