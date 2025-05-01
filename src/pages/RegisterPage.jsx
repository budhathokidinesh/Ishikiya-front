import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register">
      <div className="w-full mx-auto pt-[16vh] mb-4">
        <form className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  items-center rounded-md px-8 py-5">
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              src="pp.png"
              alt=""
              className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
            />
          </label>
          <label className="block text-center text-gray-900 text-base mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            className="hidden"
            accept=".jpg .png .jpeg"
          />
          {/* This is for name  */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Please type your name"
              required
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* This is for email  */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@site.com"
              required
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* this is for phone number  */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Please provide your phone number"
              required
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* This is for password  */}
            <div className="mb-3 flex-1">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="********"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
            {/* This is for confirm password  */}
            <div className="mb-3 flex-1">
              <label className="block text-gray-700 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="********"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-400 active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium text-white rounded-full cursor-pointer mt-3 mb-2"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="text-orange-400 text-center font-semibold w-full mb-3 py-2 px-4 rounded "
          >
            Already have Account?{" "}
            <span className="text-green-700 ">Login Now!</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
