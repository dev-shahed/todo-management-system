import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { changeStatus, deleteTodo, getTodos } from "../../services/TodoService";
import {
  buttonClass,
  dangerBtnClass,
  linkClass,
  successBtnClass,
} from "../../styles/FromStyle";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setIsAuthorized(true);
          const response = await getTodos(token);
          const { data, status } = response.data;
          if (status === "success") {
            setTodos(data);
          }
        }
      } catch (error) {
        setIsAuthorized(false);
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
        console.error(`Error ${error.message}ing todo:`, error);
        Swal.fire({
          title: "Error",
          text: `Failed to ${error.message} todo. Please try again.`,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="py-4">
      {isAuthorized ? (
        isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex my-6 items-center rounded shadow p-4 bg-pink-200"
              >
                <div className="flex-grow">
                  <p
                    className={todo.completed ? "line-through text-green" : ""}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={todo.completed ? "hidden" : "text-sm text-gray"}
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
