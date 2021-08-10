import React from 'react'
import { Link } from 'gatsby'
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import '../styles/global.css'


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container"> 
                <h2 className="logo-title">
                    <Link to="/">
                    <FaAmericanSignLanguageInterpreting className="icon" />
                    SLP Bell
                    </Link>
                </h2>
            <div className="links">
                <Link to="/blog">Blog</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/about">About</Link>
            </div>
            </div>
        </nav>
    )
}
