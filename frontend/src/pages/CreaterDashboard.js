import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatorNavbar from "../components/Navbar/CreatorNavbar";
import Cookies from "universal-cookie";
import axios from "axios";
import Modal from "react-modal";
import "./global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreaterDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [courses, setCourses] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const userName = cookies.get("userName");

    const capitalizedCreator = userName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const name = capitalizedCreator;
    setUserName(name);

    if (token) {
      const parts = token.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setUserId(userId);
      setToken(token);
    }
  }, [token]);

  const getAllCreatorCourses = async () => {

    if (userId) {
      try {
        setLoading(true);
        let url;
        if (searchQuery) {
          url = `${process.env.REACT_APP_BASE_URL}/course-creator/courses/creator/${userId}?searchQuery=${searchQuery}`;
        } else {
          url = `${process.env.REACT_APP_BASE_URL}/course-creator/courses/creator/${userId}`;
        }
        let res = await axios.get(url);

        setCourses(res?.data?.courses);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error :>> ", error);
      }
    }
  };

  const filterCourses = () => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  useEffect(() => {
    filterCourses();
  }, [searchQuery]);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/get-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(res?.data?.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const updateBioFunction = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/update-bio`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeModal();
      getUser();
      toast.success(res.data.message);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllCreatorCourses();
      getUser();
    }
  }, [userId]);

  const handleCourseDelete = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/course-creator/delete-course/${courseId}`
      );
      toast.success(response?.data?.message);
      getAllCreatorCourses()
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      height: "300px",
      padding: "10px",
    },
  };
  return (
    <div>
      <CreatorNavbar />
      <div className="min-[300px]:grid min-[300px]:grid-rows-1 min-[300px]:justify-center min-[300px]:items-center max-[639px]:grid max-[639px]:grid-rows-1 max-[639px]:justify-center max-[639px]:items-center sm:grid sm:grid-rows-1 sm:justify-center sm:items-center md:grid md:grid-rows-1 md:justify-center md:items-center lg:grid lg:grid-cols-12 lg:justify-center lg:items-center">
        <div className="min-[300px]:grid min-[300px]:grid-rows-1 min-[300px]:justify-center min-[300px]:items-center max-[639px]:grid max-[639px]:grid-rows-1 max-[639px]:justify-center max-[639px]:items-center sm:grid sm:grid-rows-1 sm:justify-center sm:items-center md:grid md:grid-rows-1 md:justify-center md:items-center lg:grid lg:grid-cols-12 lg:justify-center lg:items-center gap-8 pt-8 px-4 min-[300px]:col-start-3 lg:col-start-1 min-[300px]:col-span-4 max-[639px]:col-span-4 sm:col-span-10 md:col-span-10 lg:col-span-10">
          <div className="grid grid-cols-12 col-span-9 justify-center items-center">
            <div className="grid grid-cols-12 col-span-12 justify-center items-center">
              <div className="grid grid-rows-2 col-start-2 col-span-10">
                <span className="text-3xl col-span-10">{userName}</span>
              </div>
            </div>

            <div className="grid grid-cols-12 col-span-12 col-start-2">
              <span className="text-sm text-gray-400 col-span-12">
                {userDetails?.bio === "" ? (
                  <h2> Update Your Bio...</h2>
                ) : (
                  userDetails?.bio
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-black text-white p-4 rounded col-span-3 col-start-6 text-xs hover:bg-gray-900"
            onClick={openModal}
          >
            Update Bio
          </button>
        </div>
        <div className="grid grid-cols-12 col-span-12 mt-16 px-16 py-8 border-t-[1px] border-gray-100">
          <span className="flex col-span-10 col-start-1">
            <input
              id="search"
              type="search"
              placeholder="search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-[300px]:hidden max-[639px]:hidden sm:flex md:flex lg:flex bg-white text-black-500 font-thin px-2 py-2 hover:shadow-[0_0px_12px_12px_rgba(0,0,0,0.2)] rounded-md border-gray-100 shadow-[0_2px_10px_10px_rgba(0,0,0,0.1)] text-xs w-[300px]"
            />
            <i
              onClick={getAllCreatorCourses}
              className="ri-search-line min-[300px]:-ml-8 lg:-ml-2 bg-black px-4 py-2 min-[300px]:rounded-sm max-[639px]:rounded-sm sm:rounded-tr-md md:rounded-tr-md lg:rounded-tr-md sm:rounded-br-md md:rounded-br-md lg:rounded-br-md text-white shadow-[0_2px_10px_10px_rgba(0,0,0,0.1)] hover:bg-gray-400 hover:text-black text-xs"
            ></i>
          </span>

          <div className="bg-black border-black border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-white hover:text-black hover:border-black hover:border-2 hover:border-solid w-32 min-[300px]:-ml-8 sm:ml-0">
            <Link
              to="/upload-course"
              className="flex flex-row justify-center items-center text-xs"
            >
              New Course
            </Link>
          </div>
        </div>
        <div className="min-[300px]:grid min-[639px]:grid-rows-1 lg:grid lg:grid-cols-12 col-span-12 my-4 gap-4 px-16">
          {isLoading && <div class="loading">Loading&#8230;</div>}

          {courses &&
            courses.length > 0 &&
            courses?.map((course) => (
              <div
                key={course._id}
                className="grid grid-cols-12 col-span-12 cursor-pointer shadow-gray-300 shadow-sm rounded-sm px-2 py-2 justify-center items-center gap-4 my-2"
              >
                <div className="flex col-span-2 gap-5">
                  <img
                    onClick={() => {
                      navigate(`/learner-course-details-page/${course._id}`);
                    }}
                    src={`http://localhost:5000/${course.coverImage}`}
                    className="min-[300px]:w-fill lg:w-fill rounded-md"
                  />
                  <div className="flex gap-2 ml-auto">
                    <Link
                      to={`/update-course/${course._id}`}
                      className="bg-blue-600 h-10 px-5 py-2 text-white"
                    >
                      Update
                    </Link>
                    <button onClick={() => handleCourseDelete(course._id)} className="bg-red-600 h-10  px-5 py-2 text-white">
                      Delete
                    </button>

                  </div>
                </div>
                <div className="grid grid-cols-12 col-span-12">
                  <div className="grid grid-rows-2 col-span-4 items-center gap-8">
                    <span className="text-xl font-semibold col-span-6">
                      {course?.title}
                    </span>
                    <span className="text-md col-span-6">
                      {course?.category?.name}
                    </span>
                    <span>Rs. {course.price}</span>
                    <span>{course.language}</span>
                    <div className="grid grid-cols-4 col-span-4 gap-4 items-center">
                      <span className="bg-purple-600 text-white px-[1px] py-[1px] text-xs col-span-1 uppercase text-center rounded-full">
                        live
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Buy Stock Modal"
        ariaHideApp={false}
      >
        <div className="">
          <div className="bg-blue-500">
            <div className="bg-blue-500 p-2 rounded-t-lg">
              <h2 className="text-center text-white font-bold">
                Update your Bio
              </h2>
            </div>
          </div>
          <div className="mt-5">
            <textarea
              type="text"
              className="w-full border border-gray-400 p-3 rounded"
              rows="4"
              placeholder="Enter your bio here..."
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
              onClick={() => updateBioFunction({ bio })}
            >
              Submit
            </button>

            <button
              className="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default CreaterDashboard;
