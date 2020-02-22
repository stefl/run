import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from 'gatsby'
import Workout from '../components/Workout'
import Link from "gatsby-link"

function IndexPage({data}) {
  console.log(data)
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Home"
      />

      <section className="p-4 bg-gray-200 mt-8">
        <p><strong>Hi! I'm Stef 👋</strong> Last September, I started running, aged 41, having not run since school. Things escalated!
        I'm now training for the London Marathon in April 🙀 <Link className="text-blue-500 font-bold" to="/story">Read the full story</Link></p>
      </section>

      <section className="text-left">
        {data.allStravaWorkout.nodes.map((stravaWorkout) => 
          <Workout key={stravaWorkout.id} workout={stravaWorkout} detailed={false} />
        )}
      </section>
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    allStravaWorkout(sort: {order: DESC, fields: start_date}) {
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

export default IndexPage;
