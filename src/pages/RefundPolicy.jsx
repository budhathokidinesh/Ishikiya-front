import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen pt-[5vh] bg-[#8B9AA0]">
      {/* Hero */}
      <div className="bg-[#142850] text-white py-14 px-6 text-center">
        <span className="inline-block bg-white/15 border border-white/30 text-white/80 text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
          Legal
        </span>
        <h1 className="text-3xl font-medium mb-3">Refund Policy</h1>
        <p className="text-white/65 text-sm max-w-sm mx-auto leading-relaxed">
          Your satisfaction is our priority. Here's how we handle refunds,
          replacements, and credits.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {/* Eligible */}
        <div>
          <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#142850] inline-block"></span>
            When you're eligible
          </h2>
          <div className="space-y-2">
            {[
              {
                icon: "📦",
                text: "You received an incorrect item that differs from your order",
              },
              {
                icon: "⚠️",
                text: "Food was spoiled, unsafe, or unfit to consume",
              },
              { icon: "🚫", text: "Your order was not delivered" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 bg-white/90 border border-gray-100 rounded-xl px-4 py-3"
              >
                <span className="text-sm mt-0.5">{item.icon}</span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What we offer */}
        <div>
          <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#142850] inline-block"></span>
            What we offer
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: "💰",
                label: "Full refund",
                sub: "Back to original payment",
              },
              { icon: "🔄", label: "Replacement", sub: "We remake your order" },
              { icon: "🎁", label: "Store credit", sub: "Use on next order" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/80 border border-gray-100 rounded-xl p-4 text-center"
              >
                <div className="text-xl mb-2">{item.icon}</div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Time limit */}
        <div>
          <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#142850] inline-block"></span>
            Time limit
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="text-base mt-0.5">⏱️</span>
            <p className="text-sm text-amber-800 leading-relaxed">
              Refund requests must be made <strong>within 2 hours</strong> of
              receiving your order. Requests after this window may not be
              eligible.
            </p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Not eligible */}
        <div>
          <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
            Not eligible for refunds
          </h2>
          <div className="space-y-2">
            {[
              "Change of mind after placing the order",
              "Partially eaten or consumed food",
              "Delivery delays caused by incorrect address provided",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                <span className="text-red-400 text-sm font-medium mt-0.5">
                  ✗
                </span>
                <p className="text-sm text-red-800 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#142850] rounded-2xl py-7 px-6 text-center">
          <p className="text-white/75 text-sm leading-relaxed mb-4">
            To request a refund, email us with your order number and we'll get
            back to you as soon as possible.
          </p>
          <a
            href="mailto:dinesh@gmail.com"
            className="inline-block bg-white
            text-[#142850] text-xs font-medium px-5 py-2 rounded-full
            hover:bg-gray-100 transition"
          >
            {" "}
            dinesh@gmail.com
          </a>
        </div>

        <p className="text-xs text-gray-50 text-center leading-relaxed">
          We reserve the right to deny refunds if the above conditions are not
          met.
          <br />
          Last updated — 2025
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
