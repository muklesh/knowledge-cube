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

const UploadChapterByCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [chapters, setChapters] = useState([{ title: "", video: null }]);
  const handleChapterFileChange = (event, index) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].video = event.target.files[0];
    setChapters(updatedChapters);
  };
  const handleTitleChange = (event, index) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].title = event.target.value;
    setChapters(updatedChapters);
  };

  const handleAddChapter = () => {
    const chapterNumber = chapters.length + 1;
    setChapters([
      ...chapters,
      { title: "", video: null, number: chapterNumber },
    ]);
  };
  const uploadChapters = async () => {
    try {
      const invalidChapters = chapters.filter((chapter) => chapter.video === null);
      if (invalidChapters.length > 0) {
        toast.error("Please select a video for all chapters.");
        return;
      }
      const chapterIds = [];

      for (const chapter of chapters) {
        const chapterFormData = new FormData();
        chapterFormData.append("title", chapter.title);
        chapterFormData.append("video", chapter.video);

       
        const chapterResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/course-creator/courses/${courseId}/chapters`,
          chapterFormData
        );

        if (chapterResponse.status === 200) {
          chapterIds.push(chapterResponse.data.chapterId);
          // toast.error("Some error occured!")
          navigate("/creator-dashboard");
        } else {
          console.error("Error uploading chapter:", chapter.title);
          return null;
        }
      }

      return chapterIds;
    } catch (error) {
      console.error("Error uploading chapters: ", error);
      return null;
    }
  };
  return (
    <div className="p-8">
      <span className="text-xl font-semibold my-8 px-4">Course Content</span>
      {chapters.map((chapter, index) => (
        <div
          className="grid grid-rows-1 gap-2 px-4 py-2 items-center"
          key={index}
        >
          <div className="grid grid-cols-8 gap-8 rounded-lg shadow-md justify-center items-center px-6 py-6">
            {/* <div className="grid col-span-1">{`Chapter - ${chapter.number}`}</div> */}
            <div className="grid col-span-1">Chapter - {index + 1}</div>

            <div className="grid col-span-2 ">
              <span className="text-gray-500">Title</span>
              <input
                type="text"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                placeholder="Type here"
                value={chapter.title}
                onChange={(e) => handleTitleChange(e, index)}
              />
            </div>
            <div className="grid col-span-5">
              <input
                type="file"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                // onChange={(e) => handleChapterFileChange(e, index)}
                onChange={(e) => handleChapterFileChange(e, index)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-12 col-span-12 p-4">
        <div className="col-span-10 bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 my-6 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid w-[200px]">
          <button
            onClick={() => handleAddChapter()}
            className="flex flex-row justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Chapter
          </button>
        </div>
        <div className="col-span-2 bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 my-6 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid w-[200px]">
          <button
            onClick={uploadChapters}
            type="submit"
            className="flex flex-row justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadChapterByCourse;
