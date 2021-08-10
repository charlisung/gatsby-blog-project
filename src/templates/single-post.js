import React from "react"
import Layout from "../components/Layout"
import * as styles from '../styles/blog-post.module.css'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import { getSlug } from "../func/getSlug"
import { FaTag } from "react-icons/fa"


export default function allPostsDetail({ data, pageContext }) {
    
    const { html, id } = data.markdownRemark
    const { title, featuredImg, tags, date } = data.markdownRemark.frontmatter
   
    return (
      <Layout className="blog-post">

        <div className={styles.title}>
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
        <div className={styles.featured}>
            <Img fluid={featuredImg.childImageSharp.fluid} />
          </div>
          <div className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />
          <div className={styles.tags}>
            <FaTag />
            {
              tags.map(tag => (
                <button key={id} className={styles.tag}>
                <Link to={`/tag/${getSlug(tag)}`}>{ tag }</Link>
                </button>
              ))
            }
          </div>
         

      </Layout>
    )
}
   
  
export const query = graphql`
  query allBlogPosts($slug: String) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        featuredImg {
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
  `