import React, { useState } from "react"
import Helmet from "react-helmet"
import { Link, useStaticQuery, graphql } from "gatsby"

const ListLink = props => (
  <li style={{ display: "inline-block", marginLeft: "1.5rem" }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const ExternalLink = props => (
  <li style={{ display: "inline-block", marginRight: "1rem" }}>
    <a href={props.to}>{props.children}</a>
  </li>
)

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const [isDarkMode, setIsDarkMode] = useState(false)
  const bodyClassName = isDarkMode ? "darkMode" : "lightMode"
  return (
    <>
      <Helmet
        bodyAttributes={{
          class: bodyClassName,
        }}
      ></Helmet>
      <div style={{ margin: "3rem auto", maxWidth: 800, padding: "0 1rem" }}>
        <header style={{ marginBottom: "4rem" }}>
          <Link
            to="/"
            style={{
              textShadow: `none`,
              backgroundImage: `none`,
              textDecoration: "none",
            }}
          >
            <h2 style={{ display: "inline" }}>
              {data.site.siteMetadata.title}
            </h2>
          </Link>
          {/* <ul style={{ listStyle: "none", float: "right" }}>
          <ListLink to="/projects">Projects</ListLink>
          <ListLink to="/blog">Blog</ListLink>
        </ul> */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-button"
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </header>
        {children}
        <footer style={{ paddingTop: "2rem" }}>
          <ul style={{ listStyle: "none", marginLeft: 0, paddingTop: "1rem" }}>
            <ExternalLink to="https://github.com/killynathan">
              Github
            </ExternalLink>
            <ExternalLink to="https://github.com/killynathan">
              View Source
            </ExternalLink>
          </ul>
        </footer>
      </div>
    </>
  )
}
