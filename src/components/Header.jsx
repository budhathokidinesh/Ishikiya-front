import Navbar from "@/shared/Navbar";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Header = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container w-full py-[15vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-10">
          <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
            {/* Title  */}
            <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl text-center">
              We are <span className="text-red-500">Serious</span> for{" "}
              <span className="text-red-500">Food.</span>
            </div>
            {/* Desciption  */}
            <div className="lg:text-xl text-black md:text-lg text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cupiditate nulla doloremque possimus nam vitae facilis autem
              veniam expedita sed, et at dolor distinctio corrupti animi
              voluptate hic, officia dolorem beatae.
            </div>
            {/* search foods  */}
            <div className="flex rounded-full py-2 px-4 justify-between items-center bg-white shadow-md">
              <div className="flex items-center">
                <FaSearch size={22} className="cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search foods here...."
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
            {/* Explore button  */}
            <div className="flex gap-8 items-center justify-center">
              <button className="bg-red-400 active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer flex gap-2">
                Explore Now
                <FaArrowAltCircleRight />
              </button>
            </div>
          </div>
          <div className="carousel w-full">
            <div
              id="slide1"
              className="carousel-item relative w-full rounded-2xl"
            >
              <img
                src="./fnc.jpg"
                className="h-[28rem] mx-auto justify-end rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img
                src="./bnc2.jpg"
                className="h-[28rem] mx-auto justify-end rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img
                src="bnc3.jpg"
                className="h-[28rem] mx-auto justify-end rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img
                src="bnc4.jpg"
                className="h-[28rem] mx-auto justify-end rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
