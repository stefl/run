import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Workout from '../components/Workout'
import Link from 'gatsby-link'

function WorkoutDonateCTA() {
  return <div className="bg-gray-200 p-8">
    <h1 className="text-2xl pb-4">Donate to my charity</h1>
    <p className="pb-8">I'm running the London Marathon on 26th April – it would be awesome if you would sponsor me to raise funds for the National Autistic Society.</p>
    <Link to="/donate" className="px-4 py-3 bg-green-500 text-white rounded-lg font-black">Donate</Link>
  </div>
}

function PostPage({data}) {
  const {stravaWorkout} = data
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `running`, `fundraising`]}
        title={stravaWorkout.name}
        image={stravaWorkout.image ? stravaWorkout.image.childImageSharp.fluid : null}
      />

      <section className="text-left" style={{maxWidth: '48rem'}}>
        <Workout workout={stravaWorkout} detailed={true} />

        <WorkoutDonateCTA />
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
