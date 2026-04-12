import PageNavigation from "@/components/PageNavigation";
import { deleteFood, fetchAllFoods, getFood } from "@/store/admin/foodSlice";
import { addToCart, fetchCart } from "@/store/cart/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star, Pencil, Trash2, Loader2 } from "lucide-react";
import EditProductDrawer from "@/components/EditProductDrawer";

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={13}
        className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}
      />
    ))}
  </div>
);

const avatarColors = [
  "bg-amber-400", "bg-teal-500", "bg-blue-500",
  "bg-rose-400", "bg-violet-500", "bg-emerald-500",
];

const FoodDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [foodDetails, setFoodDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodDrawerOpen, setFoodDrawerOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getFood(id))
        .unwrap()
        .then((data) => setFoodDetails(data.food))
        .catch((err) => console.log("Failed to fetch food:", err));
    }
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await dispatch(addToCart({ foodId: foodDetails._id, quantity })).unwrap();
      dispatch(fetchCart());
    } finally {
      setAdding(false);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec") return prev > 1 ? prev - 1 : 1;
    });
  };

  const handleOnDelete = () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    dispatch(deleteFood(foodDetails._id))
      .unwrap()
      .then(() => {
        dispatch(fetchAllFoods());
        navigate("/menu");
      })
      .catch(() => alert("Failed to delete. Try again."));
  };

  const avgRating =
    foodDetails?.reviews?.length
      ? foodDetails.reviews.reduce((s, r) => s + (r.rating || 0), 0) / foodDetails.reviews.length
      : null;

  if (!foodDetails) {
    return (
      <div
        className="min-h-screen pt-[16vh] flex items-center justify-center"
        style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
      >
        <div className="flex flex-col items-center gap-3 text-amber-400">
          <Loader2 size={40} className="animate-spin" />
          <p className="text-gray-500 text-sm">Loading dish details…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen pt-[16vh] pb-16 px-4 md:px-6"
        style={{ background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)" }}
      >
        <div className="container mx-auto max-w-5xl py-6">
          <PageNavigation title={foodDetails.title} />

          {/* Main card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-100">
              <img
                src={foodDetails.imageUrl}
                alt={foodDetails.title}
                className="w-full h-[22rem] object-cover"
              />
            </div>

            {/* Info panel */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-7 flex flex-col">

              {/* Category pill */}
              <span className="self-start bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                {foodDetails.category}
              </span>

              <h2 className="text-2xl font-extrabold text-gray-800 mb-2 leading-snug">
                {foodDetails.title}
              </h2>

              {/* Rating */}
              {avgRating !== null && (
                <div className="flex items-center gap-2 mb-3">
                  <StarRow rating={avgRating} />
                  <span className="text-xs text-gray-500">
                    {avgRating.toFixed(1)} ({foodDetails.reviews.length} review{foodDetails.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-3xl font-extrabold text-amber-500 mb-4">
                ${foodDetails.price}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">
                {foodDetails.description}
              </p>

              {user?.role === "admin" ? (
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => setFoodDrawerOpen(true)}
                    className="flex items-center gap-2 flex-1 justify-center bg-amber-400 hover:bg-amber-500 active:scale-95 text-white font-bold py-2.5 rounded-full shadow transition"
                  >
                    <Pencil size={15} /> Edit
                  </button>
                  <button
                    onClick={handleOnDelete}
                    className="flex items-center gap-2 flex-1 justify-center bg-red-400 hover:bg-red-500 active:scale-95 text-white font-bold py-2.5 rounded-full shadow transition"
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              ) : (
                <div className="mt-auto space-y-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-600 w-20">Quantity</span>
                    <div className="flex items-center border border-amber-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange("dec")}
                        className="px-3 py-2 hover:bg-amber-50 text-amber-600 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-gray-800 min-w-[2.5rem] text-center border-x border-amber-200">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("inc")}
                        className="px-3 py-2 hover:bg-amber-50 text-amber-600 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-400 ml-auto">
                      Total: <span className="font-bold text-amber-500">${(foodDetails.price * quantity).toFixed(2)}</span>
                    </span>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 active:scale-95 text-white font-bold py-3 rounded-full shadow-md transition"
                  >
                    {adding ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
                    {adding ? "Adding…" : "Add to Cart"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl font-extrabold text-gray-800">Customer Reviews</h2>
              {foodDetails.reviews?.length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {foodDetails.reviews.length}
                </span>
              )}
            </div>

            {foodDetails.reviews?.length > 0 ? (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {foodDetails.reviews.map((review, index) => (
                  <div key={index} className="flex gap-3 items-start pb-4 border-b border-amber-50 last:border-none last:pb-0">
                    <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColors[index % avatarColors.length]}`}>
                      {review.user?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-semibold text-gray-800 text-sm">
                          {review.user?.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      {review.rating && <StarRow rating={review.rating} />}
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">🐟</p>
                <p className="text-gray-400 italic text-sm">No reviews yet — be the first!</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <EditProductDrawer
        isOpen={foodDrawerOpen}
        onClose={() => setFoodDrawerOpen(false)}
        food={foodDetails}
      />
    </>
  );
};

export default FoodDetail;
