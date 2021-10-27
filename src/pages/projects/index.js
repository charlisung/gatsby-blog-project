import React, { useState } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../styles/projects.module.css"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { getSlug } from "../../utils/getSlug"

const ProjectIndex = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges
  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value

    const posts = data.allMarkdownRemark.edges || []

    const filteredData = posts.filter(post => {
      const { title, tags } = post.node.frontmatter
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  return (
    <Layout>
      <div className={styles.search}>
        <h2>Projects</h2>
        <input
          type="text"
          className={styles.input}
          aria-label="Search"
          placeholder="Type to filter posts..."
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.projects}>
        {posts.map(({ node }) => {
          return (
            <Link
              to={`/${node.fields.slug}`}
              key={node.id}
              className={styles.project}
            >
              {node.frontmatter.thumb.childImageSharp && (
                <Img fluid={node.frontmatter.thumb.childImageSharp.fluid} />
              )}
              <h2> {node.frontmatter.title} </h2>
              <div>
                {node.frontmatter.tags.map(tag => (
                  <button className={styles.badge}>
                    <Link to={`/tag/${getSlug(tag)}`}>{tag}</Link>
                  </button>
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default ProjectIndex

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { post: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            thumb {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

// thumb {
//   childImageSharp {
//     fluid {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
