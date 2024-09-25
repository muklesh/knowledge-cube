import { React, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousal = ({ children: courses }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? courses.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === courses.length - 1 ? 0 : curr + 1));
  return (
    <div className="col-span-12 overflow-hidden relative z-20">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {courses}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white-80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center justify-center gap-2">
        {courses?.map((child, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
          >
            {child}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Carousal;
