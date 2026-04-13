import { verifyOtp } from "@/store/auth/authSlice";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, ArrowRight, RotateCcw } from "lucide-react";

const OtpVerifyPage = () => {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < 6) return;
    try {
      const res = await dispatch(verifyOtp({ otp })).unwrap();
      if (res.success) navigate("/login");
    } catch {
      // error shown from Redux state
    }
  };

  const otp = digits.join("");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-md border border-amber-100 px-8 py-10 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck size={30} className="text-amber-400" />
          </div>

          <h1 className="text-xl font-black text-gray-800 mb-1">
            Check your email
          </h1>
          <p className="text-sm text-gray-400 mb-7 leading-relaxed">
            We sent a 6-digit code to your email address.
            <br />
            Enter it below to verify your account.
          </p>

          <form onSubmit={handleSubmit}>
            {/* OTP digit boxes */}
            <div
              className="flex justify-center gap-2.5 mb-5"
              onPaste={handlePaste}
            >
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-11 h-13 text-center text-xl font-black rounded-xl border-2 transition focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400
                    ${d ? "border-amber-400 bg-amber-50 text-amber-600" : "border-amber-200 bg-amber-50/50 text-gray-700"}
                  `}
                  style={{ height: "3.25rem" }}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-4 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white text-sm font-bold rounded-full shadow transition"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Verifying…
                </>
              ) : (
                <>
                  <ArrowRight size={15} /> Verify Code
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-amber-500 transition mx-auto"
          >
            <RotateCcw size={11} /> Didn't receive it? Go back
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          🐟 Freshly — keeping your account safe
        </p>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
