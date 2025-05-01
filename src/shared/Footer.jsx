import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer footer-horizontal bg-red-200 text-base-content rounded p-10 footer-center">
      <nav className="grid grid-flow-col gap-4 text-xl font-bold ">
        <a href="" className="hover:text-red-400 ">
          About Us
        </a>
        <a href="" className="hover:text-red-400 ">
          Contact Us
        </a>
        <a href="" className="hover:text-red-400 ">
          Our Menu
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-8 text-2xl">
          <a href="https://www.facebook.com/ALKIMOSBEACHFISHCHIPS">
            <FaFacebookF className="hover:text-blue-400 " />
          </a>

          <a href="">
            <FaInstagram className="hover:text-blue-400 " />
          </a>
          <a href="">
            <FaXTwitter className="hover:text-blue-400 " />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Alkimos
          Beach Fish and Chips.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
