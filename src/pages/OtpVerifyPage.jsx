import { verifyOtp } from "@/store/auth/authSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(verifyOtp({ otp })).unwrap();
      if (res.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  return (
    <div className="otp-verify h-[70vh] pt-[10vh]">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-max mx-auto mt-32 bg-white shadow-md p-8 rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerifyPage;
