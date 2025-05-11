import { editUser, getUser } from "@/store/user/userSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.user);

  //this is for setting user data initially if available
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
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
  //Handle form data change (Only name)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //submit profile update(only name and image)
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      name: formData.name,
      imageUrl: image.url,
      phone: formData.phone,
    };
    try {
      await dispatch(editUser(updatedData)).unwrap();
      toast.success(
        "Your profile updated successfully. Start ordering food now."
      );
      navigate("/menu");
    } catch (error) {
      console.error("Profile update failed", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  return (
    <div className="profile">
      <div className="register">
        <div className="w-full mx-auto pt-[16vh] mb-4">
          <form
            onSubmit={handleOnSubmit}
            className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto items-center rounded-md px-8 py-5"
          >
            <label htmlFor="file-upload" className="custom-file-upload">
              <img
                src={image?.url || "pp.png"}
                alt="Profile"
                className="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
              />
            </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              id="file-upload"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={handleImage}
            />

            {/* Name Field */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-2">Name</label>
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

            {/* Email (Disabled) */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                disabled
                className="shadow-sm bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 cursor-not-allowed"
              />
            </div>
            {/* This is for phone  */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-2">Phone</label>
              <input
                type="number"
                name="phone"
                onChange={handleOnChange}
                value={formData.phone}
                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLoading}
              className={`w-full px-8 py-2 text-xl font-medium text-white rounded-full mt-3 mb-2 cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-400 hover:shadow-xl active:scale-90 shadow-md transition duration-150"
              }`}
            >
              {loading ? "Updating profile..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
