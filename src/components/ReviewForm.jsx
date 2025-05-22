import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addReview } from "@/store/admin/foodSlice";

const ReviewForm = ({ foodId }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(
        addReview({ foodId, reviewData: { rating, comment } })
      ).unwrap();
      setSubmitted(true);
      setShowForm(false); // close form after successful submission
    } catch (err) {
      setError(err?.message || "Failed to submit review. Try again.");
    }
  };

  return (
    <div className="mt-2">
      {!showForm && !submitted && (
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          + Add Review
        </button>
      )}

      {showForm && !submitted && (
        <form onSubmit={handleSubmit} className="mt-2 space-y-2">
          <div>
            <label className="text-sm text-gray-700">Rating:</label>
            <select
              className="ml-2 border rounded px-2 py-1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val} Star{val > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={2}
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <button
              type="submit"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <p className="text-sm text-green-600">Review submitted successfully!</p>
      )}
    </div>
  );
};

export default ReviewForm;
