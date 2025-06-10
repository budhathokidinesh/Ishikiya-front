import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({
  user,
  nav,
  totalQuantity,
  totalPrice,
  handleOnLogout,
  handleViewCart,
}) => {
  return (
    <div
      className={`lg:hidden absolute w-1/2 sm:w-2/5 px-4 py-2 font-medium ease-in shadow-sm backdrop-blur-md bg-blue-400 top-0 duration-500 ${
        nav ? "right-0" : "right-[-100%]"
      } pt-20 rounded-xl`}
    >
      <div className="flex flex-col gap-8">
        {/* Cart */}
        {user?.role !== "admin" && (
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item text-red-500">
                  {totalQuantity}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-[#142850] z-1 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{totalQuantity} Items</span>
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        <Link
          to="/"
          className="text-[#191919] text-xl font-medium hover:text-red-500"
        >
          Home
        </Link>

        {user?.role === "user" ? (
          <Link
            to="/orders"
            className="text-[#191919] text-xl font-medium hover:text-red-500"
          >
            Orders
          </Link>
        ) : (
          <Link
            to="/menu"
            className="text-[#191919] text-xl font-medium hover:text-red-500"
          >
            Today Special
          </Link>
        )}

        {user?.role === "admin" ? (
          <Link
            to="/admin-order"
            className="text-xl text-[#191919] font-medium hover:text-red-500"
          >
            Orders
          </Link>
        ) : (
          <Link
            to="/aboutus"
            className="text-xl text-[#191919] font-medium hover:text-red-500"
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

        {user ? (
          <Link to="/">
            <button
              onClick={handleOnLogout}
              className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer"
            >
              Logout
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
