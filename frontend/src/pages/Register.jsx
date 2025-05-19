import CommonForm from "../components/common/CommonForm.jsx";
import { registerFormControl } from "../components/config/alllist";

import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/authSlices.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const intialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // Client-side confirm password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a copy of formData without confirmPassword
    const { confirmPassword, ...userData } = formData;
    console.log(confirmPassword)

    dispatch(registerUser(userData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/login");
        toast.success(data?.payload?.message);

        setFormData(intialState);
      } else {
        toast.error(data?.payload?.message);

        setFormData(intialState);
      }
    });
  };

  return (
    <div className="bg-slate-300 flex justify-center items-center h-screen overflow-hidden">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1733503711063-3427bff34612?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />{" "}
      </div>

      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground pb-1">
            Create an account
          </h1>
          <p>
            Already have an account?
            <Link to="/login" className="text-blue-400 hover:underline ml-2">
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControl}
          buttonText={"Sign up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
