import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../../components/Layout"
// import BlogItems from "../../templates/blog-posts-page"

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
      h3llo
      {categories.map((category, i) => {
        return (
          <button type="button" key={i} onClick={() => handleClick(category)}>
            {category}
          </button>
        )
      })}
      <div>
        {posts.map((post, i) => {
          return (
            <Link key={i}>
              <div>{post.node.frontmatter.title}</div>
            </Link>
          )
        })}
      </div>
      {/* <BlogItems items={data} /> */}
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
