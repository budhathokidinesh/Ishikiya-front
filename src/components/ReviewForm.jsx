import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "@/store/admin/foodSlice";
import { Star, Send, X, CheckCircle } from "lucide-react";

const ReviewForm = ({ foodId }) => {
  const [showForm,  setShowForm]  = useState(false);
  const [rating,    setRating]    = useState(5);
  const [hovered,   setHovered]   = useState(0);
  const [comment,   setComment]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) { setError("Please write a comment."); return; }
    setError("");
    setLoading(true);
    try {
      await dispatch(addReview({ foodId, reviewData: { comment, rating } })).unwrap();
      setSubmitted(true);
      setShowForm(false);
    } catch (err) {
      setError(err?.message || "Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-2 flex items-center gap-1.5 text-teal-600 text-xs font-semibold">
        <CheckCircle size={13} /> Review submitted — thanks!
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="mt-1.5 text-xs text-amber-500 hover:text-amber-600 font-semibold hover:underline transition"
      >
        + Leave a review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2.5">

      {/* Star picker */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(s)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={18}
              className={`transition-colors ${
                s <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-200 fill-gray-200"
              }`}
            />
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-1">{rating}/5</span>
      </div>

      {/* Comment */}
      <textarea
        rows={2}
        placeholder="What did you think of this dish?"
        value={comment}
        onChange={(e) => { setComment(e.target.value); setError(""); }}
        className="w-full px-3 py-2 text-xs text-gray-700 bg-white border border-amber-200 rounded-lg placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 text-white text-xs font-bold rounded-full transition"
        >
          <Send size={11} /> {loading ? "Submitting…" : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => { setShowForm(false); setError(""); setComment(""); }}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-200 text-gray-500 text-xs font-semibold rounded-full hover:bg-amber-50 transition"
        >
          <X size={11} /> Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
