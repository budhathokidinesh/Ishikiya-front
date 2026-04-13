import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Send, KeyRound, Loader2, CheckCircle } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

const ForgotResetPasswordPage = () => {
  const [email, setEmail]               = useState("");
  const [newPassword, setNewPassword]   = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [sent, setSent]                 = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, { email });
      toast.success(res.data.message || "Reset link sent!");
      setSent(true);
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/reset-password/${token}`, { password: newPassword });
      toast.success(res.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
    >
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-md border border-amber-100 px-8 py-10">

          {/* Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
              {token ? <KeyRound size={26} className="text-amber-400" /> : <Mail size={26} className="text-amber-400" />}
            </div>
            <h1 className="text-xl font-black text-gray-800">
              {token ? "Set New Password" : "Forgot Password?"}
            </h1>
            <p className="text-xs text-gray-400 mt-1 text-center leading-relaxed">
              {token
                ? "Choose a strong new password for your account."
                : "Enter your email and we'll send you a reset link."}
            </p>
          </div>

          {/* Sent confirmation */}
          {sent && !token ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto">
                <CheckCircle size={28} className="text-teal-500" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Check your inbox</p>
                <p className="text-xs text-gray-400 mt-1">We sent a reset link to your email address.</p>
              </div>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-amber-500 hover:text-amber-600 font-semibold transition"
              >
                Didn't receive it? Try again
              </button>
            </div>
          ) : (
            <form onSubmit={token ? handleReset : handleForgot} className="space-y-4">

              {!token ? (
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-amber-50 border border-amber-200 rounded-xl text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">New Password</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full pl-9 pr-10 py-2.5 text-sm bg-amber-50 border border-amber-200 rounded-xl text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                      />
                      <button type="button" onClick={() => setShowNew((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition">
                        {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`w-full pl-9 pr-10 py-2.5 text-sm bg-amber-50 border rounded-xl text-gray-700 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition ${
                          confirmPassword && confirmPassword !== newPassword
                            ? "border-red-300"
                            : "border-amber-200"
                        }`}
                      />
                      <button type="button" onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition">
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-[11px] text-red-400 mt-1 ml-1">Passwords don't match</p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white text-sm font-bold rounded-full shadow transition mt-1"
              >
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> {token ? "Resetting…" : "Sending…"}</>
                  : token
                    ? <><KeyRound size={15} /> Reset Password</>
                    : <><Send size={15} /> Send Reset Link</>
                }
              </button>
            </form>
          )}

          {/* Back to login */}
          <Link
            to="/login"
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-amber-500 transition"
          >
            <ArrowLeft size={12} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotResetPasswordPage;
