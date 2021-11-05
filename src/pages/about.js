import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from "../styles/about.module.css"

export default function About() {
  return (
    <Layout>
      <div className={styles.card}>
        <StaticImage src="../images/mickey_dino.png"></StaticImage>
        <div class={`${styles.bubble} ${styles.tail}`}>
          Hi, my name is Mickey. <br /> I'm a fennec fox. Not a dinosaur!
        </div>
        <br />
      </div>
    </Layout>
  )
}
