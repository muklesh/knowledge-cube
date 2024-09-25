import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LearnerNavbar from "../components/Navbar/LearnerNavbar";

const CourseOverview = () => {
  const text = [
    {
      title: "Learn Adobe CC with our Masterclass",
      subtitle:
        "In this Adobe CC Masterclass, you will learn Photoshop, Illustrator, Adobe XD, InDesign & more. Register now.",
      insights: [
        {
          rating: "4.5 (1,348 ratings)",
          iconClass: "ri-star-fill text-orange-400",
        },
        {
          views: "Enrolled 45 students",
          iconClass: "ri-eye-line text-green-500",
        },
        {
          duration: "Duration 10 week",
          iconClass: "ri-time-line text-gray-500",
        },
        {
          lessons: "36 Lessons",
          iconClass: "ri-play-circle-line text-violet-500",
        },
      ],
    },
  ];
  const categories = ["Overview", "Curriculum", "Instructor", "Reviews"];
  const cards = [
    {
      name: "Overview",
      details: [
        {
          header: "Course Description1",
          detail:
            " Do esse nisi duis do reprehenderit tempor tempor veniam commodo velit.Anim non incididunt aliqua reprehenderit Lorem laboris commodo eu deserunt nulla sunt proident laboris eiusmod.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description2",
          detail:
            " Dolore proident consectetur fugiat Lorem aute cupidatat non in eu Lorem ullamco sint anim.Aute sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description3",
          detail:
            " Et ex commodo voluptate dolore esse sunt nisi mollit reprehenderit commodo amet ea occaecat ullamco.Ex quis tempor velit id commodo eu qui deserunt nostrud ut aute magna. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
      ],
    },
    {
      name: "Curriculum",
      details: [
        {
          header: "Course Description4",
          detail:
            " Do esse nisi duis do reprehenderit tempor tempor veniam commodo velit.Anim non incididunt aliqua reprehenderit Lorem laboris commodo eu deserunt nulla sunt proident laboris eiusmod.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description5",
          detail:
            " Dolore proident consectetur fugiat Lorem aute cupidatat non in eu Lorem ullamco sint anim.Aute sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description6",
          detail:
            " Et ex commodo voluptate dolore esse sunt nisi mollit reprehenderit commodo amet ea occaecat ullamco.Ex quis tempor velit id commodo eu qui deserunt nostrud ut aute magna. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
      ],
    },
    {
      name: "Instructor",
      details: [
        {
          header: "Course Description7",
          detail:
            " Do esse nisi duis do reprehenderit tempor tempor veniam commodo velit.Anim non incididunt aliqua reprehenderit Lorem laboris commodo eu deserunt nulla sunt proident laboris eiusmod.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description8",
          detail:
            " Dolore proident consectetur fugiat Lorem aute cupidatat non in eu Lorem ullamco sint anim.Aute sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description9",
          detail:
            " Et ex commodo voluptate dolore esse sunt nisi mollit reprehenderit commodo amet ea occaecat ullamco.Ex quis tempor velit id commodo eu qui deserunt nostrud ut aute magna. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
      ],
    },
    {
      name: "Reviews",
      details: [
        {
          header: "Course Description10",
          detail:
            " Do esse nisi duis do reprehenderit tempor tempor veniam commodo velit.Anim non incididunt aliqua reprehenderit Lorem laboris commodo eu deserunt nulla sunt proident laboris eiusmod.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description11",
          detail:
            " Dolore proident consectetur fugiat Lorem aute cupidatat non in eu Lorem ullamco sint anim.Aute sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
        {
          header: "Course Description12",
          detail:
            " Et ex commodo voluptate dolore esse sunt nisi mollit reprehenderit commodo amet ea occaecat ullamco.Ex quis tempor velit id commodo eu qui deserunt nostrud ut aute magna. sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.sit adipisicing adipisicing anim irure aliqua nulla ad commodo qui.",
        },
      ],
    },
  ];
  const coursePricecard = [
    {
      index: "0",
      courseName: "Introduction to Python Programming",
      courseCard: [
        {
          img: "https://plus.unsplash.com/premium_photo-1682140993556-f263e434000b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
          insights: [
            {
              disPrice: "$100",
              class: "text-4xl font-semibold text-black",
            },
            {
              actPrice: "$456",
              class: "text-gray-400 text-xl font-extralight line-through",
            },
          ],
          dealLeft: "11 Hours left at this price",
          info: [
            {
              language: "English",
              img: "http://skilify.theuxuidesigner.com/images/svg/language.svg",
            },
            {
              requisites: "Use of desktop, tablet and mobile",
              img: "http://skilify.theuxuidesigner.com/images/svg/monitor-icon.svg",
            },
            {
              access: "Full time access",
              img: "http://skilify.theuxuidesigner.com/images/svg/timer.svg",
            },
            {
              perks: "Certificate of completion",
              img: "http://skilify.theuxuidesigner.com/images/svg/certificate.svg",
            },
          ],
          dealForTeams: [
            {
              deal1: "Get you team access to 3500+ top courses anytime.",
              cta: "Contact our sale",
              to: "",
            },
          ],
          socials: [
            {
              facebook: "https://www.instagram.com",
              iconclass: "ri-facebook-box-fill hover:text-blue-400",
            },
            {
              instagram: "https://www.instagram.com",
              iconclass: "ri-instagram-fill hover:text-pink-500",
            },
            {
              twitter: "https://www.instagram.com",
              iconclass: "ri-twitter-fill hover:text-blue-300",
            },
            {
              linkedin: "https://www.instagram.com",
              iconclass: "ri-linkedin-box-fill hover:text-blue-500",
            },
          ],
        },
      ],
    },
  ];
  const [set, setSet] = useState(cards[0].details);
  const [highlight, setHighlight] = useState(true);
  const [unhighlight, setUnhighlight] = useState(false);
  function clickFunction(val) {
    if (
      val != "Overview" &&
      (val === "Curriculum" || val === "Instructor" || val === "Reviews")
    ) {
      setHighlight(false);
      setUnhighlight(true);
    }
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].name === val) {
        setSet(cards[i].details);
        break;
      }
    }
  }
  useEffect(() => {
    setHighlight(true);
    setUnhighlight(false);
    function clickFunction(val) {
      if (
        val != "Overview" &&
        (val === "Curriculum" || val === "Instructor" || val === "Reviews")
      ) {
        setHighlight(false);
      }
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].name === val) {
          setSet(cards[i].details);
          break;
        }
      }
    }
  }, []);
 


  
  return (
    <div>
      <LearnerNavbar />
      <div className="grid grid-cols-12 gap-2">
        {/* HEADER AND INSIGHTS */}
        <div className="grid grid-cols-12 col-span-8 gap-4 px-12 py-12">
          {text.map((element) => (
            <div className="col-span-12">
              <span className="text-5xl flex flex-cols col-span-5 my-4">
                {element.title}
              </span>
              <span className="text-sm font-extralight flex flex-cols col-span-5 my-2">
                {element.subtitle}
              </span>
              <div className="flex flex-rows col-span-5 my-2">
                {element.insights.map((insight) => (
                  <span className="flex flex-rows mx-2 col-span-4 justify-center items-center">
                    <i className={insight.iconClass}></i>
                    <span className="text-sm font-extralight">
                      {insight.rating} {insight.views} {insight.duration}
                      {insight.lessons}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
          {/* FILTER AND DESCRIPTION */}
          <div className="grid grid-cols-12 justify-center items-center col-span-12 col-start-1">
            {categories.map((key, element) => (
              <button
                key={key}
                // style={ backgroundColor}
                className={
                  categories[element] === "Overview" &&
                  highlight === true &&
                  unhighlight != true
                    ? "flex col-span-2 justify-center mx-2 px-2 py-2 rounded-sm hover:bg-orange-500 hover:text-white items-center bg-orange-500 text-white font-extralight focus:bg-orange-500 focus:text-white active:bg-orange-400 active:text-white"
                    : "flex col-span-2 justify-center mx-2 px-2 py-2 rounded-sm hover:bg-orange-500 hover:text-white items-center bg-gray-300 text-gray-700 font-extralight focus:bg-orange-500 focus:text-white active:bg-orange-400 active:text-white"
                }
                onClick={() => clickFunction(categories[element])}
              >
                {categories[element]}
              </button>
            ))}
          </div>
          <div className="col-span-12 col-start-1">
            {set.map((ele) => (
              <div className="col-span-8 my-4">
                <span className="text-3xl">{ele.header}</span>
                <br />
                {ele.detail}
              </div>
            ))}
          </div>
        </div>

        {/* COURSE PRICE CARD */}
        <div className="grid grid-cols-4 col-span-4 col-start-9 items-center my-8 mx-8">
          {coursePricecard.map((element) => (
            <div className="flex flex-col col-span-4 px-4 py-4 bg-white border-2 border-gray-100 shadow-2xl shadow-gray-400 rounded-md transition ease-in delay-0 hover:-translate-y-2 duration:1000">
              {element.courseCard.map((elements) => (
                <div className="flex flex-col">
                  <img src={elements.img} className="w-fill rounded-md z-10" />
                  <div className="flex flex-row justify-center items-center my-4">
                    {elements.insights.map((insight) => (
                      <span className={insight.class + " mx-2"}>
                        {insight.disPrice}
                        {insight.actPrice}
                      </span>
                    ))}
                  </div>
                  <span className="flex justify-center items-center text-center text-orange-400 leading-6 mb-4">
                    <i className="ri-time-line text-orange-400"></i>
                    {elements.dealLeft}
                  </span>
                  <div className="bg-[#3484B4] border-[#3484B4] border-2 border-solid rounded-md px-2 py-2 text-center text-white hover:bg-white hover:text-[#3484B4] hover:border-[#3484B4] hover:border-2 hover:border-solid">
                    <Link
                      to="/new-course"
                      className="flex flex-row justify-center items-center"
                    >
                      Buy Now
                    </Link>
                  </div>
                  <span className="text-xl font-semibold mt-4">
                    This course includes
                  </span>
                  <div className="flex flex-col border-b-[1px] border-gray-200">
                    {elements.info.map((ele) => (
                      <div className="flex flex-cols items-center">
                        <img src={ele.img} className="mr-2" />
                        <span className="font-extralight my-2">
                          {ele.language}
                          {ele.requisites}
                          {ele.access}
                          {ele.perks}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xl font-semibold mt-4">
                    Training 5 or more people?
                  </span>
                  <div className="flex flex-col border-b-[1px] border-gray-200">
                    {elements.dealForTeams.map((ele) => (
                      <div className="flex flex-cols items-center">
                        <span className="font-extralight my-2">
                          {ele.deal1}
                          <Link to={ele.to} className="text-orange-400">
                            {ele.cta}
                          </Link>
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xl font-semibold mt-4">
                    Share this course
                  </span>
                  <div className="flex flex-rows justify-center items-center">
                    {elements.socials.map((ele) => (
                      <Link to={ele.facebook}>
                        <i className={ele.iconclass}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
