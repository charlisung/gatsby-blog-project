const path = require("path")
const { getSlug } = require("./src/utils/getSlug")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = getSlug(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const res = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (res.errors) return Promise.reject(res.errors)

  const posts = res.data.allMarkdownRemark.edges

  posts.forEach(({ node }) => {
    actions.createPage({
      path: "/" + node.fields.slug,
      component: path.resolve("./src/templates/single-post.js"),
      context: { slug: node.fields.slug },
    })
  })

  let tags = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  // create tag collection

  let tagPostCounts = {}
  tags.forEach(tag => {
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
  })

  tags = _.uniq(tags)

  // Tags page (all tags)
  createPage({
    path: "/tags",
    component: path.resolve("src/templates/tags-page.js"),
    context: {
      tags,
      tagPostCounts,
    },
  })

  // Tag posts pages (individual Tag)
  tags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag)}`,
      component: path.resolve("src/templates/tag-posts.js"),
      context: {
        tag,
      },
    })
  })
}
