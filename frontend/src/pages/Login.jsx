import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/authSlices.js";

const intialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword : ""
};

const Login = () => {
  const [formData, setFormData] = useState(intialState);
  const [signup, setSignUp] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();;

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,   
    }));
  };
  console.log(formData)

   const submit = (e) => {
    e.preventDefault();
     // Client-side confirm password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
   
     // Create a copy of formData without confirmPassword
    const { confirmPassword, ...userData } = formData;

    if(signup === "signup"){
      dispatch(registerUser(userData)).then((data)=>{
       if(data?.payload?.success) {
        navigate("/home");
        // toast.success(data?.payload?.message);
        console.log(data?.payload?.message)
        setFormData(intialState) ;    
       }else{
        // toast.error(data?.payload?.message);
        console.log(data?.payload?.message)
        setFormData(intialState);
       }
      })
    }
  };


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
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {signup === "signup" ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={submit}>
          {/* Username Input */}
          <div className="mb-2 bg-slate-300">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={formData.userName}
              onChange={handleChange}
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
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                value={formData.email}
              onChange={handleChange}

              />
            </div>
          )}

          {/* Password Input */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={formData.password}

              onChange={handleChange}

            />
          </div>

          {/*confirm password */}
          {signup !== "login" && (
            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-600">
                {" "}
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={formData.confirmPassword}
                onChange={handleChange}
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
        <div>sign in with google</div>
      </div>
    </div>
  );
};

export default Login;
