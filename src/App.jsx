import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OtpVerifyPage from "./pages/OtpVerifyPage";
import ForgotResetPasswordPage from "./pages/ForgotPasswordPage";
import AddFood from "./pages/AddFood";
import MenuPage from "./pages/MenuPage";
import AboutUsPage from "./pages/AboutUsPage";
import FodDetail from "./pages/FodDetail";
import ProfilePage from "./pages/ProfilePage";
import SuccessPage from "./pages/SuccessPage";
import { CancelPage } from "./pages/CancelPage";
import AdminOrderPage from "./pages/OrderPage";
import UserOrderPage from "./pages/UserOrderPage";
import { useSelector } from "react-redux";
import CheckAuth from "./components/common/CheckAuth";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <Routes>
        {/* This is for authentication  */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <LoginPage />
            </CheckAuth>
          }
        />
        <Route
          path="/register"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <RegisterPage />
            </CheckAuth>
          }
        />
        <Route path="/verify-otp" element={<OtpVerifyPage />} />
        <Route path="/forgot-password" element={<ForgotResetPasswordPage />} />
        <Route
          path="/forgot-password/:token"
          element={<ForgotResetPasswordPage />}
        />
        {/* This is for admin side  */}
        <Route
          path="/addfood"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AddFood />
            </CheckAuth>
          }
        />
        <Route
          path="/admin-order"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminOrderPage />
            </CheckAuth>
          }
        />

        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/fooddetail/:id" element={<FodDetail />} />
        {/* This is user side  */}
        <Route
          path="/profile"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ProfilePage />
            </CheckAuth>
          }
        />
        <Route
          path="/order-success"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <SuccessPage />
            </CheckAuth>
          }
        />
        <Route
          path="/cancel"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <CancelPage />
            </CheckAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserOrderPage />
            </CheckAuth>
          }
        />
        {/* This is common  */}
        <Route path="/menu" element={<MenuPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
