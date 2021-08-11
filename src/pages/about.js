import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from "../styles/about.module.css"
import { useStaticQuery, graphql } from "gatsby"
import { FaCloudDownloadAlt, FaFileDownload } from "react-icons/fa"

export default function About() {
  const myResumePdf = useStaticQuery(graphql`
    {
      pdf: file(name: { eq: "resume" }) {
        name
        extension
        publicURL
      }
    }
  `)
  return (
    <Layout>
      <div className={styles.card}>
        <StaticImage src="../images/mickey_dino.png"></StaticImage>
        <div class={`${styles.bubble} ${styles.tail}`}>
          Hi, my name is Mickey. <br /> I'm a fennec fox. Not a dinosaur!
        </div>
        <br />
      </div>
      <div className={styles.resume}>
        <h3>My resume</h3>
        <a href={myResumePdf.pdf.publicURL}>
          <p>
            {myResumePdf.pdf.name} without download <FaFileDownload />
          </p>
        </a>
        <a href={myResumePdf.pdf.publicURL} download>
          <p>
            {myResumePdf.pdf.name} with download <FaCloudDownloadAlt />
          </p>
        </a>
      </div>
    </Layout>
  )
}
