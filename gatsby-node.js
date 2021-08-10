const path = require('path')
const { getSlug } = require('./src/func/getSlug')


exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = getSlug(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
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
        path: '/' + node.fields.slug,
        component: path.resolve('./src/templates/single-post.js'),
        context: { slug: node.fields.slug },
      })
    })

}