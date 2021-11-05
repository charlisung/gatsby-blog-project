import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/blog.module.css"
import Img from "gatsby-image"

const Blog = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges

  const getCategories = items => {
    let categoryItems = items.map(item => {
      return item.node.frontmatter.category
    })
    let uniqueCategories = new Set(categoryItems)
    let categories = Array.from(uniqueCategories)
    categories = ["All posts", ...categories]
    return categories
  }

  const categories = getCategories(allPosts)

  const [category, setCategory] = useState("All posts")

  const handleClick = category => setCategory(category)

  const posts =
    category === "All posts"
      ? allPosts
      : allPosts.filter(post => post.node.frontmatter.category === category)

  return (
    <Layout>
      <div className={styles.category}>
        {categories.map((category, i) => {
          return (
            <button type="button" key={i} onClick={() => handleClick(category)}>
              {category}
            </button>
          )
        })}
      </div>
      <div className={styles.posting}>
        {posts.map((post, i) => {
          return (
            <div className={styles.posts}>
              <Link
                to={`/${post.node.fields.slug}`}
                key={i}
                className={styles.card}
              >
                {post.node.frontmatter.thumb && (
                  <Img
                    className={styles.thumbnail}
                    fluid={post.node.frontmatter.thumb.childImageSharp.fluid}
                  />
                )}
                <div>
                  <h3>{post.node.frontmatter.title}</h3>
                  <p>{post.node.frontmatter.date}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogMain {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { post: { eq: "blog" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            category
            date(formatString: "MMMM Do, YYYY")
            tags
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
