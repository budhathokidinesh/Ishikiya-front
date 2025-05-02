import React from "react";
import { Link, NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="h-[85vh] pt-[17vh]">
        <form className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5">
          <NavLink to="/">
            <img
              src="./logo.png"
              alt=""
              className="logo mb-6 cursor-pointer text-center"
            />
          </NavLink>
          {/* Email  */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@site.com"
              required
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Password  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm mt-1 inline-block hover:underline mb-2"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="bg-red-400 active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium text-white rounded-full cursor-pointer"
          >
            Sign In
          </button>
          <Link
            to="/register"
            className="text-orange-400 text-center font-semibold w-full mb-3 py-2 px-4 rounded "
          >
            Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
