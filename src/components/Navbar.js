import React, { useState } from "react"
import { Link } from "gatsby"
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa"
import "../styles/global.css"

export default function Navbar() {
  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBackground)
  }

  return (
    <nav className={navbar ? "navbar active" : "navbar"}>
      <div className="container">
        <h2 className="logo-title">
          <Link to="/">
            <FaAmericanSignLanguageInterpreting className="icon" />
            SLP Bell
          </Link>
        </h2>
        <div className="links">
          <Link to="/about">About</Link>
          <Link to="/blog">blogs</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tags">Tags</Link>
        </div>
      </div>
    </nav>
  )
}
