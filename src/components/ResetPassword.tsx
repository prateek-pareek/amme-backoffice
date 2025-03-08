import React, { useState } from "react";
import logoIcon from "../assets/logo.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "./../axiosConfig";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Check if passwords match
  //   if (newPassword !== confirmPassword) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/auth/reset-password",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token, newPassword, confirmPassword }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message);

  //     setSuccessMessage("Password reset successful!");
  //     setError("");
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      token: token,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await api.post("/auth/reset-password", data);
      console.log("password reset successfull:", response.data);
      navigate("/success");
    } catch (error) {
      console.error(
        "Error updating user details:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="w-[367px] max-w-sm p-6 bg-white rounded-lg mx-auto mt-24">
      {/* Logo */}
      <div className="flex justify-center items-center m-auto h-12 w-12 p-2 rounded-sm bg-[#0C66E6] mb-6">
        <img
          src={logoIcon} // Replace with your logo's path
          alt="Logo"
          className="h-12 w-12"
        />
      </div>

      {/* Title */}
      <h2 className="mb-6 text-[24px] font-semibold text-left text-black">
        Reset Password
      </h2>

      {/* Error / Success Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mb-4">{successMessage}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block  text-[14px] font-normal text-black"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            // placeholder="Entrez votre email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-[14px] font-normal text-black"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#0C66E6] rounded-[4px] hover:bg-blue-700 mt-6 text-[16px] font-medium"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
export default ResetPassword;
