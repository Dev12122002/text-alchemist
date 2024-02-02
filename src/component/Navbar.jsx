import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/navbar.css'

export default function Navbar() {
    return (
        // <div className="borderYtoX">
        //     <Link className='link' to="/">SUMMARY</Link>
        //     <Link className='link' to="/qa">QA</Link>
        // </div>

        <nav className='mt-4'>
            <div className="container1">
                <ul className="nav-list1">
                    {/* <li className="nav-item1">
                        <a href="#" className="nav-link1 gb-hover">
                            <div className="border gradient-blue"></div>
                            Home
                            <div className="border-bottom"></div>
                        </a>
                    </li>
                    <li className="nav-item1">
                        <a href="#" className="nav-link1 gg-hover">
                            <div className="border gradient-green"></div>
                            <div className="icons">
                                <i className="fas fa-users kurumsal"></i>
                                About
                            </div>
                            <div className="border-bottom"></div>
                        </a>
                    </li>
                    <li className="nav-item1">
                        <a href="#" className="nav-link1 gp-hover">
                            <div className="border gradient-purple"></div>
                            Projects
                            <div className="border-bottom"></div>
                        </a>
                    </li> */}
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
                    {/* <li className="nav-item1">
                        <a href="#" className="nav-link1 blue-top gl-hover">
                            <div className="border gradient-lush"></div>
                            Contact
                            <div className="border-bottom"></div>
                        </a>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}
