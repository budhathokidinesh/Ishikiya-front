import PageNavigation from "@/components/PageNavigation";
import { deleteFood, fetchAllFoods, getFood } from "@/store/admin/foodSlice";
import { addToCart, fetchCart } from "@/store/cart/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { CiStar } from "react-icons/ci";

const FoodDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [foodDetails, setFoodDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getFood(id))
        .unwrap()
        .then((data) => setFoodDetails(data.food))
        .catch((err) => console.log("Failed to fetch food:", err));
    }
  }, [dispatch, id]);

  //This is for handle on ad cart
  const handleAddToCart = () => {
    const item = {
      foodId: foodDetails._id,
      quantity,
    };
    dispatch(addToCart(item)).unwrap();
    dispatch(fetchCart());
  };

  //This is for handle on quantity change
  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      if (type === "dec") return prev > 1 ? prev - 1 : 1;
    });
  };

  //This is for loading food details
  if (!foodDetails) {
    return (
      <div className="pt-[16vh] px-10 sm:px-4 md:px-6">
        <div className="container w-full py-8 text-center text-xl">
          Loading food details...
        </div>
      </div>
    );
  }

  //THis is for handle on delete
  const handleOnDelete = () => {
    const confirmDelete = window.confirm(
      "Are yu sure to delete this food item?"
    );
    if (!confirmDelete) return;

    dispatch(deleteFood(foodDetails._id))
      .unwrap()
      .then(() => {
        alert("Food item deleted successfully.");
        dispatch(fetchAllFoods());
        navigate("/menu");
      })
      .catch((err) => {
        console.log("Failed to delete food:", err);
        alert("Failed to delete. Try again");
      });
  };
  return (
    <div className="pt-[16vh] px-10 sm:px-4 md:px-6">
      <div className="container w-full py-8">
        <PageNavigation title={foodDetails.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-14">
          {/* Left image section */}
          <div className="shadow-md p-4 rounded-md">
            <img
              src={foodDetails.imageUrl}
              alt={foodDetails.title}
              className="w-full h-[25rem] object-cover rounded"
            />
          </div>

          {/* Right info section */}
          <div className="rounded bg-red-200/[.3] p-8 text-black">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              {foodDetails.title}
            </h2>
            <h3 className="text-xl font-semibold mb-2">
              Category: {foodDetails.category}
            </h3>
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Price: ${foodDetails.price}
            </h3>
            <p className="text-gray-700 mb-4">{foodDetails.description}</p>

            {/* Quantity Control */}
            {user?.role === "user" ? (
              <div className="flex items-center justify-between mb-6">
                <div className="text-xl font-semibold text-red-500">
                  Quantity
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-red-500 text-white p-3 rounded-full"
                    onClick={() => handleQuantityChange("dec")}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="text-lg font-medium px-4">{quantity}</span>
                  <button
                    className="bg-red-500 text-white p-3 rounded-full"
                    onClick={() => handleQuantityChange("inc")}
                  >
                    <HiOutlinePlus />
                  </button>
                </div>
              </div>
            ) : null}

            {/* Admin Edit/Delete OR Order */}
            {user?.role === "admin" ? (
              <div className="flex gap-4">
                <button className="btn btn-primary">Edit</button>
                <button onClick={handleOnDelete} className="btn btn-secondary">
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary w-full"
                onClick={handleAddToCart}
              >
                Order Now
              </button>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Customer Reviews
          </h2>
          {foodDetails.reviews?.length > 0 ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {foodDetails.reviews.map((review, index) => (
                <div key={index} className="border-b pb-2 last:border-none">
                  <div className="flex items-center space-x-2 text-yellow-500 mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <CiStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
