import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../../services/TodoService";
import TodoForm from "./TodoForm";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthorized(false);
          // Redirect to authentication page
          navigator("/auth");
          return;
        }
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
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isUpdate ? "Update your todo" : "Create a todo"}
          </h2>
        </div>
        <TodoForm
          fromProps={{
            isUpdate,
            setIsUpdate,
            todos,
            setTodos,
            isAuthorized,
            setIsAuthorized,
            isLoading,
            setIsLoading,
          }}
        />
      </div>
    </div>
  );
}
