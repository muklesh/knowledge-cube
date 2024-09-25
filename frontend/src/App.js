import "./App.css";
import CourseCollection from "./pages/CourseCategories/CourseCollection";
import AllCourses from "./pages/AllCourses";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Course from "./pages/UploadCourse/UploadCourse";
import Updateprofile from "./pages/UpdateProfile/Updateprofile";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import LearnerDashboard from "./pages/LearnerDashboard";
import CreaterDashboard from "./pages/CreaterDashboard";
import EditCourse from "./pages/EditCourse";
import PrivateMessaging from "./pages/PrivateMessaging";
import Chapter from "./pages/UploadCourse/UploadChapterByCourse";
import LearnerCourseDetailsPage from "./pages/LearnerCourseDetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateCourse from "./pages/UpdateCourse/UpdateCourse";
import UpdateChapter from "./pages/UpdateCourse/UpdateChapters";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
  const [role, setRole] = useState(null);
  // console.log('role', role)

  useEffect(() => {
    const roleName = Cookies.get("roleName");
    if (roleName) {
      setRole(roleName);
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          exact
          path="/upload-course"
          element={role === "Creator" ? <Course /> : <Navigate to="/" />}
        />

        <Route
          exact
          path="/update-course/:courseId"
          element={role === "Creator" ? <UpdateCourse /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/update-chapter/:courseId"
          element={role === "Creator" ? <UpdateChapter /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/chapter-upload/:courseId"
          element={role === "Creator" ? <Chapter /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/all-courses"
          element={role === "Learner" ? <AllCourses /> : <Navigate to="/" />}
        />
        <Route exact path="/course-collection" element={<CourseCollection />} />
        <Route
          exact
          path="/learner-dashboard"
          element={role === "Learner" ? <LearnerDashboard /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/creator-dashboard"
          element={role === "Creator" ? <CreaterDashboard /> : <Navigate to="/" />}
        />
        <Route exact path="/login" element={<Signin />} />
        <Route exact path="/register" element={<Signup />} />
        <Route
          exact
          path="/profile-update"
          element={
            role === "Creator" || role === "Learner" ? <Updateprofile /> : <Navigate to="/" />
          }
        />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route
          exact
          path="/edit-course"
          element={role === "Creator" ? <EditCourse /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/community-chat"
          element={
            role === "Creator" || role === "Learner" ? <PrivateMessaging /> : <Navigate to="/" />
          }
        />
        <Route
          exact
          path="/learner-course-details-page/:courseId"
          element={
            role === "Creator" || role === "Learner" ? (
              <LearnerCourseDetailsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
