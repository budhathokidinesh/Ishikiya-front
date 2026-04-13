import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop.jsx";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full text-white"
      style={{
        background:
          "linear-gradient(135deg,#78350f 0%,#92400e 50%,#b45309 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Main grid */}
        <div className="container mx-auto max-w-6xl px-4 md:px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐟</span>
                <div>
                  <p className="text-xl font-black text-amber-300 leading-none tracking-tight">
                    Freshly
                  </p>
                  <p className="text-[10px] font-semibold text-amber-200 uppercase tracking-widest">
                    Fish &amp; Chips
                  </p>
                </div>
              </div>
              <p className="text-amber-100 text-sm leading-relaxed max-w-xs">
                Serving the crispiest beer-battered cod and hand-cut chips since{" "}
                {year}. Made fresh, every single time.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 pt-1">
                {[
                  {
                    icon: FaFacebookF,
                    href: "#",
                    hover: "hover:bg-blue-500",
                  },
                  { icon: FaInstagram, href: "#", hover: "hover:bg-pink-500" },
                  { icon: FaXTwitter, href: "#", hover: "hover:bg-sky-500" },
                ].map(({ icon: Icon, href, hover }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition ${hover}`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <ScrollToTop />
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/", label: "Home" },
                  { to: "/menu", label: "Our Menu" },
                  { to: "/aboutus", label: "About Us" },
                  { to: "/refund-policy", label: "Refund Policy" },
                  { to: "/order-policy", label: "Order Policy" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-amber-100 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400 group-hover:bg-white transition" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / hours */}
            <div>
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">
                Find Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={15}
                    className="text-amber-400 shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-amber-100 leading-relaxed">
                    Perth WA, Australia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} className="text-amber-400 shrink-0" />
                  <a
                    href="tel:+61123456789"
                    className="text-sm text-amber-100 hover:text-white transition"
                  >
                    +61 123 456 789
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-amber-400 shrink-0" />
                  <a
                    href="mailto:hello@thechippy.com"
                    className="text-sm text-amber-100 hover:text-white transition"
                  >
                    support@freshly.com
                  </a>
                </li>
                <li className="flex items-start gap-3 mt-1">
                  <Clock size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-100">
                    <p>Tue – Sun: 4:00 PM – 8:00 PM</p>
                    <p className="text-amber-300 text-xs mt-0.5">
                      Closed Mondays
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-amber-200">
              © {year} Freshly Fish &amp; Chips. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-amber-300">
              <Link to="/refund-policy" className="hover:text-white transition">
                Refund Policy
              </Link>
              <span className="text-white/20">·</span>
              <Link to="/order-policy" className="hover:text-white transition">
                Order Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
