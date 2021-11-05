import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/single-post.module.css"
import { graphql, Link } from "gatsby"
import { getSlug } from "../utils/getSlug"
import { FaTag } from "react-icons/fa"
import ReactDisqusComments from "react-disqus-comments"
import LazyLoad from "react-lazy-load"
import Img from "gatsby-image"

export default function allPostsDetail({ data, pageContext }) {
  const { html, id } = data.markdownRemark
  const { title, tags, date, thumb } = data.markdownRemark.frontmatter
  const post = data.markdownRemark.frontmatter
  return (
    <Layout className="blog-post">
      <div className={styles.title}>
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className={styles.featured}>
        {thumb.childImageSharp.fluid && (
          <Img fluid={thumb.childImageSharp.fluid} />
        )}
      </div>

      <div className={styles.tags}>
        <FaTag />
        {tags.map(tag => (
          <button key={id} className={styles.tag}>
            <Link to={`/tag/${getSlug(tag)}`}>{tag}</Link>
          </button>
        ))}
      </div>

      <LazyLoad offsetTop={400}>
        <ReactDisqusComments
          shortname="charligatsby"
          identifier={post.id}
          title={post.title}
          url={post.url}
        />
      </LazyLoad>
    </Layout>
  )
}

export const query = graphql`
  query allBlogPosts($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
`
