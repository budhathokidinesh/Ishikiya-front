import React from "react";
import { Link } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <div className="text-2xl flex items-center gap-3 font-semibold py-3 mb-3 text-black">
      <Link to="/">Home /</Link>
      <Link to="/menu">Menu /</Link>
      <span className="text-2xl text-yellow-500">{title}</span>
    </div>
  );
};

export default PageNavigation;
