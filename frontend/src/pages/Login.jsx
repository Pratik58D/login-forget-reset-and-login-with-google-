import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signup, setSignUp] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen overflow-hidden">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1733503711063-3427bff34612?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">{signup === "signup" ? "Sign Up" : "L0gin"}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
        >
          {/* Username Input */}
          <div className="mb-2 bg-slate-300">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          {/* Email field if not login */}
          {signup !== "login" && (
            <div className="mb-2 bg-slate-300">
              <label htmlFor="extra" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="extra"
                name="extra"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          )}

          {/* Password Input */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>

          {/*confirm password */}
          {signup !== "login" && (
            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-800">
                {" "}
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
          )}

          {/* Remember Me Checkbox */}
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-red-500"
            />
            <label htmlFor="remember" className="text-green-900 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <a href="/reset-password" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {signup === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Sign up Link */}
        <div className="mt-6 text-green-500 text-center">
          <button
            onClick={() => setSignUp(signup === "signup" ? "login" : "signup")}
            className="hover:underline"
          >
            {signup === "signup"
              ? "Already have an Account ? Login"
              : "Dont't have an Account? Signup"}
          </button>
        </div>
        <div>
          sign in with google
        </div>
      </div>
    </div>
  );
};

export default Login;
