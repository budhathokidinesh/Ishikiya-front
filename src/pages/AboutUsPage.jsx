import React from "react";
import { FaFacebookF } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="pt-[5vh] bg-gray-900">
      {/* Hero */}
      <div className="bg-[#0a54e8] text-white w-full py-16 px-6 text-center">
        <span className="inline-block bg-white/15 border border-white/30 text-white/85 text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-5">
          Perth, WA
        </span>
        <h1 className="text-4xl font-medium mb-3">About Us</h1>
        <p className="text-white/75 text-base max-w-md mx-auto leading-relaxed">
          A local favourite where quality seafood meets warm community spirit —
          fresh every day, made with heart.
        </p>
      </div>

      {/* Story */}
      <div className="w-full px-6 py-5 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-medium text-gray-50 mb-4">Our story</h2>
          <p className="text-shadow-amber-50 leading-relaxed mb-4">
            Nestled in the heart of Perth, our family-owned shop has been
            serving delicious, freshly prepared seafood from the very beginning.
            We take pride in offering a variety of dishes — from classic fish
            and chips to popular seafood sides, all made fresh to order.
          </p>
          <p className="text-shadow-violet-50 leading-relaxed">
            Whether you're craving golden Hake, crispy Snapper, or locally
            sourced Shark and Red Emperor — grilled, crumbed, Cajun, or lemon
            pepper — we've got something for everyone.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-15 text-center">
          <div className="text-5xl mb-4">🐟</div>
          <p className="text-green-800 text-sm leading-relaxed">
            Fresh seafood, sourced locally and prepared with care — every single
            day.
          </p>
        </div>
      </div>

      <hr className="border-gray-100 mx-6" />

      {/* Why locals love us */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-medium text-gray-50 text-center mb-8">
          Why locals love us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "🌿",
              bg: "bg-green-50",
              title: "Fresh ingredients",
              desc: "Locally sourced and freshly prepared every day — no shortcuts, no compromises.",
            },
            {
              icon: "🍽️",
              bg: "bg-amber-50",
              title: "Generous portions",
              desc: "We believe in value. No one leaves our shop hungry — guaranteed.",
            },
            {
              icon: "👨‍👩‍👧",
              bg: "bg-blue-50",
              title: "Family friendly",
              desc: "Perfect for quick family dinners or a beach day takeaway treat.",
            },
            {
              icon: "⚡",
              bg: "bg-red-50",
              title: "Fast & friendly service",
              desc: "Order in-store or call ahead — we're always happy to help.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-gray-100 rounded-2xl p-5 bg-white"
            >
              <div
                className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center text-base mb-3`}
              >
                {item.icon}
              </div>
              <h3 className="text-sm font-medium text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 mx-6" />

      {/* Visit us */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-medium text-gray-50 text-center mb-8">
          Visit us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "📍",
              label: "Address",
              value: "Perth, WA",
            },
            { icon: "📞", label: "Phone", value: "0123456789" },
            {
              icon: "🕓",
              label: "Hours",
              value: "Tue – Sun\n4:00 PM – 8:00 PM",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-2xl p-5 text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <p className="text-sm font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
