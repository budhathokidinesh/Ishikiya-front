import Navbar from "@/shared/Navbar";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const carouselRef = useRef(null);

  //this is for smooth carousel
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
  //this is for opening hours
  const isOpenNow = () => {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday, 1=Monday, etc.
    const hours = now.getHours();

    // Closed on Monday or outside 4pm-8pm
    if (day === 1) return false; // Monday
    return hours >= 16 && hours < 20;
  };

  const getCurrentDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  };
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      {/* Opening Hours Banner - Added at the top */}
      <div className="relative -mx-6 mb-12 mt-[10vh] ">
        <div className="bg-amber-500 text-white py-3 px-6 shadow-lg">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Dynamic "Open Now" indicator */}
              {isOpenNow() ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="font-bold">WE'RE OPEN NOW!</span>
                </span>
              ) : (
                <span className="font-bold">WE'RE CLOSED NOW</span>
              )}

              <span>
                {getCurrentDay() === "Monday"
                  ? "Closed today (Monday)"
                  : `Today: ${getCurrentDay()}, 4:00 PM - 8:00 PM`}
              </span>
            </div>
            <Link to="/menu">
              <button className="hidden sm:inline-flex items-center text-sm font-semibold hover:underline cursor-pointer">
                View Menu <FaArrowAltCircleRight className="ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* This is main Header  */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 relative lg:grid-cols-2 gap-10">
          <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
            {/* Title with decorative elements */}
            <div className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl">
                <span className="relative inline-block">
                  <span className="relative z-10">Crispy</span>
                </span>{" "}
                <span className="text-amber-500 relative">Golden</span> Fish &{" "}
                <span className="text-amber-500 relative">Chips</span>
              </div>

              {/* Decorative divider */}
              <div className="flex justify-center">
                <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
              </div>
            </div>

            {/* Description with improved spacing */}
            <div className="lg:text-xl text-gray-700 md:text-lg text-center leading-relaxed px-4">
              <p className="mb-4">
                Serving the crispiest, freshest fish with golden chips since{" "}
                {new Date().getFullYear()}.
              </p>
              <p>
                Our secret-battered cod and hand-cut potatoes are cooked to
                perfection - a taste of authentic British seaside tradition!
              </p>
            </div>

            {/* Order button with animation */}
            <div className="pt-6 flex flex-col items-center space-y-4">
              <Link to="/menu">
                <button className="relative overflow-hidden group bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all duration-300 transform hover:shadow-lg shadow-md rounded-full px-8 py-3 text-xl font-medium text-white cursor-pointer flex gap-2 items-center">
                  <span className="relative z-10">Order Now</span>
                  <FaArrowAltCircleRight className="relative z-10" />
                  <span className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </button>
              </Link>

              {/* Trust indicators */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span>500+ Happy Customers</span>
              </div>
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
                className="w-full h-[30rem] object-cover"
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
                className="w-full h-[30rem] object-cover"
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
                className="w-full h-[30rem] object-cover"
                alt="Special seafood platter"
              />

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
                className="w-full h-[30rem] object-cover"
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
