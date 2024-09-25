import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Categories from "../../components/Categories/Categories";
import Courses from "../../components/Courses/Courses";
import Reviews from "../../components/reviews/Reviews";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.cover}>
          <Navbar />
          <div className={styles.coverOverlay}></div>
          <HeroSection />
        </div>
      </div>
      <Categories />
      <Courses />
      <Reviews />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
