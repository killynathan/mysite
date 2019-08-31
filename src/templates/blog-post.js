import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Helmet>
        <title>{`${post.frontmatter.title} – ${data.site.siteMetadata.title}`}</title>
      </Helmet>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.1em" }}>{post.frontmatter.title}</h1>
        <p style={{ color: "#777c85", fontSize: "0.9em" }}>
          {post.frontmatter.date}
        </p>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
