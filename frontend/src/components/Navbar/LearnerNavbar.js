import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LearnerNavbar = ({backgroundColor , yes}) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [id, setId] = useState("");

  const token = Cookies.get("token");
  const roleName = Cookies.get("roleName");
  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      setId(userId);
      setAccessToken(accessToken);
    } else {
      console.log("Token not found");
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("roleId");
    Cookies.remove("roleName");
    Cookies.remove("userId");
    Cookies.remove("userName");
    navigate("/login")
    console.log("Logout button clicked");
    window.location.reload()
  
  };
  backgroundColor = yes==="false"? "transparent":backgroundColor;

  return (
    <div className="relative grid grid-cols-12 px-4 justify-between items-center z-30" style={{backgroundColor}}>
      <div className="grid grid-cols-12 col-span-12 col-start-1 px-4 py-4 justify-between items-center">
        <div onClick={()=>navigate("/")} className="flex flex-col mr-4 cursor-pointer">
          <img
            src="https://i.ibb.co/5MXSrg8/cropped-logo.png"
            className="w-16"
          />
        </div>
        <div className="col-span-1 ml-[90px]">
          <Link
            to="/learner-dashboard"
            className="py-4 text-sm text-gray-600 hover:text-gray-500 hover:underline active:underline"
          >
            Dashboard
          </Link>
        </div>
        <div className="col-span-1 col-start-4">
          <Link
            to="/all-courses"
            className="py-4 text-sm text-gray-600 hover:text-gray-500 hover:underline active:underline"
          >
            View Courses
          </Link>
        </div>
        {/* <div className="col-span-3">
          <Link
            to="/community-chat"
            className=" py-4 text-sm text-gray-600 hover:text-gray-500 hover:underline active:underline"
          >
            Community Chat
          </Link>
        </div> */}
        <div className="grid grid-cols-4 col-span-4 col-start-10 gap-4">
          <div className="bg-transparent border-gray-700 border-2 border-solid rounded-sm px-2 py-2 text-center text-black hover:text-white hover:bg-gray-700  hover:border-gray-700 hover:border-2 hover:border-solid col-span-2">
            <Link
              to="/profile-update"
              className="flex flex-row justify-center items-center text-xs "
            >
              <i className="ri-user-line text-black text-xs mr-4"></i>
              Profile
            </Link>
          </div>
          <div className="bg-gray-700 border-gray-700 border-2 border-solid rounded-sm px-2 py-2 text-center text-white hover:bg-gray-800  hover:border-gray-700 hover:border-2 hover:border-solid col-span-2">
            <Link
              onClick={handleLogout}
              className="flex flex-row justify-center items-center text-xs"
            >
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerNavbar;
