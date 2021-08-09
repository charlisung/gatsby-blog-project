import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <section className="contents">
                { children }
            </section>
            <footer>
                <p>2021 © SLP 🔔</p>
            </footer>
        </div>
    )
}
