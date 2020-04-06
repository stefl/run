import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/Post"
import Link from "gatsby-link"
import { graphql } from 'gatsby'

function PostsPage({data}) {
  return <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Stef's London Marathon Journey"
      />

      <section className="text-left w-full m-auto pt-12" style={{maxWidth: '768px'}}>
        {data.allMarkdownRemark.edges.map((post) => {
          return (
            <div className="mb-4" key={post.node.fields.slug}>
              <p className="text-xs tracking-widest text-gray-500 mb-2">
                {(new Date(post.node.frontmatter.date)).toLocaleString().replace()}
              </p>
              <h1 className="text-2xl"><Link className="flex items-center no-underline text-blue-500" to={post.node.fields.slug}>{post.node.frontmatter.title}</Link></h1>
            </div>
          )}
        )}
      </section>
    </Layout>
}

export const AllPostsQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 1000
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
      filter: {frontmatter: {draft: {ne: true}}}
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            date
            draft
            author
            workoutsFrom
            workoutsTo
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default PostsPage;
