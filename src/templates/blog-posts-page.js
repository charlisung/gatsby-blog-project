import React, { Component } from "react"
import { Link } from "gatsby"
import * as styles from "../styles/blog.module.css"

const getCategories = items => {
  let categoryItems = items.map(item => {
    return item.node.frontmatter.category
  })
  let uniqueCategories = new Set(categoryItems)
  let categories = Array.from(uniqueCategories)
  categories = ["all posts", ...categories]
  return categories
}

const activeButtonClass = {
  backgroundColor: "#fff",
  color: "#35A354",
  boxShadow: "5px 5px #1B1D25",
  fontWeight: "500",
}

class BlogItems extends Component {
  state = {
    items: this.props.items.allMarkdownRemark.edges,
    blogPostItems: this.props.items.allMarkdownRemark.edges,
    categories: getCategories(this.props.items.allMarkdownRemark.edges),
  }

  handleItems = category => {
    if (category === "all posts") {
      this.setState({
        blogPostItems: [...this.state.items],
        selectedItem: category,
      })
    } else {
      this.setState({
        blogPostItems: [
          ...this.state.items.filter(edge => {
            return edge.node.frontmatter.category === category
          }),
        ],
        selectedItem: category,
      })
    }
  }

  render() {
    return (
      <div>
        <div className={styles.categories}>
          {this.state.categories.map((category, index) => {
            return (
              <button
                type="button"
                key={index}
                onClick={() => this.handleItems(category)}
                style={
                  this.state.selectedItem === category
                    ? activeButtonClass
                    : null
                }
              >
                {category}
              </button>
            )
          })}
        </div>

        <div>
          {this.state.blogPostItems.map(edge => {
            return (
              <Link
                to={`/${edge.node.fields.slug}`}
                key={edge.node.id}
                className={styles.card}
              >
                <div>
                  <h3> {edge.node.frontmatter.title} </h3>
                  <p> {edge.node.frontmatter.date}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

export default BlogItems
