import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../../services/TodoService";
import {
  buttonClass,
  dangerBtnClass,
  linkClass,
  successBtnClass,
} from "../../styles/FromStyle";

function TodoList() {
  const [todos, setTodos] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isAuthorized, setIsAuthorized] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        // Make sure token exists before making the API call
        if (token) {
          setIsAuthorized(true);
          // Include the token in the headers
          const response = await getTodos(token);
          const { data, status } = response.data;
          if (status === "success") {
            setTodos(data);
          }
        }
      } catch (error) {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [isAuthorized]);

  return (
    <div className="py-4">
      {isAuthorized ? (
        isLoading ? (
          <h3 className="text-center">Loading...</h3>
        ) : (
          <div>
            {todos?.map((todo) => (
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
