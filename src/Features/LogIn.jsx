import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const HandleBack = () => {
    navigate("/MainPage");
  };

  const GoToDashBoard = () => {
    navigate("/DashBoard");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-mono">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center tracking-tight text-gray-900">
          Log In
        </h2>

        {/* Status Messages */}
        {status === "loading" && (
          <p className="text-blue-600 text-sm mb-4">Logging in...</p>
        )}
        {status === "failed" && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}
        {status === "succeeded" && (
          <p className="text-green-600 text-sm mb-4">Login successful!</p>
        )}

        {/* Inputs */}
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-600 text-sm"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-600 text-sm"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-900 text-black text-sm my-3 py-2 rounded hover:bg-gray-800 transition"
        >
          Log In
        </button>
        <button className="mx-4" onClick={HandleBack}>
          Back
        </button>
        <button onClick={GoToDashBoard}>Dashboard</button>
      </form>
    </div>
  );
};

export default LogIn;
