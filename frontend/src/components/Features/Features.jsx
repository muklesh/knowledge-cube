import React from 'react'
import { Link } from 'react-router-dom'
import fstyle from './features.module.css'
function Features() {
    return (
        <div>
            <section className={fstyle.features}>
            <div className={fstyle.container}>
                <div className={fstyle.Head}>
                    {/* heading and button */}
                    <h1>Know about best online learning platform</h1>
                    <Link to="/" className={fstyle.button}>
                        Start Now
                    </Link>
                </div>

                <div className={fstyle.content}>
                    <div className={fstyle.list}>
                        <div className={fstyle.list1}>
                            <h3>01. Unlimited Course & Students</h3>
                            <p>We offer unlimited course options to our students from which they can select the best for them.</p>
                        </div>
                        <div className={fstyle.list2}>
                            <h3>02. Learn from industry experts</h3>
                            <p>You will learn from our experts who have many years of experience in their respective fields.</p>
                        </div>
                        <div className={fstyle.list3}>
                            <h3>03. Earn A Certificate Or Degree</h3>
                            <p>Once you complete your course, you will earn a certificate or degree for the same from our institute.</p>
                        </div>
                    </div>

                    <div className={fstyle.images}>
                        <div className={fstyle.row1}>
                            <div className={fstyle.img1}>
                                <img src="https://skilify.theuxuidesigner.com/images/webp/girl-with-laptop2.webp" alt="girl with laptop" />
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>
                            <div className={fstyle.img2}>
                                <img src="https://skilify.theuxuidesigner.com/images/webp/girl-with-laptop.webp" alt="girl with laptop2" />
                            </div>
                        </div>
                        <div className={fstyle.row2}>
                            <div className={fstyle.img3}>
                                <img src="https://skilify.theuxuidesigner.com/images/webp/girl-with-laptop3.webp" alt="girl with laptop3" />
                            </div>
                        </div>
                        <div className={fstyle.bgImg}></div>
                    </div>
                </div>
            </div>
            </section>
            
        </div>
    )
}

export default Features
