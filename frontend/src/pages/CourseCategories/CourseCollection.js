import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const CourseCollection = () => {
  const [categories,setCategories]=useState([]);

  const handleGetCategories= async()=>{
    try{
      const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/category/get-categories`)
      setCategories(res?.data?.data)
    }catch(error){
      console.log('error :>> ', error);
    }
  }

  useEffect(()=>{
    handleGetCategories()
  },[])
  const courseCollection = [
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1",
      icon: "http://skilify.theuxuidesigner.com/images/svg/pantone.svg",
      category: "Design",
      desc: "Learn how to design your website. We have a wide range of designing courses from which you can select the best that suits you.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/monitor.svg",
      category: "Development",
      desc: "Development Learn how to develop your software and websites. We provide you with a wide range of different development courses that will help you to learn more.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1",
      icon: "http://skilify.theuxuidesigner.com/images/svg/shake.svg",
      category: "IT & Software",
      desc: "IT & Software If you want to learn something new in IT and Software, then this is the right place to help you with different IT and Software courses from which you can get the one for you.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/briefcase.svg",
      category: "Business",
      desc: "Business If you want to be a successful business owner, our courses will help you do so. Book your course now.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/volume-up.svg",
      category: "Marketing",
      desc: "In this world, marketing is essential to learn how to do excellent marketing with our courses and get your business on top.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/shake.svg",
      category: "Photography",
      desc: "The most successful business today is photography, but you should know how to get it on top. Our courses will help you to pull yourself up.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/heart.svg",
      category: "Healthcare",
      desc: "The health and care industry has increased so far. You will need to buck yourself up to catch with, and this can be done with our courses.",
      to: "",
    },
    {
      property: "w-[40px] transition delay-150 hover:translate-y-1 ",
      icon: "http://skilify.theuxuidesigner.com/images/svg/cast.svg",
      category: "Technology",
      desc: "There are various technologies which you need to learn if you want to stay in the race. Our courses will help you to learn more.",
      to: "",
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-8 justify-center items-center px-12 py-12">
      <div className="grid grid-cols-9 col-span-8 col-start-2 col-end-12 gap-4 justify-between items-center">
        <span className="grid col-span-7 text-3xl font-semibold text-gray-900">
          Choice favourite course from top category
        </span>
        <div className="grid col-span-2 justify-center items-center">
          <div className="bg-[#51aae1] border-[#51aae1] border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-[#588fefd5] hover:border-[#588fefd5] hover:border-2 hover:border-solid w-[200px]">
            <Link
              to="/all-courses"
              className="flex flex-row justify-center items-center"
            >
              See all Courses
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 col-span-8 col-start-2 col-end-12 gap-4 justify-center items-center">
        {categories.map((category) => (
          <div className="h-[300px] flex col-span-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 hover:bg-gradient-to-tr  hover:from-blue-200 hover:to-blue-50 transition delay-150 hover:translate-y-2 duration-700">
            <Link
              to={""}
              className="flex flex-col justify-center items-center px-8 py-8"
            >
             
              <span className="text-gray-900 font-semibold text-xl text-center my-2">
                {/* {element.category} */}
                {category.name}
              </span>
              <span className="text-gray-500 font-thin text-sm text-center my-2">
                {category?.description}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCollection;
