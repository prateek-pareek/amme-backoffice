import React, { useState } from "react";
import logoIcon from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Page1: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://amme-api-pied.vercel.app/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      // You can store the token in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token);
      navigate("/access-administration");
    } catch (error) {
      console.error(error);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[367px] max-w-sm p-6 bg-white rounded-lg mx-auto mt-24">
      {/* Logo */}
      <div className="flex justify-center items-center m-auto h-12 w-12 p-2 rounded-sm bg-[#0C66E6] mb-6">
        <img src={logoIcon} alt="Logo" className="h-12 w-12" />
      </div>

      {/* Title */}
      <h2
        className="mb-6 text-[24px] font-semibold text-left text-black cursor-pointer"
        onClick={() => navigate("/resetPassword")}
      >
        Connexion
      </h2>

      {/* Form */}
      <form onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-[14px] font-normal text-black"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-[14px] font-normal text-black"
          >
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {/* Eye Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#E2E8F0"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7-11-7-11-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15c2.5 0 4.5-2 4.5-3s-2-3-4.5-3-4.5 2-4.5 3 2 3 4.5 3z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-black text-[14px] font-normal"
            >
              Rester connecté
            </label>
          </div>
          <a
            href="#"
            className="text-[14px] font-normal text-[#0C66E6] hover:underline"
          >
            Mot de passe oublié ?
          </a>
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-[#0C66E6] rounded-[4px] hover:bg-blue-700 mt-6 text-[16px] font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Page1;
