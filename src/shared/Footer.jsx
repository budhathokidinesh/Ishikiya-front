import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-[#142850] to-[#27496d] text-white py-10">
      <div className=" px-4 text-center space-y-6 w-full">
        <nav className="flex flex-wrap justify-center gap-6 text-lg font-semibold">
          <a href="#" className="hover:text-yellow-400 transition">
            About Us
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Contact Us
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Our Menu
          </a>
        </nav>

        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com/ALKIMOSBEACHFISHCHIPS"
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

        <aside className="text-sm text-gray-300">
          © {new Date().getFullYear()} Alkimos Beach Fish and Chips. All rights
          reserved.
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
