import { loginUser } from "@/store/auth/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser(formData))
      .then((data) => {
        setLoading(false);
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          const user = data?.payload?.user;
          if (user?.isVerified === false) {
            navigate("/verify-otp");
          } else if (user?.role === "admin") {
            navigate("/admin-order");
          } else {
            navigate(redirect === "cart" ? "/menu" : "/menu", {
              state: redirect === "cart" ? { showCart: true } : undefined,
            });
          }
        } else {
          toast.error(
            data?.payload?.message || "Please register your account.",
          );
          navigate("/register");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const inputClass =
    "w-full pl-9 pr-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-gray-800 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 pt-12"
      style={{
        background:
          "linear-gradient(160deg,#fffbeb 0%,#fde68a 50%,#bfdbfe 100%)",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-amber-100 px-8 py-9">
        {/* Logo / branding */}
        <NavLink to="/" className="flex flex-col items-center mb-7">
          <span className="text-5xl mb-2">🐟</span>
          <p className="text-2xl font-black text-amber-600 leading-tight tracking-tight">
            Freshly
          </p>
          <p className="text-[11px] font-semibold text-blue-800 uppercase tracking-widest mt-0.5">
            Fish &amp; Chips
          </p>
        </NavLink>

        <h1 className="text-lg font-extrabold text-gray-800 text-center mb-1">
          Welcome back!
        </h1>
        <p className="text-xs text-gray-400 text-center mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleOnSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-amber-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="youremail@site.com"
                value={formData.email}
                onChange={handleOnChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-amber-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-amber-500 hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Your password"
                value={formData.password}
                onChange={handleOnChange}
                className={inputClass + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white font-bold py-2.5 rounded-full shadow-md transition duration-150 mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" /> Signing in…
              </>
            ) : (
              <>
                <LogIn size={17} /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-amber-100" />
          <span className="text-amber-300 text-xs">or</span>
          <div className="flex-1 h-px bg-amber-100" />
        </div>

        <p className="text-center text-sm text-gray-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-amber-500 font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Footer note */}
        <p className="text-center text-[10px] text-gray-300 mt-6">
          Fresh battered cod · Hand-cut chips · Made to order
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
