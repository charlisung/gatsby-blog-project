import React from "react"
import Navbar from "./Navbar"
import "../styles/global.css"

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <section className="contents">{children}</section>
      <footer className="footer">
        <p>2021 © SLP 🔔</p>
      </footer>
    </div>
  )
}
