import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/Post"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import NonStretchedImage from '../components/NonStretchedImage'

function PostsPage({data}) {
  return <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Stef's London Marathon Journey"
      />

      <section className="text-left m-auto pt-12 px-4 max-w-md">
        {data.allMarkdownRemark.edges.map((p) => {
          const post = p.node
          return (
            <div className="mb-8" key={post.fields.slug}>
              <div className="px-4">
                <p className="text-xs tracking-widest text-gray-500 mb-2">
                  {(new Date(post.frontmatter.date)).toLocaleString().replace().split(',')[0]}
                </p>
                <h1 className="text-2xl mb-4"><Link 
                  className="flex items-center no-underline text-blue-500" 
                  to={post.fields.slug}>{post.frontmatter.title}</Link>
                </h1>
              </div>
              {post.frontmatter.image &&
                <div className="bg-gray-300 w-full">
                  <NonStretchedImage fluid={post.frontmatter.image.childImageSharp.fluid} />
                </div>
              }
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
            image {
              childImageSharp {
                fluid(maxWidth: 768) {
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
    }
  }
`

export default PostsPage;
