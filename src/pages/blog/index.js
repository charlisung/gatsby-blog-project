import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../../components/Layout'
import BlogItems from '../../templates/blog-posts-page'


const Blog = ({ data }) => {
  
  return (
    <Layout>
       
        <BlogItems items={data} />     
    </Layout>
  )
}

export default Blog

export const query = graphql`
query BlogMain {
  allMarkdownRemark(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {post: {eq: "blog"}}}
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