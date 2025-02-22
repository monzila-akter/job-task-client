import React from "react";
import { useNavigate } from "react-router";


const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-5">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-blue-900 leading-tight">
        Organize Your <span className="text-blue-600">Tasks</span> <br />
        Boost Your <span className="text-yellow-500">Productivity</span>
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Manage your tasks easily, stay organized, and accomplish more with an intuitive task board.
      </p>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/taskBoard")}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
      >
        Get Started 🚀
      </button>
    </div>
  );
};

export default Banner;
