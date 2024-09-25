import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LearnerNavbar from "../components/Navbar/LearnerNavbar";
import Cookies from "js-cookie";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaLanguage } from "react-icons/fa";

const LearnerDashboard = () => {
  const greeting = "Good Morning";
  const name = Cookies.get("userName");
  const capitalizedCreator = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
    .join(" ");
  const username = capitalizedCreator;
  const user = username;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [isLoading, setLoading] = useState(false);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const validEnrolledCourses = enrolledCourses?.filter(
    (course) => course !== null
  );
  console.log('validEnrolledCourses', validEnrolledCourses)
  const userId = Cookies.get("userId");

  const getEnrolledCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/enroll/user-enrolled-courses/${userId}`
      );
      setLoading(false);
      setEnrolledCourses(res.data.enrolledCourses);
    } catch (err) {
      setLoading(false);
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const downloadCertificate = (certificateUrl) => {
    const fullUrl = `http://localhost:5000/${certificateUrl}`;

    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = "certificate.pdf";
    link.click();
  };

  const calculateProgress = (courseProgress) => {
    const totalChapters = courseProgress.length;
    const completedChapters = courseProgress?.filter(
      (progress) => progress
    ).length;
    const progressPercentage = (completedChapters / totalChapters) * 100;
    return progressPercentage;
  };

  return (
    <div>
      <LearnerNavbar />
      <div className="grid grid-cols-12 justify-center items-center">
        <div className="grid grid-cols-10 justify-center items-center col-span-12 px-12 py-12 rounded-sm bg-blue-100 bg-opacity-50">
          <span className="grid grid-rows-2 col-span-6">
            <span className="text-3xl font-bold">My Courses</span>
            <span className="text-xl font-extralight mt-2">
              {greeting} {user} !
            </span>
          </span>
        </div>
        <div className="grid grid-cols-12 col-span-12 col-start-1 justify-center gap-4 items-center my-4 mx-4">
          {isLoading && (
            <div className="loader loader-1">
              <div className="loader-outter"></div>
              <div className="loader-inner"></div>
            </div>
          )}

          {enrolledCourses && enrolledCourses.length > 0 ? (
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="col-span-12"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={2}
              swipeable
            >
              {enrolledCourses &&
                enrolledCourses
                  ?.filter((course) => course)
                  .map((course) => (
                    <div className="col-span-3">
                      <div
                        key={course?._id}
                        className="flex flex-col col-span-6 px-4 mx-4 my-8 py-4 bg-white border-2 border-gray-100 shadow-2xl shadow-gray-400 rounded-md transition ease-in delay-0 hover:-translate-y-2 duration:1000 z-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="black"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                          />
                        </svg>

                        <span className="flex text-xl text-black leading-6 my-4">
                          {course?.title}
                        </span>
                        <div className="flex justify-between items-center my-2">
                          <span className="flex items-center">
                            <i className="ri-book-line text-orange-500 text-[25px] mr-2"></i>{" "}
                            {course?.chapters?.length} lessons
                          </span>
                          <span className="flex items-center">
                            <FaLanguage className="fill-violet-500 h-10 w-10 text-[25px]" />
                            {course?.language}
                          </span>
                        </div>
                        <span className="text-l font-extralight my-2">
                          {course?.enrollments?.length > 0
                            ? `${course?.enrollments?.length} enrolled students`
                            : ""}
                        </span>
                        <span className="border-b-[1px] border-gray-200 my-4"></span>
                        <div className="flex justify-between items-center">
                          <span className="flex">Rs. {course?.price}</span>
                          <div className="cursor-pointer bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid w-32">
                            <Link
                              to={`/learner-course-details-page/${course?._id}?enrollmentId=${course?.enrollmentId}`}
                              className="flex flex-row justify-center items-center text-xs cursor-pointer"
                            >
                              Watch now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Carousel>
          ) : (
            <div className="col-span-12 text-center mt-5 text-black text-2xl font-semibold">
              You don't have any enrolled course yet!!
            </div>
          )}
        </div>
        {validEnrolledCourses && validEnrolledCourses?.length > 0 ? (
          <div className="col-span-12 px-4">
            <div className="grid grid-cols-12 col-span-12 gap-8">
              <div className="grid grid-cols-6 col-span-6 justify-between items-center px-8">
                <span className="col-span-5 col-start-1 text-2xl font-bold">
                  Your Progress
                </span>
              </div>
              <div className="grid grid-cols-6 col-span-5 justify-between items-center col-start-7 px-8">
                <span className="col-span-5 text-2xl font-bold">
                  Download your Certificate
                </span>
              </div>
            </div>
            <div className="grid grid-cols-12 justify-between items-center col-span-12 gap-8 px-4 py-4">
              <div className="grid grid-cols-6 justify-between items-center col-span-6 h-[40vh] px-2 py-2 overflow-y-scroll overscroll-contain">
                <div className="grid grid-cols-6 col-span-6">
                  {validEnrolledCourses.map((course) => (
                    <div className="grid grid-cols-12 col-span-6 shadow-[#3484B4] shadow-sm transition delay-50 hover:-translate-y-2 duration-500 rounded-md px-4 py-4 mb-4">
                      <div className="grid grid-rows-1  col-span-12 ">
                        <div key={course?._id} className="grid col-span-6 mb-4">
                          <span className="font-semibold text-lg col-span-6 mb-2">
                            {course?.title}
                          </span>
                          <div className="relative h-10 grid col-span-6  rounded-full bg-gray-300">
                            <div
                              className="absolute top-0 left-0 h-full bg-[#3484B4] rounded-full"
                              style={{
                                width: `${calculateProgress(
                                  course?.courseProgress
                                )}%`,
                              }}
                            ></div>
                            <span className="block text-sm mt-2 absolute top-0 bottom-0 left-[40%] text-white">
                              {`${calculateProgress(
                                course?.courseProgress
                              )}% Completed`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex  flex-col  col-span-6 h-[40vh] px-2 py-2 overflow-y-scroll overscroll-contain">
                {validEnrolledCourses.map((course) => (
                  <div
                    key={course?._id}
                    className="grid grid-cols-4  items-center col-span-4"
                  >
                    <div className="grid grid-cols-6 col-span-6">
                      <div className="grid grid-cols-12 col-span-6 shadow-[#3484B4] shadow-sm transition delay-50 hover:-translate-y-2 duration-500 rounded-md px-4 py-4 mb-4 bg-[#3484B4]">
                        <div className="grid grid-cols-12 col-span-12">
                          <span className="font-semibold text-white col-span-9">
                            {course?.title}
                          </span>
                          {calculateProgress(course?.courseProgress) === 100 ? (
                            <Link
                              to=""
                              onClick={() =>
                                downloadCertificate(course?.certificate)
                              }
                              className="text-sm font-extralight text-white col-span-4 col-start-10 hover:text-gray-200 hover:underline"
                            >
                              View Certificate
                            </Link>
                          ) : (
                            <span className="text-sm font-extralight text-white col-span-4 col-start-10">
                              Certificate available upon completion
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LearnerDashboard;
