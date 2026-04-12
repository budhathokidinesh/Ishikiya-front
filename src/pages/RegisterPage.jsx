import { registerUser } from "@/store/auth/authSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Camera, User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPasswordMismatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/all/upload-image`, fd);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const fullFormData = { ...formData, profileImage: image?.url || "" };
    dispatch(registerUser(fullFormData))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          navigate("/verify-otp");
        } else {
          if (data?.payload?.code === "EMAAIL_EXISTS") {
            toast.error("Email already exists. Please login.");
          } else {
            toast.error(data?.payload?.message);
          }
        }
      })
      .catch(() => setLoading(false));
  };

  const inputClass = (hasError) =>
    `w-full pl-9 pr-4 py-2.5 bg-amber-50 border rounded-lg text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition ${
      hasError ? "border-red-400" : "border-amber-200"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(160deg, #fef3c7 0%, #fde68a 40%, #bfdbfe 100%)" }}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleOnSubmit}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl px-8 py-8 border border-amber-100"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <NavLink to="/" className="flex items-center gap-2 mb-3">
              <span className="text-4xl">🐟</span>
              <div className="text-left">
                <p className="text-xl font-extrabold text-amber-600 leading-tight tracking-tight">
                  The Chippy
                </p>
                <p className="text-[10px] font-medium text-blue-800 uppercase tracking-widest">
                  Fish &amp; Chips
                </p>
              </div>
            </NavLink>
            <h1 className="text-lg font-bold text-gray-800">Join the family</h1>
            <p className="text-xs text-gray-500 mt-0.5">Fresh battered goodness, delivered to you</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-amber-100" />
            <span className="text-amber-400 text-lg">🍟</span>
            <div className="flex-1 h-px bg-amber-100" />
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center mb-5">
            <label htmlFor="file-upload" className="group relative cursor-pointer">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-dashed border-amber-300 group-hover:border-amber-500 transition">
                {uploading ? (
                  <div className="h-full w-full flex items-center justify-center bg-amber-50">
                    <Loader2 size={22} className="text-amber-400 animate-spin" />
                  </div>
                ) : (
                  <img
                    src={image?.url || "pp.png"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <span className="absolute bottom-0 right-0 bg-amber-400 text-white rounded-full p-1.5 shadow group-hover:bg-amber-500 transition">
                <Camera size={12} />
              </span>
            </label>
            <p className="text-xs text-amber-500 mt-1.5">
              {uploading ? "Uploading…" : "Upload a photo"}
            </p>
            <input
              type="file"
              id="file-upload"
              name="myFile"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={handleImage}
            />
          </div>

          <div className="space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"><User size={15} /></span>
                <input type="text" name="name" placeholder="Your full name" required
                  value={formData.name} onChange={handleOnChange} className={inputClass(false)} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"><Mail size={15} /></span>
                <input type="email" name="email" placeholder="youremail@site.com" required
                  value={formData.email} onChange={handleOnChange} className={inputClass(false)} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-amber-700 mb-1.5">Phone</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"><Phone size={15} /></span>
                <input type="number" name="phone" placeholder="Your phone number" required
                  value={formData.phone} onChange={handleOnChange} className={inputClass(false)} />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"><Lock size={15} /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password" required placeholder="Min. 8 chars" minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="At least 8 characters with a number, lowercase, and uppercase"
                    value={formData.password} onChange={handleOnChange}
                    className={inputClass(formData.password.length > 0 && formData.password.length < 8)}
                    style={{ paddingRight: "2.25rem" }}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-700 mb-1.5">Confirm</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"><Lock size={15} /></span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword" required placeholder="Repeat" minLength="8"
                    value={formData.confirmPassword} onChange={handleOnChange}
                    className={inputClass(isPasswordMismatch)}
                    style={{ paddingRight: "2.25rem" }}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600">
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {isPasswordMismatch && (
              <p className="text-red-500 text-xs">Passwords do not match.</p>
            )}
            <p className="text-xs text-amber-400">
              8+ characters — uppercase, lowercase &amp; a number.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || isPasswordMismatch || uploading}
            className={`w-full mt-5 py-2.5 text-base font-bold text-white rounded-full shadow-md transition duration-150 flex items-center justify-center gap-2 ${
              loading || isPasswordMismatch || uploading
                ? "bg-amber-200 cursor-not-allowed"
                : "bg-amber-400 hover:bg-amber-500 hover:shadow-lg active:scale-95"
            }`}
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading ? "Creating account…" : "Create Account 🐟"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
