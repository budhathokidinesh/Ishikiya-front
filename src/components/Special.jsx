import React from "react";
import { Link } from "react-router-dom";

const specials = [
  { img: "./fnc.jpg",  name: "Fish & Chips",     desc: "Today's catch — extra crispy batter, double-fried chips, served with mushy peas.", price: "$16", original: "$20", badge: "⚡ 20% Off" },
  { img: "./bnc2.jpg", name: "Chippy Burger",     desc: "Beer-battered fish fillet in a brioche bun with tartare sauce and pickles.", price: "$14", original: "$18", badge: "🌟 Chef's Pick" },
  { img: "./bnc3.jpg", name: "Seafood Platter",   desc: "A mix of prawns, calamari and fish goujons with dipping sauces.", price: "$22", original: "$28", badge: "🦐 Limited" },
  { img: "./bnc4.jpg", name: "Meal Deal",         desc: "Any main + chips + a cold drink. The ultimate chippy combo for one.", price: "$18", original: "$24", badge: "🎉 Bundle" },
];

const Special = () => {
  return (
    <section className="py-4 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Today&apos;s <span className="text-red-400">Specials</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Limited-time deals — grab them while they last</p>
          <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-red-300" />
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
          {specials.map((item) => (
            <div
              key={item.name}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[260px] flex flex-col overflow-hidden border border-red-50"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {item.badge}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-grow px-4 py-3">
                <h3 className="font-bold text-gray-800 text-base mb-1">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-3">{item.desc}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-red-50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-red-500 font-extrabold text-lg">{item.price}</span>
                    <span className="text-gray-400 text-xs line-through">{item.original}</span>
                  </div>
                  <Link to="/menu">
                    <button className="bg-red-400 hover:bg-red-500 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-full shadow transition-all duration-200 cursor-pointer">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Special;
