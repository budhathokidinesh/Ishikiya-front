import React from "react";
import { Link } from "react-router-dom";

const items = [
  { img: "./fnc.jpg",  name: "Fish & Chips",  desc: "Our signature crispy beer-battered cod served with hand-cut golden chips.", price: "$20", badge: "🏆 #1 Pick" },
  { img: "./bnc2.jpg", name: "Beef Burger",   desc: "Freshly ground beef patty, homemade buns and crisp lettuce. A chippy classic.", price: "$20", badge: "🔥 Popular" },
  { img: "./bnc3.jpg", name: "Fried Fish",    desc: "Best fish in town — lightly seasoned and fried to a perfect golden crisp.", price: "$20", badge: "🐟 Fresh" },
  { img: "./bnc4.jpg", name: "Cold Beer",     desc: "Ice-cold draught beer. The perfect companion to a proper plate of chips.", price: "$6",  badge: "🍺 Chilled" },
];

const RecommendedFood = () => {
  return (
    <section className="py-4 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Top <span className="text-amber-500">Sellers</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">What the locals keep coming back for</p>
          <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-amber-400" />
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
          {items.map((item) => (
            <div
              key={item.name}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[260px] flex flex-col overflow-hidden border border-amber-100"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-grow px-4 py-3">
                <h3 className="font-bold text-gray-800 text-base mb-1">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-3">{item.desc}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-50">
                  <span className="text-amber-600 font-extrabold text-lg">{item.price}</span>
                  <Link to="/menu">
                    <button className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-full shadow transition-all duration-200 cursor-pointer">
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

export default RecommendedFood;
