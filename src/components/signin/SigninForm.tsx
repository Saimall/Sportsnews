/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
  password: string;
};
const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: { email: any; password: any; }) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json(); //used to observe the response body and find token
      console.log(data.token); //checking token
      if (!response.ok && !data.token) {
        throw new Error("Sign-in failed");
      } else {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        navigate("/home");
      }

      console.log("Sign-in successful");

      // Dialogue: After successful signin we have to redirect the user to the secured page. We will do that later.
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
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
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;