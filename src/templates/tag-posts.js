import React from 'react'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import { getSlug } from '../func/getSlug'
import * as styles from '../styles/tags-page.module.css'



export default function tagPosts({ data, pageContext }) {
   const posts = data.allMarkdownRemark.edges
   
   const tag = pageContext.tag
   const count = data.allMarkdownRemark.totalCount
    return (
        <Layout>
            <h1>{ tag } posts: { count }</h1>
            {
              posts.map(({ node }) => (
                <div key={ node.id } >
                  <Link to={`/${ node.fields.slug }`}>
                   <h2> { node.frontmatter.title } </h2>
                   <p>{ node.frontmatter.date }</p>
                  </Link>
                  
                  
                  {
                    node.frontmatter.tags.map(tag => (
                      <Link to={`/tag/${getSlug(tag)}`}>
                      <button className={styles.tagPage}>
                        { tag }
                      </button>
                      </Link>
                    ))
                  }
                </div>
              ))
            }
  
        </Layout>
    )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`