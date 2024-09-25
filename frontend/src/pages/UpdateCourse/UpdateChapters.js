import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatorNavbar from "../../components/Navbar/CreatorNavbar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const UploadChapterByCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [chapters, setChapters] = useState([{ title: "", video: null }]);
  console.log("chapters :>> ", chapters);
  const handleTitleChange = (event, index) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].title = event.target.value;
    setChapters(updatedChapters);
  };

  const GetChapters = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/course-creator/courses/${courseId}`
      );
      setChapters(res?.data?.course?.chapters);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  useEffect(() => {
    GetChapters();
  }, []);

  const handleSelectedVideo = (event, index) => {
    const updatedChapters = [...chapters];
    if (updatedChapters[index]) {
      updatedChapters[index].video = event.target.files[0];
      setChapters(updatedChapters);
    }
  };
  const handleUpdateChapter = async (chapter) => {
    try {
      if (chapter && chapter.video) {
        const formData = new FormData();
        formData.append("title", chapter.title);
        formData.append("video", chapter.vedio);
        const response = await axios.patch(
          `http://localhost:5000/api/course-creator/update-chapter/${chapter._id}`,
          formData
        );
        toast.success(response?.data?.message);
        GetChapters();
      } else {
        console.error("Chapter or video not found.");
      }
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  };

  const handleChapterDelete = async (chapter) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/course-creator/delete-chapter/${chapter?._id}`
      );
      toast.success(response?.data?.message);
      GetChapters();
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  return (
    <div className="p-8">
      <Link
        to={`/update-course/${courseId}`}
        className="text-lg font-semibold items-center  px-4 mb-10 flex"
      >
        <IoMdArrowRoundBack /> <span className="">Back</span>
      </Link>
      <span className="text-xl font-semibold my-8 px-4">Course Content</span>
      {chapters?.map((chapter, index) => (
        <div
          className="grid grid-rows-1 gap-2 px-4 py-2 items-center"
          key={chapter?._id}
        >
          <div className="grid grid-cols-8 gap-8 rounded-lg shadow-md justify-center items-center px-6 py-6">
            <div className="grid col-span-1">Chapter - {index + 1}</div>
            <div className="grid col-span-2 ">
              <span className="text-gray-500">Title</span>
              <input
                type="text"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                placeholder="Type here"
                value={chapter?.title}
                onChange={(e) => handleTitleChange(e, index)}
              />
            </div>
            <div className="grid col-span-2">
              {chapter?.videoUrl && (
                <video width="350" height="600" controls>
                  <source
                    src={`http://localhost:5000/${chapter?.videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              {/* {selectedVedio && (
                <video width="350" height="600" controls>
                  <source
                    src={URL?.createObjectURL(selectedVedio)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )} */}
              <input
                type="file"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                onChange={(e) => handleSelectedVideo(e, index)}
              />
            </div>
            <button
              className="bg-blue-600 p-2 rounded-lg text-white"
              onClick={() => handleUpdateChapter(chapter)}
            >
              Update
            </button>
            <button
              className="bg-red-600 p-2 rounded-lg text-white"
              onClick={() => handleChapterDelete(chapter)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadChapterByCourse;
