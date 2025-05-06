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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
