import React from 'react' 
import { Link } from 'react-router-dom'
import courses from './courses.module.css'


const Courses = () => {
    const allCourses = [
        {
            id: 1,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img.webp",
            courseName: "Learn Python Programming Beginner",
            stars: 4.5,
            views: "49,00",
            plays: 9,
            price: 200,
            discountedPrice: 150
        },
        {
            id: 2,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img2.webp",
            courseName: "Statistics Data Science and Business Analysis",
            stars: 4.3,
            views: "23,00",
            plays: 7,
            price: 150,
            discountedPrice: 99.99
        },
        {
            id: 3,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img3.webp",
            courseName: "Learn HTML5 Programming Beginning",
            stars: 4.7,
            views: "70,00",
            plays: 15,
            price: 100,
            discountedPrice: 70
        },
        {
            id: 4,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img.webp",
            courseName: "Software Development From A to Z Beginner",
            stars: 4.2,
            views: "35,00",
            plays: 12,
            price: 250,
            discountedPrice: 220
        },
        {
            id: 5,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img4.webp",
            courseName: "Graphic Design Masterclass for Beginning",
            stars: 4.5,
            views: "49,00",
            plays: 9,
            price: 100,
            discountedPrice: 50
        },
        {
            id: 6,
            img: "http://skilify.theuxuidesigner.com/images/webp/crd-img5.webp",
            courseName: "The Complete JavaScript Course Beginner",
            stars: 4.8,
            views: "85,00",
            plays: 17,
            price: 320,
            discountedPrice: 270
        }

    ]
    return (
        <div>
            <div className={courses.container}>
                <div className={courses.Head}>
                    <h1>Get choice of your course</h1>
                    <Link to="/" className={courses.button}>
                        View All
                    </Link>
                </div>

                <div className={courses.allCourses}>
                    <div className={courses.grid}>
                        {allCourses.map((course) => (
                            <div className={courses.gridItem} key={course.id}>

                                <img src={course.img} alt={course.courseName} />



                                <div className={courses.infoItems}>
                                    <p>
                                        <img src="http://skilify.theuxuidesigner.com/images/svg/star.svg" alt="star" /> {course.stars}
                                    </p>
                                    <p>
                                        <img src="http://skilify.theuxuidesigner.com/images/svg/crd-view.svg" alt="star" /> {course.views}
                                    </p>
                                    <p>
                                        <img src="http://skilify.theuxuidesigner.com/images/svg/crd-play.svg" alt="star" /> {course.plays}
                                    </p>


                                </div>
                                <h3>{course.courseName}</h3>
                                <div className={courses.priceInfo}>
                                    <p className={courses.discountedPrice}>${course.discountedPrice}</p>
                                    <p className={courses.Originalprice}>${course.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses