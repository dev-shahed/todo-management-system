import React, { Fragment, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser, registerUser } from "../../services/AuthService";
import authData from "./data.json";

export default function Auth() {
  const { signInInputs, signUpInputs } = authData;
  const inputClass =
    "p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
  const buttonClass =
    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  const linkClass =
    "font-semibold leading-6 text-indigo-600 hover:text-indigo-500";

  const [signInMode, setSignInMode] = useState(true);
  const [formData, setFormData] = useState({});
  // const navigator = useNavigate();

  const switchMode = () => {
    setSignInMode(!signInMode);
    setFormData({}); // Clear form data when switching modes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signInMode) {
        // Handle sign-in
        const response = await loginUser(formData);
        console.log(response);
        const { status, message, accessToken } = response.data;
        if (status === "success") {
          localStorage.setItem("token", accessToken);
          handleResponse(status, message, "success");
        }
      } else {
        // Handle registration
        const response = await registerUser(formData);
        const { status, message } = response.data;
        handleResponse(status, message, "success");
      }
    } catch (error) {
      const { status, message } = error.response.data;
      handleResponse(status, message, "error");
    } finally {
      console.log("Let's go");
    }
  };

  const handleResponse = (status, message, icon) => {
    const position = "top";
    const timer = 1500;
    const swalConfig = {
      position,
      icon,
      title: `${message}`,
      showConfirmButton: false,
      timer,
    };
    Swal.fire(swalConfig);
  };

  return (
    <Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {signInMode ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Conditional rendering for sign-up or sign-in */}
            {signInMode
              ? signInInputs.map((input) => (
                  <div key={input.id}>
                    <label
                      htmlFor={input.id}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {input.label}
                    </label>
                    <div className="mt-2">
                      <input
                        id={input.id}
                        name={input.id}
                        type={input.type}
                        autoComplete={input.autoComplete}
                        required={input.required}
                        placeholder={input.placeholder}
                        value={formData[input.id] || ""}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))
              : signUpInputs.map((input) => (
                  <div key={input.id}>
                    <label
                      htmlFor={input.id}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {input.label}
                    </label>
                    <div className="mt-2">
                      <input
                        id={input.id}
                        name={input.id}
                        type={input.type}
                        autoComplete={input.autoComplete}
                        required={input.required}
                        placeholder={input.placeholder}
                        value={formData[input.id] || ""}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}

            <div>
              <button type="submit" className={buttonClass}>
                {signInMode ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            {signInMode
              ? "Don't have an Account? "
              : "Already have an account? "}
            <button className={linkClass} onClick={switchMode}>
              {signInMode ? "Create an Account" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
