import React, { useState } from "react";
import authService from "../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      let userData = await authService.createAccount(data);
      if (userData) {
        userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-[84px]">
      <div
        className={`mx-auto w-full max-w-lg bg-lightBlue rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2
          className="text-center text-2xl 
        font-bold leading-tight"
        >
          Create your account{" "}
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 mt-2">
            <Input
              required
              label="Full Name"
              type="text"
              placeHolder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input 
              required
              label="Email"
              type="email"
              placeHolder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (val) =>
                    /^\S+@\S+$/.test(val) || "Invalid email format",
                },
              })}
            />

            <Input required
              label="Password"
              type="password"
              placeHolder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full hover:scale-105 bg-navBlue border-gray-950 border">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
