import React, { useEffect } from "react";
import HSstyles from "./HeroSection.module.css";
import courses from "../../assets/courses.svg";
import expert from "../../assets/expert.svg";
import { Link,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HeroSection() {
  const navigate=useNavigate()
 

  const handleGetStarted=()=>{
    const Token=Cookies.get("token")
    const Role= Cookies.get("roleName")
    if(!Token){
      navigate("/register")
    }
    if (Role === "Creator") {
      navigate("/creator-dashboard");
    } else if (Role === "Learner") {
      navigate("/learner-dashboard");
    } 
  }

  return (

    <div className="text-align z-0">
      <section className={HSstyles.hero}>
        <h1 className={HSstyles.heading}>
          To expand your career, get in touch with us.
        </h1>
        <p className={HSstyles.subheading}>
          Here you can select the best course for your career from a wide range
          of courses.
        </p>
        <button onClick={handleGetStarted} className={HSstyles.button}>
          Get started now for free
        </button>
      </section>

      <section>
        <div className={HSstyles.gridBox}>
          <div className={HSstyles.gridItem}>
            <img src={courses} alt="cor" />
            <h2>100k Online Courses</h2>
          </div>
          <div className={HSstyles.gridItem + " " + HSstyles.item2}>
            <img src={expert} alt="cor" />
            <h2>Expert Instruction</h2>
          </div>
          <div className={HSstyles.gridItem}>
            <img src={courses} alt="cor" />
            <h2>Lifetime Access</h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
