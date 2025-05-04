import { LogoutUser } from "@/store/auth/authSlice";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  //this is handling logout
  const handleOnLogout = () => {
    try {
      dispatch(LogoutUser()).unwrap();
      toast.success("You have logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. please try later");
      console.error("Logout error:", error);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };
  console.log(user);
  return (
    <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
      <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto">
        <div className="flex items-center justify-between ">
          <Link to="/">
            <img src="./logo.png" alt="" className="h-14 cursor-pointer" />
          </Link>

          {/* All links  */}
          <div className="lg:flex hidden gap-8 items-center">
            <a
              href=""
              className="text-[#191919] text-xl font-medium hover:text-red-500"
            >
              Today Special
            </a>
            <a
              href=""
              className="text-[#191919] text-xl font-medium hover:text-red-500"
            >
              About Us
            </a>
            <a
              href=""
              className="text-[#191919] text-xl font-medium hover:text-red-500"
            >
              Our Menu
            </a>
            {user?.role === "admin" && (
              <Link
                to="/addfood"
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Add Menu
              </Link>
            )}

            <a
              href=""
              className="text-[#191919] text-xl font-medium hover:text-red-500"
            >
              Popular Food
            </a>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.profileImage}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={handleOnLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>
          {/* Hamburgur  */}
          <div className="block lg:hidden z-40" onClick={handleNav}>
            {nav ? (
              <RxCross2 size={25} className="text-red-500 cursor-pointer" />
            ) : (
              <GiHamburgerMenu
                size={25}
                className="text-[#191919] cursor-pointer"
              />
            )}
          </div>
          {/* Menu items  */}
          <div
            className={`lg:hidden absolute w-1/2 sm:w-2/5 h-[70vh] px-4 py-2 font-medium ease-in shadow-sm backdrop-blur-md bg-white/80 top-0 duration-500 ${
              nav ? "right-0" : "right-[-100%]"
            } pt-24 rounded-xl`}
          >
            <div className="flex flex-col gap-8">
              <a
                href=""
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Today Special
              </a>
              <a
                href=""
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                About Us
              </a>
              <a
                href=""
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Our Menu
              </a>
              <a
                href=""
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Add Menu
              </a>
              <a
                href="/popular"
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Popular Food
              </a>
              <Link to="/login">
                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
