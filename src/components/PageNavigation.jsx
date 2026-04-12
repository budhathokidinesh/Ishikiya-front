import React from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const PageNavigation = ({ title }) => {
  return (
    <nav
      className="flex items-center text-sm sm:text-base text-gray-700 mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 sm:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-amber-500 hover:text-amber-600 hover:underline font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <HiChevronRight className="text-amber-300" />
            <Link
              to="/menu"
              className="ml-1 text-amber-500 hover:text-amber-600 hover:underline font-medium"
            >
              Menu
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <HiChevronRight className="text-amber-300" />
            <span className="ml-1 font-semibold text-gray-700">{title}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default PageNavigation;
