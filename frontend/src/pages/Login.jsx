import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFormControl } from "../components/config/alllist";
import { logInUser } from "../store/slices/authSlices";
import CommonForm from "../components/common/CommonForm";


const intialState = {
  userName: "",
  password: "",
}

const Login = () => {
  const [formData, setFormData] = useState(intialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();;

const onSubmit =(e) =>{
  e.preventDefault();
  dispatch(logInUser(formData)).then((data)=>{
    console.log(data)
    navigate("/home")
  })


}


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

         <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground pb-1">
            Login
          </h1>
          <p>
            Don't have an account?
            <Link to="/signup" className="text-blue-400 hover:underline ml-2">
              Signup
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControl}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>



      
    </div>
  );
};

export default Login;

