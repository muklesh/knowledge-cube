import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LearnerNavbar from "../components/Navbar/LearnerNavbar";
import axios from "axios";

const AllCourses = () => {
  const [favorite, setFavorite] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [category, setCateogy] = useState([]);
  const getCategories = async () => {
    try {
      const categoryRes = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/category/get-categories`
      );
      setCateogy(categoryRes?.data?.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const [light, setLight] = useState(true);
  const [unlight, setUnlight] = useState(false);

  useEffect(() => {
    setLight(true);
    setUnlight(false);
  }, []);

  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      let url = "http://localhost:5000/api/course-creator/courses";
      const queryParams = [];
  
      if (searchQuery) {
        queryParams.push(`searchQuery=${searchQuery}`);
      }
  
      if (selectedCategoryId && selectedCategoryId !== "select a category") {
        queryParams.push(`category=${selectedCategoryId}`);
      }
  
      if (priceRange && priceRange !== "Select Price") {
        queryParams.push(`priceRange=${priceRange}`);
      }
  
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
  
      const response = await axios.get(url);
      setCourses(response?.data?.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  

  useEffect(() => {
    getAllCourses();
  }, [searchQuery, selectedCategoryId, priceRange]);

  return (
    <div>
      <LearnerNavbar />
      <div className="grid grid-cols-12 justify-center items-center bg-blue-50 bg-opacity-30">
        <div className="grid grid-cols-10 justify-center items-center col-span-12 px-20 py-20 rounded-sm bg-blue-100 bg-opacity-50">
          <span className="flex col-span-6 text-3xl font-bold">Courses</span>
          <span className="flex col-span-2 col-start-12">
            <input
              id="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search here..."
              className="flex bg-white text-gray-500 font-thin px-2 py-2 hover:shadow-[0_0px_12px_12px_rgba(0,0,0,0.2)] rounded-md border-gray-100 shadow-[0_2px_10px_10px_rgba(0,0,0,0.1)] text-xs w-[300px]"
            />
            <i
              onClick={getAllCourses}
              className="ri-search-line -ml-2 bg-black px-4 py-2 rounded-tr-md rounded-br-md text-white shadow-[0_2px_10px_10px_rgba(0,0,0,0.1)] hover:bg-gray-400 hover:text-black text-sm"
            ></i>
          </span>
        </div>
        <div className="grid grid-cols-10 justify-center items-center col-span-10 col-start-4 px-8 py-8 gap-4">
          <button
            onClick={getAllCourses}
            className="flex col-span-2 justify-center px-2 py-2 rounded-sm active:bg-black active:text-white hover:bg-gray-700 hover:text-white items-center bg-black text-white font-extralight text-sm focus:bg-black focus:text-white"
          >
            All courses
          </button>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="flex col-span-2 px-2 py-2 rounded-sm  items-center bg-gray-300 text-black font-extralight text-sm"
          >
            <option>Select Price</option>
            <option>0-500</option>
            <option>500-1000</option>
            <option>1000-1500</option>
            <option>1500-2000</option>
          </select>

          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="flex col-span-2 px-2 py-2 rounded-sm  items-center bg-gray-300 text-black font-extralight text-sm"
          >
            <option>select a category</option>

            {category?.map((cats) => (
              <option selected value={cats._id} className="text-gray">
                {cats?.name}
              </option>
            ))}
          </select>
        </div>
        <span className="grid col-span-10 col-start-2 border-b-[1px] border-[#3483b428]"></span>

        <div className="grid grid-cols-12 col-span-12 col-start-1 col-end-13 justify-center items-center px-2 py-2 gap-4 my-8">
          <div className="grid grid-cols-12 col-span-12 col-start-1 justify-center gap-4 items-center my-8 mx-8">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <Link
                  to={`/learner-course-details-page/${course?._id}`}
                  className="grid col-span-3 px-4 py-4 bg-white border-2 border-gray-100 shadow-2xl shadow-gray-400 rounded-md transition ease-in delay-0 hover:-translate-y-2 duration:1000"
                  key={course?._id}
                >
                  <div className="flex flex-col">
                    <img
                      alt="image"
                      src={`http://localhost:5000/${course.coverImage}`}
                      className="w-fill h-[200px] rounded-md z-10"
                    />

                    <div className="flex flex-row justify-between items-center my-2 border-b-[1px] border-gray-200">
                      <span className="flex text-[15px] font-extralight text-gray-400">
                        {course?.reviews?.length} reviews & ratings
                      </span>
                    </div>
                    <span className="flex text-xl text-black leading-6 my-4">
                      {course?.title}
                    </span>
                    <div className="flex justify-between items-center ">
                      <span>
                        {course?.user?.name}
                     
                      </span>
                      <span>   Rs. {course?.price}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-12 flex justify-center items-center my-8">
                <p className="text-2xl text-gray-500">No Courses Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
