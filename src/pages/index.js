import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/home.module.css"
import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { stubArray } from "lodash"

export default function Home({ data }) {
  const newPosts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <div className={styles.home}>
        <h2>
          <span>Welcome to SLP World</span>
        </h2>
        <div>
          <StaticImage
            className={styles.profile__img}
            src="../images/mickey_profile.jpeg"
            alt="Profile photo"
          />
          <p className={styles.profile__text}>
            <br />
            Hello, I'm a speech pathologist based in Sacramento, California.{" "}
            <br />
            This website is my ditital cabinet of things I've learned and
            thought. <br />
          </p>
          <Link to="/about" className={styles.about__btn}>
            More about me
          </Link>
        </div>
      </div>
      <section className={styles.newPosts}>
        <h3>New Articles</h3>
        {newPosts.map(({ node }) => {
          return (
            <Link
              to={`/${node.fields.slug}/`}
              key={node.id}
              className={styles.newPost}
            >
              <Img
                fluid={node.frontmatter.thumb.childImageSharp.fluid}
                className={styles.thumbnail}
              />
              <p> {node.frontmatter.title} </p>
            </Link>
          )
        })}
      </section>
    </Layout>
  )
}
export const query = graphql`
  query NewPosting {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            thumb {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          id
          fields {
            slug
          }
        }
      }
    }
  }
`
