import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import {
  createTodo,
  getTodoById,
  updateTodo,
} from "../../services/TodoService";
import { buttonClass, inputClass } from "../../styles/FromStyle";
import TodoList from "./TodoList";

export default function TodoForm({ fromProps }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [getId, setGetId] = useState();
  const {
    isUpdate,
    setIsUpdate,
    todos,
    setTodos,
    isAuthorized,
    setIsAuthorized,
    isLoading,
    setIsLoading,
  } = fromProps;
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle edit...
  var todoId;
  const handleUpdate = async (id) => {
    try {
      const response = await getTodoById(id, headers);
      setFormData(response.data.data);
      setGetId(id)
      setIsUpdate(true);
    } catch (error) {
      console.error(error.data);
    }
  };

  // save or update todo on database.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      // Handle sign-in
      const response = await updateTodo(headers, formData, getId);
      const { status, message } = response.data;
      if (status === "success") {
        handleResponse(status, message, "success");
        setIsUpdate(false);
        setFormData({ title: "", description: "" }); // Clear form data
      }
    } else {
      // Handle registration
      const response = await createTodo(formData, headers);
      console.log(response);
      const { status, message } = response.data;
      handleResponse(status, message, "success");
      setFormData({ title: "", description: "" }); // Clear form data
    }
  };

  const handleResponse = (status) => {
    const ACTION = isUpdate ? "Updated" : "Created";
    const position = "top";
    const timer = 1500;
    const icon = status === "success" ? "success" : "error";
    const title =
      status === "success"
        ? `Todo ${ACTION} successfully`
        : `An error occurred while trying to ${ACTION.toLowerCase()} the todo.`;

    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer,
    });
  };

  return (
    <Fragment>
      <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-2 w-full lg:w-3/4 lg:max-w-lg">
          <form onSubmit={handleSubmit}>
            <h1 className="text-grey-darkest mb-4">Todo List</h1>
            <div className="mb-4">
              <input
                name="title"
                type="text"
                placeholder="Todo title"
                value={formData.title}
                required
                onChange={handleInputChange}
                className={`${inputClass} mb-4`}
              />
              <textarea
                className={`${inputClass} mb-4`}
                rows="3"
                name="description"
                type="textarea"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <button className={`${buttonClass}`}>Add</button>
            </div>
          </form>
          <TodoList
            fromProps={fromProps}
            formData={formData}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </Fragment>
  );
}
