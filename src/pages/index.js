import React from "react"
import Layout from "../components/Layout"
import * as styles from '../styles/home.module.css'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'


export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <h2>Welcome to SLP World</h2> 
        <div className={styles.profile}>
        <StaticImage className={styles.profile__img} src="../images/mickey_profile.jpeg" alt="Profile photo" />
        <p className={styles.profile__text}><br />Hello, I'm a speech pathologist based in 
          Sacramento, California. <br/>This website is my ditital cabinet of things I've learned and thought. <br/>
        </p>
        <Link to="/about" className={styles.about__btn}>More about me</Link>
        </div>
      </div>
    </Layout>
  )
}
