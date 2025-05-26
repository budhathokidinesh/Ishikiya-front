import { fetchAllFoods } from "@/store/admin/foodSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { addToCart, fetchCart } from "@/store/cart/cartSlice";

const MenuPage = () => {
  const dispatch = useDispatch();
  const { foodList, isLoading } = useSelector((state) => state.food);
  const [active, setActive] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = useState({
    id: 0,
    name: "All",
    value: "all",
  });
  const category = [
    {
      id: 0,
      name: "All",
      value: "all",
    },
    {
      id: 1,
      name: "Fish and chips",
      value: "Fish and chips",
    },
    {
      id: 2,
      name: "Drinks",
      value: "Drinks",
    },
    {
      id: 3,
      name: "Burger",
      value: "Burger",
    },
  ];

  //this is handling the categories
  const handleBtn = (btn) => {
    setActive(btn.id);
    setValue(btn);
  };
  //this is for fetching all food items
  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);
  //filtering food items
  const filteredFoodList =
    value?.value === "all"
      ? foodList
      : foodList?.filter((food) => food.category === value?.value);
  console.log(foodList, "Foodlist");
  //this is for handling the add to cart items
  const handleAddToCart = (item) => {
    console.log("Selected Item:", item);
    const selectedItem = {
      foodId: item._id,
      quantity: 1,
    };
    dispatch(addToCart(selectedItem)).unwrap();
    dispatch(fetchCart());
  };
  return (
    <div className="pt-[12vh] px-8 sm:px-4 md:px-6">
      <div className="container mx-auto py-8">
        <div className="p-5 mb-14">
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            {category?.map((btn) => (
              <button
                className={`text-xl px-6 py-3 font-semibold transition-all duration-200 border-2 shadow-sm rounded-md cursor-pointer ${
                  active === btn.id
                    ? "bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500"
                    : "bg-white text-yellow-500 border-yellow-400 hover:bg-yellow-100"
                }`}
                onClick={() => handleBtn(btn)}
              >
                {btn.name}
              </button>

              //this is for fetching all foods
            ))}
          </div>
          {isLoading ? (
            <p className="text-center text-xl">Loading food items</p>
          ) : (
            <div className="grid py-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center">
              {filteredFoodList?.map((item) => (
                <div
                  key={item._id}
                  className="bg-base-100 w-90 md:w-80 lg:w-70 shadow-sm h-[480px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer p-0 rounded-md"
                >
                  <figure className="h-52 w-full overflow-hidden m-0">
                    <Link to={`/fooddetail/${item._id}`}>
                      <img
                        src={item.imageUrl}
                        className="h-full w-full object-cover block rounded-sm"
                      />
                    </Link>
                  </figure>

                  {/* <div className="flex text-sm space-x-2 cursor-pointer px-4 pt-2">
                    <span className="font-normal text-orange-500">
                      {item.reviews.length > 0
                        ? (
                            item.reviews.reduce((acc, r) => acc + r.rating, 0) /
                            item.reviews.length
                          ).toFixed(1)
                        : "No rating"}
                    </span>
                    <CiStar size={16} className="text-orange-300" />
                    <span className="font-medium">{item?.reviews?.length}</span>
                  </div> */}

                  <div className="flex flex-col flex-grow px-4 py-2 overflow-hidden h-[160px]">
                    <h2 className="card-title text-lg text-center items-center text-blue-600">
                      {item.title}
                    </h2>
                    <p className="text-sm overflow-y-auto flex-grow my-1">
                      {item.description}
                    </p>

                    {/* Reviews preview */}
                    <div className="mt-2 space-y-1 max-h-24 overflow-y-auto border-t border-gray-200 pt-2">
                      {item.reviews.length > 0 ? (
                        item.reviews.slice(0, 3).map((review, index) => (
                          <div
                            key={index}
                            className="text-xs border-b border-gray-100 pb-1 last:border-none"
                          >
                            <div className="flex items-center space-x-1 text-yellow-500">
                              {[...Array(review.rating)].map((_, i) => (
                                <CiStar key={i} size={12} />
                              ))}
                            </div>
                            <p className="text-gray-600 truncate">
                              {review.comment}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 italic text-center">
                          No reviews yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="card-actions justify-between mt-2 px-4 pb-4">
                    <span className="text-xl font-semibold">
                      Price: ${item.price}
                    </span>
                    {user?.role === "admin" ? null : (
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded shadow transition-all duration-200 cursor-pointer"
                        onClick={() => handleAddToCart(item)}
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
