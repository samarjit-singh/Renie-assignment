import React from "react";
import Navbar from "./_components/navbar";
import AboutUs from "./_components/aboutus";
import Hero from "./_components/hero";

const Landing = () => {
  return (
    <div className="h-screen w-screen flex justify-center overflow-hidden overflow-y-scroll">
      <Navbar />
      <main className="h-full">
        <Hero />
        <AboutUs />
      </main>
    </div>
  );
};

export default Landing;
