import CartDrawer from "@/components/CartDrawer";
import { LogoutUser } from "@/store/auth/authSlice";
import { fetchCart } from "@/store/cart/cartSlice";
import React, { useEffect, useState } from "react";
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
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
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

  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);

  //Fetch cart data when navbar mounts
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  //this is opening the drawer
  const handleViewCart = () => {
    setCartDrawerOpen(true);
  };
  //this is the closing the drawer
  const handleCloseCart = () => {
    setCartDrawerOpen(false);
  };

  console.log(user);
  return (
    <>
      <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto">
          <div className="flex items-center justify-between ">
            <Link to="/">
              <img src="./logo.png" alt="" className="h-14 cursor-pointer" />
            </Link>

            {/* All links  */}
            <div className="lg:flex hidden gap-8 items-center">
              <Link
                to="/menu"
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Today Special
              </Link>

              {user?.role === "admin" ? (
                <Link
                  to="/admin-order"
                  className="text-[#191919] text-xl font-medium hover:text-red-500"
                >
                  Orders
                </Link>
              ) : (
                <Link
                  to="/aboutus"
                  className="text-[#191919] text-xl font-medium hover:text-red-500"
                >
                  About Us
                </Link>
              )}

              <Link
                to="/menu"
                className="text-[#191919] text-xl font-medium hover:text-red-500"
              >
                Our Menu
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/addfood"
                  className="text-[#191919] text-xl font-medium hover:text-red-500"
                >
                  Add Menu
                </Link>
              )}
              {/* this is for cart item */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm indicator-item text-red-500">
                      {totalQuantity}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-red-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">
                      {totalQuantity} Items
                    </span>
                    <span className="text-info">
                      Subtotal: ${totalPrice?.toFixed(2)}
                    </span>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleViewCart}
                      >
                        View cart
                      </button>
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition cursor-pointer">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                    <Link to="/profile">Profile</Link>

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
      {/* this is for drawer  */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Navbar;
