import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

const ForgotResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, {
        email,
      });
      toast.success(res.data.message || "Reset link sent to email");
      setEmail("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password/${token}`,
        {
          newPassword,
        }
      );
      toast.success(res.data.message || "Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={token ? handleReset : handleForgot}
        className="bg-white p-6 rounded shadow-md w-full sm:w-[25rem]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          {token ? "Reset Password" : "Forgot Password"}
        </h2>

        {!token ? (
          <>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Enter your email to receive a password reset link.
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-60"
        >
          {loading
            ? token
              ? "Resetting..."
              : "Sending..."
            : token
            ? "Reset Password"
            : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotResetPasswordPage;
