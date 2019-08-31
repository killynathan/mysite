import React from "react"
import { Link } from "gatsby"
import styles from "./postListing.module.css"

export default ({ posts }) => {
  return (
    <section>
      {posts.map(
        ({ node }) =>
          node.frontmatter.visible === "true" && (
            <Link to={node.fields.slug} className={styles.link}>
              <div key={node.id} className="post">
                <h3 className="post-title">{node.frontmatter.title}</h3>
                <p className="post-date">{node.frontmatter.date}</p>
              </div>
            </Link>
          )
      )}
    </section>
  )
}
