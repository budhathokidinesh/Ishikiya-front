import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Truck,
  XCircle,
  AlertTriangle,
  Leaf,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

const policies = [
  {
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
    title: "Preparation Time",
    body: "Every order is made fresh to order. Please allow approximately 15–25 minutes for your food to be prepared.",
  },
  {
    icon: Truck,
    color: "bg-blue-100 text-blue-600",
    title: "Delivery Time",
    body: "Delivery takes approximately 30–45 minutes from order confirmation. Times may vary during peak hours (Fri–Sat evenings).",
  },
  {
    icon: XCircle,
    color: "bg-red-100 text-red-500",
    title: "Cancellations",
    body: "You may cancel your order within 5 minutes of placing it. Once preparation has started, cancellations are not possible.",
  },
  {
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-500",
    title: "Incorrect Orders",
    body: "If you receive an incorrect order, contact us immediately. We'll do our best to resolve it as quickly as possible.",
  },
  {
    icon: Leaf,
    color: "bg-teal-100 text-teal-600",
    title: "Allergies & Dietary",
    body: "Please mention any allergies clearly at checkout. We take allergies seriously, but cannot guarantee zero cross-contamination in our kitchen.",
  },
];

const OrderPolicy = () => {
  return (
    <div
      className="min-h-screen pt-[12vh] pb-20 px-4"
      style={{
        background: "linear-gradient(180deg,#fffbeb 0%,#fef3c7 40%,#fff 100%)",
      }}
    >
      <div className="container mx-auto max-w-2xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 mt-4">
          <Link to="/" className="hover:text-amber-500 transition">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-medium">Order Policy</span>
        </nav>

        {/* Hero */}
        <div
          className="rounded-3xl px-8 py-10 mb-10 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#92400e,#d97706)" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle,#fff 1px,transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <span className="text-5xl mb-3 block">📋</span>
          <h1 className="text-3xl font-black text-white mb-2">Order Policy</h1>
          <p className="text-amber-100 text-sm max-w-sm mx-auto">
            Everything you need to know about placing and managing your orders
            at Freshly.
          </p>
        </div>

        {/* Policy cards */}
        <div className="space-y-4 mb-10">
          {policies.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex gap-4"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${p.color}`}
              >
                <p.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6">
          <h2 className="font-extrabold text-gray-800 text-base mb-4">
            Need Help?
          </h2>
          <div className="space-y-3">
            <a
              href="mailto:support@thechippy.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email us</p>
                <p className="text-sm font-semibold text-amber-600 group-hover:underline">
                  support@freshly.com
                </p>
              </div>
            </a>
            <a
              href="tel:+610123456789"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Call us</p>
                <p className="text-sm font-semibold text-amber-600 group-hover:underline">
                  +610123456789
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Thank you note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          🐟 Thank you for ordering with The Chippy — we appreciate your
          support!
        </p>
      </div>
    </div>
  );
};

export default OrderPolicy;
