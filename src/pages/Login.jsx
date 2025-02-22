import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://job-task-server-10p0.onrender.com"
})

const Login = () => {
    const { googleLogin, setUser, user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to save user data to MongoDB
    const saveUserToDatabase = (user) => {
        if (!user) return;
  
        axiosSecure
          .post("/users", {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
          .then((response) => {
            console.log("User saved:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
      };

 // Handle Google login
 const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        console.log(result.user)

        saveUserToDatabase(result.user)

        setUser(result.user);
        navigate(location?.state? location.state : "/")  // Redirect to home or dashboard
        Swal.fire({
          title: 'Success!',
          text: 'Logged In Successfully with Google',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
      .catch(err => {
        toast.error("Google login failed: " + err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <div className="bg-white rounded-lg shadow-2xl py-14 px-10 w-full max-w-md text-center">
        {/* Task Board Illustration */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176360.png"
            alt="Task Management"
            className="w-24 h-24"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800">Welcome to TaskBoard</h2>
        <p className="text-gray-500 mt-2">Manage your tasks efficiently</p>

        {/* Google Sign-In Button */}
        <button
         onClick={handleGoogleLogin}
          type="submit"
          className="mt-6 w-full btn flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-lg text-white font-medium rounded-lg transition-all duration-300"
        >
          <FaGoogle className="text-lg" />
          Sign in with Google
        </button>

        {/* Fun Elements */}
        <div className="mt-6 text-gray-400 text-sm">
          🚀 Stay organized & boost productivity!
        </div>
      </div>
    </div>
  );
};

export default Login;
