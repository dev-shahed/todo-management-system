/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { changeStatus, deleteTodo } from "../../services/TodoService";
import {
  buttonClass,
  dangerBtnClass,
  linkClass,
  successBtnClass,
} from "../../styles/FromStyle";

function TodoList({ fromProps }) {
  const {
    isUpdate,
    setIsUpdate,
    todos,
    setTodos,
    isAuthorized,
    isLoading
  } = fromProps;
  
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
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
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

  if (todos && todos.length <= 0) {
    return (
      <h3 className="text-center my-5">No todos to show. Please create one.</h3>
    );
  }

  return (
    <div className="py-4">
      {isAuthorized ? (
        isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <div>
            {todos &&
              todos.length > 0 &&
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex my-6 items-center rounded shadow p-4 bg-pink-200"
                >
                  <div className="flex-grow">
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
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handleAction(
                          todo.id,
                          "statusChange",
                          todo.completed ? "incomplete" : "complete"
                        )
                      }
                      className={todo.completed ? successBtnClass : buttonClass}
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
              ))}
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

export default memo(TodoList);
