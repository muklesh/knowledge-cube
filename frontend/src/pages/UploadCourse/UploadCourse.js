import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatorNavbar from "../../components/Navbar/CreatorNavbar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const validateSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("price is required"),
});

const UploadCourse = () => {
  const navigate = useNavigate();
  const [certificateFile, setCertificateFile] = useState(null);
  const [assessmentFile, setAssessmentFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const accessToken = Cookies.get("token");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setId(userId);
      setToken(accessToken);
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);

  const handleImageUpload = (event) => {
    const coverImage = event.target.files[0];
    if (coverImage && coverImage.type.startsWith("image/")) {
      setSelectedImage(coverImage);
    } else {
      console.error("Invalid Image Format");
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setFormData({ ...formData, coverImage: selectedImage });
    }
  }, [selectedImage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    skillLevel: "",
    coverImage: null,
    assessmentPdf: null,
    certificate: null,
  });

  const [chapters, setChapters] = useState([{ title: "", video: null }]);

  const handleChapterFileChange = (event, index) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].video = event.target.files[0];
    setChapters(updatedChapters);
  };
  const Creator = Cookies.get("userName");
  const capitalizedCreator = Creator.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const username = capitalizedCreator;
  const [category, setCateogy] = useState([]);
  const getCategories = async () => {
    try {
      const categoryRes = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/category/get-categories`
      );
      setCateogy(categoryRes.data.data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const uploadCourseFunction = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("language", data.language);
      formData.append("coverImage", selectedImage);
      formData.append("skillLevel", data.skillLevel);
      formData.append("categoryId", selectedCategoryId);
      formData.append("assessmentPdf", assessmentFile);
      formData.append("certificate", certificateFile);
      formData.append("creatorId", id);
      if (!certificateFile) {
        toast.error("Please add a certificate pdf");
      }
      if (!selectedImage) {
        toast.error("Please add a Cover Image");
      }
      if (!assessmentFile) {
        toast.error("Please add a assessment pdf");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/course-creator/create-course`,
        formData
      );
      setLoading(false);
      toast.success(response.data.message);
      const courseId = response.data.course._id;
      navigate(`/chapter-upload/${courseId}`);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading course: ", error);
      if (error?.response?.data?.message === "unAuthorized") {
        Cookies.remove("token");
        Cookies.remove("roleName");
        Cookies.remove("roleId");
        navigate("/login");
      } else if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        // navigate("/login");
      } else {
        toast.error("unsuccess");
        // navigate("/login");
      }
    }
  };

  return (
    <div>
      <CreatorNavbar />
      <div className="grid grid-cols-6 mb-8">
        <form
          onSubmit={handleSubmit(uploadCourseFunction)}
          className="col-span-6 flex flex-col"
        >
          <div className="flex flex-row justify-between items-center px-8 py-8 bg-slate-200 bg-opacity-30">
            <div className="flex flex-row items-center">
              <div className="text-xl font-thin text-gray-600">
                <span className="text-xl font-thin text-gray-600 mr-2">
                  Good Morning
                </span>
                <span className="font-semibold text-[#3484B4]">
                  {username}!!
                </span>
              </div>
            </div>
            <div className="bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 text-center text-white w-[150px] cursor-none">
              <Link
                to="/upload-course"
                className="flex flex-row justify-center items-center text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mx-4"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                New Course
              </Link>
            </div>
          </div>
          <span className="text-l font-semibold my-4 px-4">
            Upload New Course
          </span>
          <div className="grid grid-cols-4 gap-4 justify-center items-center px-4">
            <div className="grid grid-cols-1 gap-4 col-span-2">
              <div className="grid grid-col-1 gap-2">
                <span className="text-gray-500 text-sm">Title</span>
                <input
                  type="text"
                  name="title"
                  placeholder="type here"
                  className="px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-200"
                  {...register("title")}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <span className="text-gray-500 text-sm">Description</span>
                <textarea
                  cols="10"
                  type="text"
                  placeholder="type here"
                  name="description"
                  className="px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-200"
                  {...register("description")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 col-span-2">
              <div className="grid grid-cols-1 gap-2">
                <span className="text-gray-500 text-sm">
                  Upload Cover Image
                </span>
                <input
                  type="file"
                  className="px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-200 text-gray-400"
                  placeholder="type here"
                  name="coverImage"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <span className="text-gray-500 text-sm">Select language</span>
                  <select
                    {...register("language")}
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="px-4 py-4 text-gray-400 bg-gray-200 rounded-xl"
                  >
                    <option value="" disabled className="text-gray">
                      Language is...
                    </option>
                    <option selected value="English" className="text-gray">
                      English
                    </option>
                    <option selected value="Hindi" className="text-gray">
                      Hindi
                    </option>
                    <option value="Telugu" selected className="text-gray">
                      Telugu
                    </option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <span className="text-gray-500 text-sm">
                    Select skill level
                  </span>
                  <select
                    {...register("skillLevel")}
                    value={formData.skillLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, skillLevel: e.target.value })
                    }
                    className="px-4 py-4 text-gray-400 bg-gray-200 rounded-xl"
                  >
                    <option selected value="" disabled className="text-gray">
                      Skill level is...
                    </option>
                    <option selected value="Beginner" className="text-gray">
                      Beginner
                    </option>
                    <option selected value="Intermediate" className="text-gray">
                      Intermediate
                    </option>
                    <option selected value="Advance" className="text-gray">
                      Advance
                    </option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <span className="text-gray-500 text-sm">select Category</span>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="px-4 py-4 text-gray-400 bg-gray-200 rounded-xl"
                  >
                    <option selected value="" disabled className="text-gray">
                      Select a Category
                    </option>
                    {category.map((cats) => (
                      <option selected value={cats._id} className="text-gray">
                        {cats.name}
                      </option>
                    ))}
                    {/* <option selected value="Intermediate" className="text-gray">
                      Intermediate
                    </option>
                    <option selected value="Advance" className="text-gray">
                      Advance
                    </option> */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <span className="text-l font-semibold my-8 px-4">
            Other Information
          </span>
          <div className="grid grid-cols-4 px-4 gap-4 items-center">
            <div className="grid grid-rows-2 justify-center items-center">
              <span className="text-gray-500"> Price </span>
              <input
                type="decimal"
                placeholder="$|0.0"
                name="price"
                className="bg-gray-200 px-2 py-2 rounded-xl "
                {...register("price")}
              />
            </div>
            <div className="grid grid-rows-2 justify-center items-center">
              <span className="text-gray-500"> Certificate </span>
              <input
                type="file"
                placeholder="pdf"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                onChange={(e) => setCertificateFile(e.target.files[0])}
              />
            </div>

            <div className="grid grid-rows-2 justify-center items-center">
              <span className="text-gray-500"> Assessment </span>
              <input
                type="file"
                placeholder="pdf"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                onChange={(e) => setAssessmentFile(e.target.files[0])}
              />
            </div>

            <div className="grid justify-center items-end mt-8">
              <button
                type="submit"
                className="flex justify-center items-center bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid w-[200px]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCourse;
