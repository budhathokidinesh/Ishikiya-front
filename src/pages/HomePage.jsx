import Header from "@/components/Header";
import RecommendedFood from "@/components/RecommendedFood";
import Special from "@/components/special";

import React from "react";

const HomePage = () => {
  return (
    <div>
      <Header />
      <RecommendedFood />
      <Special />
    </div>
  );
};

export default HomePage;
