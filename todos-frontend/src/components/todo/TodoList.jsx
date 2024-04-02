/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { changeStatus, deleteTodo } from "../../services/TodoService";
import {
  buttonClass,
  dangerBtnClass,
  linkClass,
  successBtnClass,
} from "../../styles/FromStyle";

function TodoList({ fromProps, formData, setFormData, handleUpdate }) {
  const { todos, setTodos, isAuthorized, isLoading } = fromProps;

  if (isAuthorized && isLoading && todos && todos.length <= 0) {
    return (
      <h3 className="text-center my-5">No todos to show. Please create one.</h3>
    );
  }

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleAction = async (id, actionType, todoStatus) => {
    let actionText = "";
    let actionFunction = null;

    if (actionType === "remove") {
      actionText = "delete";
      actionFunction = deleteTodo;
    } else if (actionType === "statusChange") {
      actionText =
        todoStatus === "complete" ? "mark as complete" : "mark as incomplete";
      actionFunction = changeStatus;
    }

    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${actionText}?`,
      text: "You can revert this anytime!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText} it!`,
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await actionFunction(id, headers, todoStatus);
        const { message, status } = response.data;
        setTodos((prevTodos) => {
          if (actionType === "remove") {
            return prevTodos.filter((todo) => todo.id !== id);
          } else if (actionType === "statusChange") {
            return prevTodos.map((todo) => {
              if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
              }
              return todo;
            });
          }
          return prevTodos;
        });
        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
        });
      } catch (error) {
        console.error(error.response.status);
        const errorMsg =
          error.response.status === 401 && actionType === "remove"
            ? "Can't delete, you don't have the permission!"
            : `Failed to ${actionType} todo, please try again`;
        Swal.fire({
          title: "Error",
          text: errorMsg,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="py-2">
      {isAuthorized ? (
        isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <div>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => handleUpdate(todo.id)}
                  className="w-full focus:outline-none mr-0 text-left cursor-pointer"
                >
                  <div className="flex justify-between flex-col sm:flex-row my-3 items-center rounded shadow p-4 bg-pink-200">
                    <div className="sm:w-2/3 sm:pr-4">
                      <p
                        className={
                          todo.completed ? "line-through text-green" : ""
                        }
                      >
                        {todo.title}
                      </p>
                      <p
                        className={
                          todo.completed ? "hidden" : "text-sm text-gray"
                        }
                      >
                        {todo.description}
                      </p>
                    </div>
                    <div className="flex sm:flex-col gap-2 py-4 sm:w-1/3 md:w-1/4">
                      <button
                        onClick={() =>
                          handleAction(
                            todo.id,
                            "statusChange",
                            todo.completed ? "incomplete" : "complete"
                          )
                        }
                        className={
                          todo.completed ? successBtnClass : buttonClass
                        }
                      >
                        {todo.completed ? "Completed" : "Incomplete"}
                      </button>
                      <button
                        onClick={() => handleAction(todo.id, "remove")}
                        className={dangerBtnClass}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-center my-5">
                No todos to show. Please create one.
              </h3>
            )}
          </div>
        )
      ) : (
        <h3 className="text-center">
          Unauthorized! Please{" "}
          <span className={linkClass}>
            <Link to="/auth">login..</Link>
          </span>
        </h3>
      )}
    </div>
  );
}

export default TodoList;
