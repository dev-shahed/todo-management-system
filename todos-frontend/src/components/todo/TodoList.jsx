import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../../services/TodoService";
import {
  buttonClass,
  dangerBtnClass,
  linkClass,
  successBtnClass,
} from "../../styles/FromStyle";

export default function TodoList() {
  const [todos, setTodos] = useState();
  console.log(todos);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        // Make sure token exists before making the API call
        if (token) {
          // Include the token in the headers
          const response = await getTodos(token);
          const { data, status } = response.data;
          if (status === "success") {
            setTodos(data);
          }
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !isAuthorized) {
    return (
      <div className="py-4 text-center">
        <h3>
          {!isAuthorized ? (
            <div>
              Unauthorized! Please{" "}
              <span className={linkClass}>
                <Link to="/auth">login..</Link>
              </span>
            </div>
          ) : (
            "Loading..."
          )}
        </h3>
      </div>
    );
  }

  return (
    <>
      <div>
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex my-6 items-center rounded shadow p-4 bg-pink-200"
          >
            <div className="flex-grow">
              {/* Conditional rendering based on todo completion status */}
              <p className={todo.completed ? "line-through text-green" : ""}>
                {todo.title}
              </p>
              <p className={todo.completed ? "hidden" : "text-sm text-gray"}>
                {todo.description}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className={todo.completed ? successBtnClass : buttonClass}
              >
                {todo.completed ? "Completed" : "Complete"}
              </button>
              <button
                //onClick={() => handleRemove(todo.id)}
                className={dangerBtnClass}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
