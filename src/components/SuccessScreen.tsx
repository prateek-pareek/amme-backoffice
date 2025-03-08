import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo.svg";

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[367px] max-w-sm p-6 bg-white rounded-lg mx-auto mt-24 text-center">
      {/* Logo */}
      <div className="flex justify-center items-center m-auto h-12 w-12 p-2 rounded-sm bg-[#0C66E6] mb-6">
        <img src={logoIcon} alt="Logo" className="h-12 w-12" />
      </div>

      {/* Success Message */}
      <h2 className="mb-4 text-[24px] font-semibold text-black">
        Password Reset Successful!
      </h2>
      <p className="text-gray-600 mb-6">
        You can now log in with your new password.
      </p>

      {/* Go to Login Button */}
      <h2 className="w-full px-4 py-2 text-[#151515]  rounded-[4px]  text-[16px] font-medium">
        Go to Login Page of your App
      </h2>
    </div>
  );
};

export default SuccessScreen;
