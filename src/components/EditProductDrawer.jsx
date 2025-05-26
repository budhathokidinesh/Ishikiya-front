import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { editFood, getFood } from "@/store/admin/foodSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

const EditProductDrawer = ({ isOpen, onClose, food }) => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    available: "true",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //this is for setting user data initially if available
  React.useEffect(() => {
    if (food) {
      setFormData({
        title: food?.title || "",
        description: food?.description || "",
        category: food?.category || "",
        price: food?.price || "",
        available: food?.available?.toString() || "false",
      });
      setImage({
        url: food?.image?.url || "",
        public_id: food?.image?.public_id || "",
      });
    }
  }, [food]);
  if (!isOpen) return null;
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
      _id: food._id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      available: formData.available,
      imageUrl: image.url,
    };
    try {
      await dispatch(
        editFood({ id: food._id, formData: updatedData })
      ).unwrap();
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

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 flex justify-end">
      <div className="w-full max-w-md bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Food</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto items-center rounded-md px-8 py-5"
        >
          {/* This is for title  */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Please type title of food"
              required
              value={formData.title}
              onChange={handleOnChange}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* This is for description  */}
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Please write something about this food item"
              required
              value={formData.description}
              onChange={handleOnChange}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* this is for category */}
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="category"
            >
              Please selcet category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleOnChange}
              defaultValue="Please select type"
              className="select"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Fish and chips">Fish and chips</option>
              <option value="Drinks">Drinks</option>
              <option value="Burger">Burger</option>
            </select>
          </div>
          {/* This is for price  */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={formData.price}
              onChange={handleOnChange}
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* This is for available  */}
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="available"
            >
              Availability
            </label>
            <select
              name="available"
              value={formData.available}
              onChange={handleOnChange}
              defaultValue="Please select"
              className="select"
            >
              <option value="" disabled>
                Pick Availablity
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {/* this is for Images  */}
          <div className="mb-3">
            <input
              accept=".jpg .png .jpeg"
              onChange={handleImage}
              name="myFile"
              type="file"
              className="file-input file-input-ghost"
            />
            <label className="block text-gray-700 text-sm mb-2">
              Add Images
              {uploading && (
                <div className="text-center text-sm text-gray-600 mb-2">
                  Uploading image, please wait...
                </div>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-8 py-2 text-xl font-medium text-white rounded-full mt-3 mb-2 cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-400 hover:shadow-xl active:scale-90 shadow-md transition duration-150"
            }`}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductDrawer;
