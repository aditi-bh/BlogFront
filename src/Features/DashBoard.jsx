import React from "react";

const DashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Welcome to Your Dashboard
        </h2>
        <p className="text-center text-gray-700">
          This is a protected route only accessible to logged-in users.
        </p>
      </div>
    </div>
  );
};

export default DashBoard;
