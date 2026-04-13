import { editUser, getUser } from "@/store/user/userSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Phone, Camera, Loader2, Save } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  React.useEffect(() => {
    if (user) setFormData({ name: user.name || "", phone: user.phone || "" });
  }, [user]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/all/upload-image`,
        fd,
      );
      setImage({ url: data.url, public_id: data.public_id });
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        editUser({
          name: formData.name,
          imageUrl: image.url,
          phone: formData.phone,
        }),
      ).unwrap();
      toast.success("Profile updated!");
      navigate("/menu");
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = image?.url || user?.profileImage || "pp.png";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{
        background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-sm border border-amber-100 p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-7">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer relative group"
            >
              <div className="relative w-20 h-20">
                {uploading ? (
                  <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-dashed border-amber-300 flex items-center justify-center">
                    <Loader2
                      size={22}
                      className="animate-spin text-amber-400"
                    />
                  </div>
                ) : (
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-100 group-hover:brightness-90 transition"
                  />
                )}
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Camera size={11} className="text-white" />
                </span>
              </div>
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={handleImage}
            />
            <p className="font-bold text-gray-800 text-sm mt-3">
              {user?.name || "—"}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <div className="border-t border-amber-50 mb-6" />

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Name
              </label>
              <div className="relative">
                <User
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400"
                />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleOnChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-amber-50 border border-amber-200 rounded-xl text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
                />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-100 rounded-xl text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Phone
              </label>
              <div className="relative">
                <Phone
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleOnChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-amber-50 border border-amber-200 rounded-xl text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isLoading || uploading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white text-sm font-bold rounded-full shadow transition mt-1"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Save size={14} /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
