import React from 'react'
import Navbar from './Navbar'
import '../styles/global.css'

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <section className="grid contents">
                { children }
            </section>
            {/* <footer>
                <p>2021 © SLP 🔔</p>
            </footer> */}
        </div>
    )
}
