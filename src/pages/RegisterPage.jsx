import { registerUser } from "@/store/auth/authSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const RegisterPage = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPasswordMismatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  //this is for handling profile picture
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/all/upload-image`,
        formData
      );
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.log(error);
    }
  };
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
    const fullFormData = {
      ...formData,
      profileImage: image?.url || " ",
    };
    dispatch(registerUser(fullFormData))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast(data?.payload?.message);
          navigate("/login");
        } else {
          if (data?.payload?.code === "EMAAIL_EXISTS") {
            toast.error("Email already exists. Please login now.");
          } else toast.error(data?.payload?.message);
        }
      })
      .catch(() => setLoading(false));
  };
  console.log(formData, "Form data");
  return (
    <div className="register">
      <div className="w-full mx-auto pt-[16vh] mb-4">
        <form
          onSubmit={handleOnSubmit}
          className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  items-center rounded-md px-8 py-5"
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            <img
              src={image?.url || "pp.png"}
              alt=""
              className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
            />
          </label>
          <label className="block text-center text-gray-900 text-base mb-2">
            Profile Picture
            {uploading && (
              <div className="text-center text-sm text-gray-600 mb-2">
                Uploading image, please wait...
              </div>
            )}
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            className="hidden"
            accept=".jpg .png .jpeg"
            onChange={handleImage}
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
              value={formData.name}
              onChange={handleOnChange}
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
              value={formData.email}
              onChange={handleOnChange}
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
              value={formData.phone}
              onChange={handleOnChange}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Password Field */}
            <div className="mb-3 flex-1">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="********"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={formData.password}
                onChange={handleOnChange}
                className={`shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        ${
          formData.password.length > 0 && formData.password.length < 8
            ? "border-red-500"
            : ""
        }
      `}
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must include: at least 8 characters, one number, one
                lowercase, and one uppercase.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3 flex-1">
              <label className="block text-gray-700 text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="********"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                className={`shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        ${isPasswordMismatch ? "border-red-500" : ""}
      `}
              />
              {isPasswordMismatch && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Confirm your password above.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isPasswordMismatch}
            className={`w-full px-8 py-2 text-xl font-medium text-white rounded-full mt-3 mb-2 cursor-pointer
    ${
      loading || isPasswordMismatch
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-400 hover:shadow-xl active:scale-90 shadow-md transition duration-150"
    }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
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
