import React from 'react'
import category from './category.module.css';
import { Link } from 'react-router-dom';

const Categories = () => {
    const allCategories = [
        {
            id: 1,
            img: "http://skilify.theuxuidesigner.com/images/img/designimg.jpg",
            categoryName: "Design"
        },
        {
            id: 2,
            img: "http://skilify.theuxuidesigner.com/images/img/developmentimg.jpg",
            categoryName: "Development"
        },
        {
            id: 3,
            img: "http://skilify.theuxuidesigner.com/images/img/softwareimg.jpg",
            categoryName: "IT & Software"
        },
        {
            id: 4,
            img: "http://skilify.theuxuidesigner.com/images/img/categories.jpg",
            categoryName: "Business"
        },
        {
            id: 5,
            img: "http://skilify.theuxuidesigner.com/images/img/marketingimg.jpg",
            categoryName: "Marketing"
        },
        {
            id: 6,
            img: "http://skilify.theuxuidesigner.com/images/img/photographyimg.jpg",
            categoryName: "Photography"
        },
        {
            id: 7,
            img: "http://skilify.theuxuidesigner.com/images/img/healthimg.jpg",
            categoryName: "Health & Care"
        },
        {
            id: 8,
            img: "http://skilify.theuxuidesigner.com/images/img/technologyimg.jpg",
            categoryName: "Technology"
        }
    ]
    return (
        <div className={category.topcontainer} style={{zIndex:"20"}}>
            <div className={category.containerStyle}>
                <div className={category.Head}>
                    <h1>Top Categories</h1>
                    <Link to="/course-collection" className={category.button}>
                        See All Categories
                    </Link>
                </div>

                <div className={category.allCategories}>
                    <div className={category.gridBox}>
                        {allCategories.map((item) => (
                            <div className={category.gridItem} key={item.id}>
                                <img src={item.img} alt={item.categoryName} />
                                <p>{item.categoryName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;
