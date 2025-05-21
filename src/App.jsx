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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerifyPage />} />
        <Route path="/forgot-password" element={<ForgotResetPasswordPage />} />
        <Route
          path="/forgot-password/:token"
          element={<ForgotResetPasswordPage />}
        />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/fooddetail/:id" element={<FodDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order-success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/admin-order" element={<AdminOrderPage />} />
        <Route path="/orders" element={<UserOrderPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
