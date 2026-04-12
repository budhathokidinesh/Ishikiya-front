import Header from "@/components/Header";
import RecommendedFood from "@/components/RecommendedFood";
import Special from "@/components/Special";

import React from "react";

const HomePage = () => {
  return (
    <div style={{ background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 40%, #fff 100%)" }}>
      <Header />

      {/* Section divider */}
      <div className="flex items-center gap-4 mx-auto w-11/12 max-w-6xl my-10">
        <div className="flex-1 h-px bg-amber-200" />
        <span className="text-2xl">🐟</span>
        <div className="flex-1 h-px bg-amber-200" />
      </div>

      <RecommendedFood />

      <div className="flex items-center gap-4 mx-auto w-11/12 max-w-6xl my-10">
        <div className="flex-1 h-px bg-amber-200" />
        <span className="text-2xl">🍟</span>
        <div className="flex-1 h-px bg-amber-200" />
      </div>

      <Special />
      <div className="h-16" />
    </div>
  );
};

export default HomePage;
