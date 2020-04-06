import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'gatsby-link'
import { Watch, TrendingUp, Zap } from 'react-feather';
import Post from '../components/Post'
import ContentRenderer from '../components/ContentRenderer'

function PostPage({data}) {
  const {markdownRemark, allStravaWorkout} = data
  const post = markdownRemark
  const workouts = allStravaWorkout.nodes
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `running`, `fundraising`]}
        title={post.frontmatter.title}
        url={`https://run.stef.io/${post.fields.slug}/`}
        image={post.frontmatter.image ? post.frontmatter.image.childImageSharp.fluid : null}
      />

      <section className="text-left pt-12 pb-8 m-auto" style={{maxWidth: '48rem'}}>
        <Post post={post} workouts={workouts} />
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!, $workoutsFrom: Date!, $workoutsTo: Date!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
      }
      frontmatter {
        title
        date
        workouts
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
    }

    allStravaWorkout(filter: {start_date: {gt: $workoutsFrom, lte: $workoutsTo}}, sort: {order: DESC, fields: start_date}) {
      nodes {
        image {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
        
        name
        description
        average_speed
        moving_time
        perceived_exertion
        distance
        splits_metric {
          average_speed
          split
        }
        start_date_local
        map {
          id
          summary_polyline
        }
        kudos_count
        best_efforts {
          achievements {
            rank
            type
          }
          distance
          elapsed_time
          pr_rank
        }
        calories
        achievement_count
        average_heartrate
        average_cadence
        elev_high
        elev_low
        id
        fields {
          slug
        }
      }
    }
  }
`

export default PostPage;
