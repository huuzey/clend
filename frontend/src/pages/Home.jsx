import React from "react";
import Hero from "../components/Hero";
import Product from "../components/Product";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1 className="text-center py-4 text-[#00ffff] text-3xl font-bold ">
        MARKETPLACE OVERVIEW
      </h1>
      <Product />
    </div>
  );
};

export default Home;
