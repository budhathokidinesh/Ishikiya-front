import { loginUser } from "@/store/auth/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  //this is for handling change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //this is handling submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //combining image url as well
    dispatch(loginUser(formData))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast(data?.payload?.message);
          //redirecting based on verfification and role
          const user = data?.payload?.user;
          if (user && user?.isVerified === false) {
            toast(data?.payload?.message || "Please verify your account.");
            navigate("/verify-otp");
          } else if (user?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/menu");
          }
        } else {
          toast.error(data?.payload?.message || "Please register your account");
          navigate("/register");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      });
  };
  console.log(formData);
  return (
    <div className="login">
      <div className="h-[85vh] pt-[17vh]">
        <form
          onSubmit={handleOnSubmit}
          className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
        >
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
              value={formData.email}
              onChange={handleOnChange}
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
              value={formData.password}
              onChange={handleOnChange}
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
