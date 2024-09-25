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
import blankImg from "../../assets/dummy-image-square.jpg";

const validateSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("price is required"),
});

const UpdateCourse = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageData, setSelectedImageData] = useState();
  console.log("selectedImageData :>> ", selectedImageData);
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
      console.log('userId :>> ', userId);
      setId(userId);
      setToken(accessToken);
    } else {
      console.log("Token not found");
    }
  }, [accessToken]);

  const [category, setCateogy] = useState([]);
  const [certificateFile, setCertificateFile] = useState(null);
  const [assessmentFile, setAssessmentFile] = useState(null);

  const FetchCourseDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/course-creator/courses/${courseId}`
      );
      console.log("res :>> ", res);
      const { course } = res?.data;
      setValue("title", course?.title);
      setValue("description", course?.description);
      setValue("skillLevel", course?.skillLevel);
      setValue("category", course?.category);
      setValue("language", course?.language);
      setValue("price", course?.price);
      setCoverImage(course?.coverImage);
      setAssessmentFile(course?.assessmentPdf);
      setCertificateFile(course?.certificate);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    FetchCourseDetails();
  }, []);

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

  const updateCourseFunction = async (data) => {
    console.log("data :>> ", data);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("language", data.language);
      formData.append("coverImage", selectedImageData);
      formData.append("skillLevel", data.skillLevel);
      formData.append("categoryId", selectedCategoryId);
      formData.append("assessmentPdf", assessmentFile);
      formData.append("certificate", certificateFile);
      formData.append("creatorId", id);
      console.log("formData :>> ", formData);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/course-creator/update/${courseId}`,
        formData
      );
      setLoading(false);
      toast.success(response.data.message);

      //navigate(`/chapter-upload/${courseId}`);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading course: ", error);
      if (error?.response?.data?.message === "unAuthorized") {
        Cookies.remove("token");
        Cookies.remove("roleName");
        Cookies.remove("roleId");
        // navigate("/login");
      } else if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        //  navigate("/login");
      } else {
        toast.error("unsuccess");
        // navigate("/login");
      }
    }
  };

  const downloadCertificate = (certificateFile) => {
    const fullUrl = `http://localhost:5000/${certificateFile}`;

    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = "certificate.pdf";
    link.click();
  };
  return (
    <div>
      <CreatorNavbar />
      <div className="grid grid-cols-6 mb-8">
        <form
          onSubmit={handleSubmit(updateCourseFunction)}
          className="col-span-6 flex flex-col"
        >
          <div className="flex flex-row justify-between items-center px-8 py-8 bg-slate-200 bg-opacity-30">
            <div className="flex flex-row items-center">
              <span className="text-2xl font-semibold my-4 px-4">
                Update the course
              </span>
              <Link
                to={`/update-chapter/${courseId}`}
                className="ml-[20vh] rounded-lg bg-blue-800 px-4 py-2 text-white font-semibold"
              >
                Edit Chapters
              </Link>
              {/* <button onClick={()=>navigate(`/update-course/${courseId}`)} className="ml-[20vh] rounded-lg bg-blue-800 px-4 py-2 text-white font-semibold">Edit Chapters</button> */}
            </div>
          </div>

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
                <span className="text-gray-500"> ImageName.ext </span>
                {coverImage && (
                  <img
                    src={`http://localhost:5000/${coverImage}`}
                    alt=""
                    className="w-40 h-20"
                  />
                )}
                {selectedImageData && (
                  <img
                    // src={`http://localhost:5000/public/course-images/${selectedImageData}`}
                    src={URL?.createObjectURL(selectedImageData)}
                    alt=""
                    className="w-40 h-20"
                  />
                )}
                {!selectedImageData && !coverImage && (
                  <img src={blankImg} alt="" />
                )}

                <input
                  type="file"
                  className="px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-200 text-gray-400"
                  placeholder="type here"
                  name="coverImage"
                  onClick={(e) => {
                    console.log("hui");
                    e.target.value = null;
                  }}
                  onChange={(event) => {
                    console.log("hello");
                    setCoverImage(null)
                    setSelectedImageData(event.target.files[0]);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <span className="text-gray-500 text-sm">Select language</span>
                  <select
                    {...register("language")}
                    name="language"
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
                    name="skillLevel"
                    {...register("skillLevel")}
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
                    {category.map((cats) => (
                      <option selected value={cats._id} className="text-gray">
                        {cats.name}
                      </option>
                    ))}
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
              <span className="text-gray-500 mb-2"> Price </span>
              <input
                type="decimal"
                placeholder="$|0.0"
                name="price"
                className="bg-gray-200 px-2 py-2 rounded-xl "
                {...register("price")}
                // value={formState.price}
                // onChange={(e) =>
                //   setFormState({ ...formState, price: e.target.value })
                // }
              />
            </div>
            <div className="grid grid-rows-2 justify-center items-center">
              <span className="text-gray-500"> Certificate </span>

              {certificateFile && (
                <Link
                  to=""
                  onClick={() => downloadCertificate(certificateFile)}
                  className="text-sm  hover:text-blue-700 font-[400] my-2"
                >
                  View Current Certificate
                </Link>
              )}
              <input
                type="file"
                placeholder="pdf"
                className="bg-gray-200 px-2 py-2 rounded-xl"
                onChange={(e) => setCertificateFile(e.target.files[0])}
              />
            </div>

            <div className="grid grid-rows-2 justify-center items-center">
              <span className="text-gray-500"> Assessment </span>

              {assessmentFile && (
                <Link
                  to=""
                  onClick={() => downloadCertificate(assessmentFile)}
                  className="text-sm  hover:text-blue-700 font-[400] my-2"
                >
                  View Current Assessment PDF
                </Link>
              )}
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
                className="flex flex-row justify-center items-center bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid w-[200px]"
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

export default UpdateCourse;
