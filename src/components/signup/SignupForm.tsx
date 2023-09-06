import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  name: string;
  email: string;
  password: string;
};
const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name,  email, password } = data;

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
      if (!response.ok && !data.token) {
        throw new Error("sign-up failed");
      } else {
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        navigate("/home");
      }
      console.log("signup successful");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
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
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
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
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
    </form>
  );
};
export default SignupForm;