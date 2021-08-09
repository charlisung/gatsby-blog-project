import React from 'react'
import { Link } from 'gatsby'
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">
                <FaAmericanSignLanguageInterpreting className="icon" />
                <h1> SLP Bell</h1>
            </Link>
            <div className="links">
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/projects">Projects</Link>
            </div>
        </nav>
    )
}
