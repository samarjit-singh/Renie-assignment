import React from "react";
import { Link } from "react-router-dom";
import HeroImage1 from "../../../assets/hero1.png";

const hero = () => {
  return (
    <div className="w-screen mt-44 flex justify-center">
      <div className="w-5/6 lg:flex items-center justify-center gap-x-10">
        <div className="font-mono">
          <span className="flex items-center justify-center lg:items-start lg:justify-start gap-x-4">
            <p className="text-3xl lg:text-6xl font-bold text-[#22092C]">
              Your
            </p>
            <p className="text-3xl lg:text-6xl font-bold text-white bg-[#80B9AD] w-32 lg:w-56 text-center rounded-full border-b-8 border-b-[#3D3B40] border-r-8 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40] -rotate-3">
              waste:
            </p>
          </span>

          <p className="text-3xl text-center lg:text-start lg:text-6xl font-bold text-[#22092C]">
            supercharged with Data.
          </p>

          <p className="lg:w-[35rem] mt-10 font-bold lg:text-xl text-center lg:text-start">
            We transform your company’s waste from a cost into a source of
            income with Renie Bins.
          </p>
          <div className="flex items-center justify-center lg:justify-start">
            <Link to="/register">
              <button className="mt-10 bg-[#10439F] lg:text-xl text-white font-bold rounded-full w-36 lg:w-44 h-10 lg:h-14 border-b-4 border-b-[#3D3B40] border-r-4 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40]">
                Recycle
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={HeroImage1}
            width={500}
            height={500}
            alt="Renie dustbin"
            className="rotate-6 rotate-container"
          />
        </div>
      </div>
    </div>
  );
};

export default hero;
