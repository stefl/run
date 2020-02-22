import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Workout from '../components/Workout'
import Link from 'gatsby-link'

function PostPage({data}) {
  const {stravaWorkout} = data
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Home"
      />

      <section className="text-left" style={{maxWidth: '48rem'}}>
        <Workout workout={stravaWorkout} detailed={true} />

        <div className="pt-16 pb-16 text-blue-500">
          <Link to="/">View all runs</Link>
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query PostPageQuery($slug: String!) {
    stravaWorkout(fields: { slug: {eq: $slug} }) {
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
`

export default PostPage;
