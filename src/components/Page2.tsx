import React from 'react';
import logoIcon from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Page2: React.FC = () => {
 

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
        Connexion
      </h2>

      {/* Form */}
      <form>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block  text-[14px] font-normal text-black"
          >
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            // placeholder="Entrez votre email"
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
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              // placeholder="Entrez votre mot de passe"
            />
          </div>
          {/* Error Message */}
          
            <p className="mt-2 text-[14px] font-normal text-[#C53434]">Vos informations de connexion sont incorrectes</p>
         
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
          <Link to='/page3'>
          <a href="#" className="text-[14px] font-normal text-[#0C66E6] hover:underline">
            Mot de passe oublié ?
          </a>
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#0C66E6] rounded-[4px] hover:bg-blue-700  mt-6 text-[16px] font-medium "
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Page2;
