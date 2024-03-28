import React, { Fragment, useState } from "react";
import {
  buttonClass,
  inputClass
} from "../../styles/FromStyle";
import TodoList from "./TodoList";

export default function TodoForm({ isUpdate, setIsUpdate }) {
  const [formData, setFormData] = useState({});
  return (
    <Fragment>
      <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-2 w-full lg:w-3/4 lg:max-w-lg">
          <div>
            <h1 className="text-grey-darkest mb-4">Todo List</h1>

            <div className="mb-4">
              <input className={`${inputClass} mb-4`} placeholder="Add Todo" />
              <textarea
                className={`${inputClass} mb-4`}
                rows="3"
                placeholder="Add Description"
              ></textarea>
              <button className={`${buttonClass}`}>Add</button>
            </div>

            <TodoList/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
