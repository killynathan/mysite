import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostListing from "../components/postListing"

export default ({ data }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      <PostListing posts={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
