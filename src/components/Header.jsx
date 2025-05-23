import Navbar from "@/shared/Navbar";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Header = () => {
  const carouselRef = useRef(null);

  const scrollToSlide = (slideIndex) => {
    const slide = document.getElementById(`slide${slideIndex}`);
    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container w-full py-[15vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-10">
          <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
            {/* Title  */}
            <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl text-center">
              Crispy <span className="text-amber-500">Golden</span> Fish &{" "}
              <span className="text-amber-500">Chips</span>
            </div>
            {/* Description  */}
            <div className="lg:text-xl text-black md:text-lg text-center">
              Serving the crispiest, freshest fish with golden chips since
              [year]. Our secret-battered cod and hand-cut potatoes are cooked
              to perfection - just like the classic British tradition!
            </div>
            {/* search foods  */}
            <div className="flex rounded-full py-2 px-4 justify-between items-center bg-white shadow-md">
              <div className="flex items-center">
                <FaSearch size={22} className="cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search our menu..."
                  className="text-black w-full border-none outline-none py-2 px-4"
                />
              </div>
              <div className="h-10 w-10 relative bg-amber-300 rounded-full">
                <FaSearch
                  size={15}
                  className="cursor-pointer text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                />
              </div>
            </div>
            {/* Order button  */}
            <div className="flex gap-8 items-center justify-center">
              <button className="bg-amber-400 active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer flex gap-2">
                Order Now
                <FaArrowAltCircleRight />
              </button>
            </div>
          </div>
          {/* This is for carasoul  */}
          <div
            ref={carouselRef}
            className="carousel w-full rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Slide 1 - Hero Image */}
            <div id="slide1" className="carousel-item relative w-full">
              <img
                src="./fnc.jpg"
                className="w-full h-[28rem] object-cover"
                alt="Golden fish and chips with lemon wedges"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white">
                  Our Signature Dish
                </h3>
                <p className="text-white">
                  Crispy beer-battered cod with hand-cut chips
                </p>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  onClick={() => scrollToSlide(4)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(2)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❯
                </button>
              </div>
            </div>

            {/* Slide 2 - Meal Deal */}
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="./bnc2.jpg"
                className="w-full h-[28rem] object-cover"
                alt="Family meal deal with fish, chips, and sides"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white">Family Feast</h3>
                <p className="text-white">
                  Perfect for sharing - save 15% on family bundles
                </p>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  onClick={() => scrollToSlide(1)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(3)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❯
                </button>
              </div>
            </div>

            {/* Slide 3 - Special Offer */}
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="bnc3.jpg"
                className="w-full h-[28rem] object-cover"
                alt="Special seafood platter"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white">
                  Today's Special
                </h3>
                <p className="text-white">
                  Try our seafood platter - only £12.99 today!
                </p>
                <button className="mt-2 btn btn-sm bg-amber-400 border-none hover:bg-amber-500">
                  Order Now
                </button>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  onClick={() => scrollToSlide(2)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(4)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❯
                </button>
              </div>
            </div>

            {/* Slide 4 - Fresh Ingredients */}
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="bnc4.jpg"
                className="w-full h-[28rem] object-cover"
                alt="Fresh ingredients preparation"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white">Fresh Daily</h3>
                <p className="text-white">
                  Locally-sourced fish and potatoes, prepared fresh each morning
                </p>
              </div>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  onClick={() => scrollToSlide(3)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(1)}
                  className="btn btn-circle bg-white/30 hover:bg-white/50 border-none text-white"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
