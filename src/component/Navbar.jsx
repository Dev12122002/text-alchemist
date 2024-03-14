import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/navbar.css'

export default function Navbar() {
    return (

        <nav className='mt-4'>
            <div className="container1">
                <ul className="nav-list1">
                    <li className="nav-item1">
                        <Link to="/" className="nav-link1 blue-top gm-hover">
                            <div className="border gradient-mauve"></div>
                            <div className="icons">
                                Summary
                                <i className="fas fa-book-open right ref"></i>
                            </div>
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                    <li className="nav-item1">
                        <Link to="/qa" className="nav-link1 blue-top gl-hover">
                            <div className="border gradient-mauve"></div>
                            <div className="icons">
                                QA
                                <i className="fas fa-question-circle right ref"></i>
                            </div>
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                    <li className="nav-item1">
                        <Link to="/text2img" className="nav-link1 blue-top gp-hover">
                            <div className="border gradient-purple"></div>
                            <div className="icons">
                                Text2Image
                                <i className="fas fa-image right ref"></i>
                            </div>
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                    <li className="nav-item1">
                        <Link to="/img2qa" className="nav-link1 blue-top gb-hover">
                            <div className="border gradient-blue"></div>
                            <div className="icons">
                                Image2QA
                                <i className="fa-solid fa-chalkboard-user right ref"></i>
                            </div>
                            <div className="border-bottom"></div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
