import PageNavigation from "@/components/PageNavigation";
import { getFood } from "@/store/admin/foodSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";

const FodDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [foodDetails, setFoodDetails] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  //dispatching food details
  useEffect(() => {
    if (id) {
      dispatch(getFood(id))
        .unwrap()
        .then((data) => {
          setFoodDetails(data.food);
        })
        .catch((err) => {
          console.log("Failed to fetch food:", err);
        });
    }
  }, [dispatch, id]);
  console.log(foodDetails);
  if (!foodDetails) {
    return (
      <div className="pt-[16vh] px-10 sm:px-4 md:px-6">
        <div className="container w-full py-8 text-center text-xl">
          Loading food details
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[16vh] px-10 sm:px-4 md:px-6">
      <div className="container w-full py-8">
        <PageNavigation title={foodDetails?.title} />
        {/* This is for rendering food details  */}
        <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8 ">
          <div className="shadow-md p-4 rounded-md">
            <img
              src={foodDetails?.imageUrl}
              alt={foodDetails?.title}
              className="w-full h-[25rem] object-cover rounded"
            />
          </div>
          <div className="rounded bg-red-200/[.3] p-8 text-black mb-5 flex-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {foodDetails?.title}
            </h2>
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Price: ${foodDetails?.price}
            </h2>
            <p className="text-gray-700 mt-4">{foodDetails?.description}</p>
            <div className="flex items-center justify-between mb-6 mt-3">
              <div className="text-2xl font-bold text-red-400">Quantity</div>
              <span className="flex items-center space-x-4">
                <div className="bg-red-500 relative p-4 rounded-full text-white">
                  <AiOutlineMinus
                    className=" cursor-pointer font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    size={20}
                  />
                </div>
                <span className="text-red-500 px-6 py-2 bg-slate-50 text-lg font-medium">
                  1
                </span>
                <div className="bg-red-500 relative p-4 rounded-full text-white">
                  <HiOutlinePlus
                    className=" cursor-pointer font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    size={20}
                  />
                </div>
              </span>
            </div>
            {user?.role === "admin" ? (
              <div className="flex gap-4">
                <button className="mt-4 btn btn-primary">Edit</button>
                <button className="mt-4 btn btn-primary">Delete</button>
              </div>
            ) : (
              <button className="mt-4 btn btn-primary">Order Now</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FodDetail;
