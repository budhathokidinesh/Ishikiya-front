import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer footer-horizontal  w-full bg-red-200 footer-center text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.facebook.com/ALKIMOSBEACHFISHCHIPS">
            <FaFacebookF />
          </a>

          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaXTwitter />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Alkimos
          Beach Fish and Chips
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
