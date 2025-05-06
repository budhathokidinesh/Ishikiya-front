import React from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewFood } from "@/store/admin/foodSlice";

const initialState = {
  title: "",
  description: "",
  category: "",
  price: "",
  available: "",
};
const AddFood = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //this is for handling the image
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
      [name]: name === "available" ? value === "true" : value,
    }));
  };
  //this is handling submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //combining image url as well
    const fullFormData = {
      ...formData,
      imageUrl: image?.url || " ",
    };
    dispatch(addNewFood(fullFormData))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast(data?.payload?.message);
          navigate("/menu");
        } else {
          toast.error(data?.payload?.message);
        }
      })
      .catch(() => setLoading(false));
  };
  console.log(formData, "Form data");
  return (
    <div className="add-food">
      <div className="register">
        <div className="w-full mx-auto pt-[16vh] mb-4">
          <form
            onSubmit={handleOnSubmit}
            className="ease-in duration-300 w-[88%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  items-center rounded-md px-8 py-5"
          >
            <NavLink to="/">
              <img
                src="logo.png"
                alt=""
                className="logo mb-6 cursor-pointer text-center"
              />
            </NavLink>
            {/* This is for title  */}
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="name"
              >
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
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="price"
              >
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

            <button
              type="submit"
              className={`w-full px-8 py-2 text-xl font-medium text-white rounded-full mt-3 mb-2 cursor-pointer  bg-red-400 hover:shadow-xl active:scale-90 shadow-md transition duration-150`}
            >
              Add Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
