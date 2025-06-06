import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/config/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/slices/authSlices";

const App = () => {
 const dispatch = useDispatch();
 const {isAuthenticated} = useSelector(state => state.auth);

 useEffect (()=>{
  dispatch(checkAuth());
 },[dispatch])

  console.log("checkauth,useEffect",isAuthenticated)
 


  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Default Route redirect to login */}

        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Protected Home Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
