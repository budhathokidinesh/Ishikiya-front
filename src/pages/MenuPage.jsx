import { fetchAllFoods } from "@/store/admin/foodSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";

const MenuPage = () => {
  const dispatch = useDispatch();
  const { foodList, isLoading } = useSelector((state) => state.food);
  const [active, setActive] = useState(0);
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
  return (
    <div className="pt-[16vh] px-10 sm:px-4 md:px-6">
      <div className="container w-full py-8">
        <div className="p-5 mb-14">
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            {category?.map((btn) => (
              <button
                className={
                  active === btn.id
                    ? "text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium cursor-pointer"
                    : "text-xl px-4 py-3 text-red-500 border-red-500 border-2 rounded-sm cursor-pointer font-medium"
                }
                onClick={() => {
                  handleBtn(btn);
                }}
              >
                {btn.name}
              </button>
              //this is for fetching all foods
            ))}
          </div>
          {isLoading ? (
            <p className="text-center text-xl">Loading food items</p>
          ) : (
            <div className="grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center">
              {filteredFoodList?.map((item) => (
                <div className="card bg-base-100 w-70 shadow-sm h-[380px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer">
                  <figure className="h-40 w-full overflow-hidden">
                    <Link to={`/fooddetail/${item._id}`}>
                      <img
                        src={item.imageUrl}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  </figure>
                  <div className="flex text-sm space-x-2 cursor-pointer px-4 pt-2">
                    <span className="font-normal text-orange-500">4.3</span>
                    <CiStar size={16} className="text-orange-300" />
                    <span className="font-medium">{item?.reviews?.length}</span>
                  </div>
                  <div className=" flex flex-col flex-grow px-4 py-2 overflow-hidden h-56">
                    <h2 className="card-title text-lg text-center items-center text-blue-600">
                      {item.title}
                    </h2>
                    <p className="text-sm overflow-y-auto flex-grow my-1">
                      {item.description}
                    </p>
                    <div className="card-actions justify-between mt-2">
                      <span className="text-xl font-semibold">
                        Price: ${item.price}
                      </span>
                      <button className="btn btn-sm btn-primary">
                        Order Now
                      </button>
                    </div>
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
