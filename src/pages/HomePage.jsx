import Header from "@/components/Header";
import RecommendedFood from "@/components/RecommendedFood";
import Special from "@/components/Special";

import React from "react";

const HomePage = () => {
  return (
    <div className="bg-[#8B9AA0]">
      <Header />
      <br />
      <br />
      <div className="border-t border-yellow-400 mx-auto w-3/4" />
      <RecommendedFood />
      <div className="border-t border-yellow-400 mx-auto w-3/4" />
      <Special />
    </div>
  );
};

export default HomePage;
