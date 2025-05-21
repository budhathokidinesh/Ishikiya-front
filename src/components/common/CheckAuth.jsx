import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  //redirect unauthenticated user away from protected pages
  const isAuthPage = path.includes("/login") || path.includes("/register");
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" />;
  }

  //preventing authenticated users from visiting login/register page again
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin" ? (
      <Navigate to="/admin-order" />
    ) : (
      <Navigate to="/menu" />
    );
  }

  //redirecting normal user trying to access admin routes
  if (isAuthenticated && user?.role !== "admin" && path.startsWith("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  //redirecting admin trying trying to access user routes
  if (isAuthenticated && user?.role === "admin" && path.startsWith("/shop")) {
    return <Navigate to="/admin-order" />;
  }

  //homepage behaviour

  if (path === "/") {
    return !isAuthenticated ? (
      <Navigate to="/login" />
    ) : user?.role === "admin" ? (
      <Navigate to="/admin-order" />
    ) : (
      <Navigate to="/menu" />
    );
  }

  return <>{children}</>;
};

export default CheckAuth;
