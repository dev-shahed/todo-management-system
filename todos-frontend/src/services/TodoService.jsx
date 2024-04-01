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

export const updateTodo = (headers, updatedTodo, id) => {
  return axios.put(`${REST_API_BASE_URL}/${id}`, updatedTodo, { headers });
};



export const deleteTodo = (id, headers) => {
  return axios.delete(`${REST_API_BASE_URL}/${id}`, { headers });
};

export const changeStatus = (id, headers, status) => {
  console.log(status)
  return axios.patch(`${REST_API_BASE_URL}/${id}/${status}`, null, { headers });
};

export const getTodoById = (id, headers) => {
  return axios.get(`${REST_API_BASE_URL}/${id}`, { headers });
};