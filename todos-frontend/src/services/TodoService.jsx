import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/todos";

export const getTodos = (token) => {
  // Set up headers with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(REST_API_BASE_URL, { headers });
};

export const createTodo = (todo, headers) => {
  // Set up headers with the token
  return axios.post(REST_API_BASE_URL, todo, { headers });
};

export const updateTodo = (token, updatedTodo, id) => {
  // Set up headers with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.put(`${REST_API_BASE_URL}/${id}`, { headers }, updatedTodo);
};
