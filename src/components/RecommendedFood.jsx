import React from "react";
import { CiHeart } from "react-icons/ci";

const RecommendedFood = () => {
  return (
    <div className="py-6 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[2vh]">
        {/* Title for top seller  */}
        <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
          Top <span className="text-red-400">Seller</span>
        </div>
        <div className="grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center">
          {/* Food card */}

          <div className="card bg-base-100 w-60 shadow-sm h-[380px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer">
            <figure className="h-40 w-full overflow-hidden">
              <img
                src="./fnc.jpg"
                alt="Shoes"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className=" flex flex-col flex-grow px-4 py-2 overflow-hidden h-56">
              <h2 className="card-title text-lg text-center items-center text-blue-600">
                Fish and Chips
              </h2>
              <p className="text-sm overflow-y-auto flex-grow my-1">
                Fresh fish and chips.
              </p>
              <div className="card-actions justify-between mt-2">
                <span className="text-xl font-semibold">Price: $20</span>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-60 shadow-sm h-[380px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer">
            <figure className="h-40 w-full overflow-hidden">
              <img
                src="./bnc2.jpg"
                alt="Shoes"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className=" flex flex-col flex-grow px-4 py-2 overflow-hidden h-56">
              <h2 className="card-title text-lg text-center items-center text-blue-600">
                Beef Burger
              </h2>
              <p className="text-sm overflow-y-auto flex-grow my-1">
                It is made from freshly grounded beef patty. Home made buns and
                fresh lattuce. Please make sure what type of beef you want while
                ordering food. THanks Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Aspernatur, voluptas.
              </p>
              <div className="card-actions justify-between mt-2">
                <span className="text-xl font-semibold">Price: $20</span>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-60 shadow-sm h-[380px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer">
            <figure className="h-40 w-full overflow-hidden">
              <img
                src="./bnc3.jpg"
                alt="Shoes"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className=" flex flex-col flex-grow px-4 py-2 overflow-hidden h-56">
              <h2 className="card-title text-lg text-center items-center text-blue-600">
                Fry fish
              </h2>
              <p className="text-sm overflow-y-auto flex-grow my-1">
                Best fish in town
              </p>
              <div className="card-actions justify-between mt-2">
                <span className="text-xl font-semibold">Price: $20</span>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-60 shadow-sm h-[380px] flex flex-col transform transition duration-300 hover:scale-105 hover:cursor-pointer">
            <figure className="h-40 w-full overflow-hidden">
              <img
                src="./bnc4.jpg"
                alt="Shoes"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className=" flex flex-col flex-grow px-4 py-2 overflow-hidden h-56">
              <h2 className="card-title text-lg text-center items-center text-blue-600">
                Beer
              </h2>
              <p className="text-sm overflow-y-auto flex-grow my-1">
                Chilled Fish
              </p>
              <div className="card-actions justify-between mt-2">
                <span className="text-xl font-semibold">Price: $6</span>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 text-sm rounded shadow transition-all duration-200 cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedFood;
