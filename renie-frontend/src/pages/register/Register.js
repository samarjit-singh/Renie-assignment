import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userRoute } from "../../utils/ApiRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let response;
      if (isNewUser) {
        response = await axios.post(userRoute, {
          email: formData.email,
          name: formData.name,
        });
      } else {
        response = await axios.get(`${userRoute}/email/${formData.email}`);
      }

      localStorage.setItem("userData", JSON.stringify(response.data));

      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("API Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleUserType = () => {
    setIsNewUser(!isNewUser);
    setFormData({
      email: "",
      name: "",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-[#CDE8E5] from-[#7AB2B2]">
      <div className="bg-white flex flex-col items-center w-80 lg:w-96 h-96 lg:h-96 font-mono border-b-8 border-b-[#3D3B40] border-r-8 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40]">
        <div className="flex flex-col items-center justify-center gap-y-2 mt-10">
          <h1 className="font-bold">🔐 Register</h1>
          <p className="font-medium">to continue to Renie</p>
          <div className="flex items-center mt-2">
            <button
              onClick={toggleUserType}
              className={`text-sm cursor-pointer ${
                isNewUser ? "text-sky-500" : "text-gray-500"
              }`}
            >
              New User
            </button>
            <span className="mx-2 text-gray-500">/</span>
            <button
              onClick={toggleUserType}
              className={`text-sm cursor-pointer ${
                !isNewUser ? "text-sky-500" : "text-gray-500"
              }`}
            >
              Existing User
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 mt-6 px-4"
        >
          {isNewUser && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your name"
              required={!isNewUser}
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-[#7AB2B2] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-200"
            disabled={loading}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
