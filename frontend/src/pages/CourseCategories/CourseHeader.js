import React from "react";
import LearnerNavbar from "../../components/Navbar/LearnerNavbar";

const CourseGallery = () => {
  const MainHeader = "Learn more and make success a result of perfection";
  const SubTitle =
    "Pick from over 100,000 online video courses with new additions published every month.";
  return (
    <div>
      <LearnerNavbar />
      <div className="grid grid-cols-6 gap-2 bg-gradient-to-tr from-blue-100 to-[#3483b4b5] justify-center items-center px-20 py-20">
        <div className="grid grid-rows-3 col-span-3 px-2 py-2 justify-center items-center">
          <span className="text-gray-900 font-semibold text-3xl">
            {MainHeader}
          </span>
          <span className="text-gray text-l font-extralight">{SubTitle}</span>
          <span className="">Search...</span>
        </div>
        <div className="grid col-span-3 justify-center items-center">
          <img
            src="https://skilify.theuxuidesigner.com/images/webp/girl-img-study.webp"
            className="w-128 h-[400px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseGallery;
