import React from "react";
import logoIcon from '../assets/logo.svg';


const Page3: React.FC = () => {
  return (
    <div className="w-[367px] max-w-sm p-6 bg-white rounded-lg mx-auto mt-24">
      {/* Logo */}
      <div className="flex justify-center items-center m-auto h-12 w-12 p-2 rounded-sm bg-[#0C66E6] mb-10">
        <img
          src={logoIcon} // Replace with your logo's path
          alt="Logo"
          className="h-12 w-12"
        />
      </div>

        {/* Title */}
        <h2 className="mb-8 text-xl font-semibold text-left text-black">
          Vous avez oublié votre mot 
          <br />de passe ?
        </h2>

        {/* Form */}
        <form>
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block  text-[14px] font-normal text-black"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-[6px] focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-[#0C66E6] rounded-[4px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        {/* Back to Login */}
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Retour à la connexion
          </a>
        </div>
      </div>
 
  );
};

export default Page3;
