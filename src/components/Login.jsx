import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login as authLogin } from "../features/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth.js";
import { useForm } from "react-hook-form";

function Login() {
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("null");

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className=" space-y-5">
            <Input
            label="Email: "
            type="email"
            placeholder="Enter the email pls"
            {
              ...register("email", {
                required: "Email is required",
                validate: {
                matchPattern: (val)=>  /^\S+@\S+$/.test (val) || "Invalid email format",  
                },
              })}            
            />
            <Input
            label="Password: "
            type="password" 
            placeholder="Enter password"
            {...register("password", {
              required: true,
            })}
            />
            <Button>Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
