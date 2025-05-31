import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-[#142850] to-[#27496d] text-white py-10">
      <div className="px-4 text-center space-y-6 w-full">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-lg font-semibold">
          <Link to="/aboutus" className="hover:text-yellow-400 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </Link>
          <Link to="/menu" className="hover:text-yellow-400 transition">
            Our Menu
          </Link>
          <Link
            to="/refund-policy"
            className="hover:text-yellow-400 transition"
          >
            Refund Policy
          </Link>
          <Link to="/order-policy" className="hover:text-yellow-400 transition">
            Order Policy
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com/ALKIMOSBEACHFISHCHIPS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-pink-400">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-300">
            <FaXTwitter />
          </a>
        </div>

        {/* Copyright */}
        <aside className="text-sm text-gray-300">
          © {new Date().getFullYear()} Alkimos Beach Fish and Chips. All rights
          reserved.
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
