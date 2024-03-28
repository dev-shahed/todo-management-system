import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/todos";

export const getTodos = (token) => {
  // Set up headers with the token
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return axios.get(REST_API_BASE_URL, { headers });
};

export const createTodo = (todo) => axios.post(REST_API_BASE_URL, todo);