import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function Todo() {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isUpdate ? "Update your todo" : "Create a todo"}
          </h2>
        </div>
        <TodoForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
      </div>
    </div>
  );
}
