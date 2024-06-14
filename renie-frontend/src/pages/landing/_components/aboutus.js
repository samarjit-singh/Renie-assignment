import React from "react";

const aboutus = () => {
  return (
    <div className="w-screen flex justify-center font-mono mt-20 lg:mt-0">
      <div className="w-5/6 flex flex-col items-center justify-center">
        <p className="text-3xl text-[#22092C] font-bold">What we offer?</p>

        <div className="lg:flex gap-x-10 mt-20 mb-20">
          <div className="group before:hover:scale-100 before:hover:h-72 before:hover:w-96 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-[#CDE8E5] to-[#7AB2B2] before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden border-b-8 border-b-[#3D3B40] border-r-8 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40] hover:cursor-pointer">
            <div className="mt-10 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-16 transition-all duration-500 flex items-center justify-center">
              <p className="text-3xl">👁️♻️</p>
            </div>
            <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-semibold group-hover:hidden">
                Processing Power
              </span>
              <p className="hidden group-hover:block p-2 text-center text-white">
                Renie Bins use vision-mimicking sensors to eliminate the need
                for expensive processing power.
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 group before:hover:scale-100 before:hover:h-72 before:hover:w-96 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-[#CDE8E5] to-[#7AB2B2] before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden border-b-8 border-b-[#3D3B40] border-r-8 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40] hover:cursor-pointer">
            <div className="mt-10 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-16 transition-all duration-500 flex items-center justify-center">
              <p className="text-3xl">🪅</p>
            </div>
            <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-semibold group-hover:hidden">
                Valuable Asset
              </span>
              <p className="hidden group-hover:block p-2 text-center text-white">
                Renie bins transform trash into a valuable business asset, using
                integrated sensors and software to monetize recyclable waste.
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 group before:hover:scale-100 before:hover:h-72 before:hover:w-96 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-[#CDE8E5] to-[#7AB2B2] before:absolute before:top-0 w-80 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden border-b-8 border-b-[#3D3B40] border-r-8 border-r-[#3D3B40] border-t-2 border-t-[#3D3B40] border-l-2 border-l-[#3D3B40] hover:cursor-pointer">
            <div className="mt-10 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-16 transition-all duration-500 flex items-center justify-center">
              <p className="text-3xl">💴</p>
            </div>
            <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
              <span className="text-2xl font-semibold group-hover:hidden">
                Affordable
              </span>
              <p className="hidden group-hover:block p-2 text-center text-white">
                This cutting-edge technology ensures the bins remain as
                affordable as traditional, non-smart bins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutus;
