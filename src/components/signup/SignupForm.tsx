import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constant";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  name: string;
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
          <h5 className="text-xl font-bold">Sign-up Failed</h5>
          <button className="text-white text-2xl" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        <div className="mb-2">
          <p>There was an error in signing up!! Kindly check email. </p>
          <b>Please try again.</b>
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

const SignupForm: React.FC = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok && !data.auth_token) {
        setShowErrorModal(true);
        return response.json();
      } else {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.auth_token);
        navigate("/home");
      }
      console.log("signup successful");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            autoFocus
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        {errors.name && <span>This field is required!!!</span>}

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
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.email && <span>This field is required!!!</span>}
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
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.password && <span>This field is required!!!</span>}
        <div className="flex justify-center">
          <NavLink
            to="/signin"
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mr-2"
          >
            Sign In
          </NavLink>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 mr-2"
          >
            Sign up
          </button>

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
export default SignupForm;
