import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { getFood } from "@/store/admin/foodSlice";
const BASE_URL = import.meta.env.VITE_API_URL;

const EditProductDrawer = ({ isOpen, onClose, food }) => {
  if (!isOpen) return null;
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //this is for setting user data initially if available
  React.useEffect(() => {
    dispatch(getFood());
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

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="w-full max-w-md bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Food</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              defaultValue={food.title}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Repeat for category, price, etc. */}
          <button className="btn btn-primary w-full mt-4">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductDrawer;
