import React from 'react'
import footer from './footer.module.css'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <div className={footer.footerWrapper}>
            <div className={footer.container}>
                <div className={footer.copyright}>

                    <div className={footer.row}>

                        <div className={footer.content}>
                            <p>&copy; 2023 Knowledge Hub Education Private Limited. All rights reserved</p>
                        </div>
                        <div className={footer.socialLinks}>
                            <div className={footer.icons}>
                                <Link to="https://www.facebook.com/" >
                                    <svg className={footer.svgIcon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <g transform="translate(-0.183 -0.183)">
                                            <path d="M19,3.592A.591.591,0,0,0,18.41,3H15.455A5.638,5.638,0,0,0,9.546,8.32v3.191H6.591A.591.591,0,0,0,6,12.1v3.073a.591.591,0,0,0,.591.591H9.546v7.919a.591.591,0,0,0,.591.591h3.546a.591.591,0,0,0,.591-.591V15.765h3.1a.591.591,0,0,0,.579-.437l.851-3.073a.591.591,0,0,0-.567-.745H14.273V8.32a1.182,1.182,0,0,1,1.182-1.064H18.41A.591.591,0,0,0,19,6.665Z" transform="translate(1.091 0.545)"></path>
                                        </g>
                                    </svg>
                                </Link>
                                <Link to="https://twitter.com/">
                                    <svg className={footer.svgIcon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <path d="M8.926,22.666A12.915,12.915,0,0,0,22.273,9.833,9.438,9.438,0,0,0,24,6.519a.513.513,0,0,0-.723-.595,2.193,2.193,0,0,1-2.52-.443,4.538,4.538,0,0,0-6.51-.2A4.818,4.818,0,0,0,12.9,9.833C9,10.066,6.313,8.211,4.166,5.668a.5.5,0,0,0-.875.28A11.293,11.293,0,0,0,8.658,17.673a7.852,7.852,0,0,1-5.215,2.66.525.525,0,0,0-.163.98,12.833,12.833,0,0,0,5.647,1.353" transform="translate(0.501 0.667)"></path>
                                    </svg>
                                </Link>
                                <Link to="https://mail.google.com/mail/">
                                    <svg className={footer.svgIcon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <path d="M20.084,16a6.428,6.428,0,0,1-5.25,4.585,7.175,7.175,0,0,1-8.167-6.358,7,7,0,0,1,7-7.56,7.14,7.14,0,0,1,2.648.513.583.583,0,0,0,.747-.245l1.68-3.092a.607.607,0,0,0-.268-.817A11.667,11.667,0,0,0,2,14.007,11.807,11.807,0,0,0,13.166,25.335a11.667,11.667,0,0,0,12.168-11.06V11.942a.6.6,0,0,0-.583-.583h-10.5a.583.583,0,0,0-.583.583v3.5a.583.583,0,0,0,.583.583h5.833" transform="translate(0.333 0.332)"></path>
                                    </svg>
                                </Link>
                                <Link to="https://www.linkedin.com/">
                                    <svg className={footer.svgIcon} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <path d="M16.125,8.4A6.8,6.8,0,0,0,9.3,15.19v6.86a1.05,1.05,0,0,0,1.05,1.05H12.8a1.05,1.05,0,0,0,1.05-1.05V15.19a2.263,2.263,0,0,1,2.508-2.252A2.333,2.333,0,0,1,18.4,15.272V22.05a1.05,1.05,0,0,0,1.05,1.05H21.9a1.05,1.05,0,0,0,1.05-1.05V15.19A6.8,6.8,0,0,0,16.125,8.4Z" transform="translate(1.55 1.4)"></path>
                                        <rect width="5.25" height="13.65" rx="0.9" transform="translate(3.5 10.85)"></rect>
                                        <circle cx="2.625" cy="2.625" r="2.625" transform="translate(3.5 3.5)"></circle>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
