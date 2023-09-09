/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constant";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import signinform from "./signinform.css";

type Inputs = {
  email: string;
  password: string;
};
type ErrorModalProps = {
  showErrorModal: boolean;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  showErrorModal,
  setShowErrorModal,
}) => {
  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showErrorModal ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-red-600 text-white rounded-lg p-4 shadow-lg z-10 w-96">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-xl font-bold">Sign-in Failed</h5>
          <button className="text-white text-2xl" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        <div className="mb-2">
          <p>There was an error signing in. Please try again.</p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SigninForm: React.FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: {
    email: any;
    password: any;
  }) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json(); //used to observe the response body and find token
      console.log(data.auth_token); //checking token
      if (!response.ok && !data.auth_token) {
        setShowErrorModal(true);
        return response.json();
      } else {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.auth_token);
        navigate("/home");
      }

      //error model

      console.log("Sign-in successful");

      // Dialogue: After successful signin we have to redirect the user to the secured page. We will do that later.
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            autoFocus
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.email && (
          <span className="text-red-600 text-sm font-bold block mt-2">
            This field is required!!!
          </span>
        )}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            autoFocus
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <span className="text-red-600 text-sm font-bold block mt-2">
              This field is required
            </span>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mr-2"
          >
            Sign In
          </button>

          <NavLink
            to="/signup"
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mr-2"
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/home"
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
          >
            Home
          </NavLink>
        </div>
      </form>
      <ErrorModal
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
      />
    </>
  );
};

export default SigninForm;
