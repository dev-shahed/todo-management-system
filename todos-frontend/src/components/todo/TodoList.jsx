import React from "react";
import {
    dangerBtnClass,
    successBtnClass
} from "../../styles/FromStyle";

export default function TodoList() {
  return (
    <>
      <div className="flex my-4 p-4 items-center rounded shadow p-6 bg-pink-200">
        <div className="flex-grow">
          <p className="line-through text-green">
            Submit Todo App Component to Tailwind Components
          </p>
          <p className="text-sm text-gray">
            This is the description for the completed task.This is the
            description for the completed task.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className={successBtnClass}>Complete</button>
          <button className={dangerBtnClass}>Remove</button>
        </div>
      </div>
    </>
  );
}
