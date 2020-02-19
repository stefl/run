import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Img from "gatsby-image"
import SimpleFormat from '../components/simpleFormat'
import NonStretchedImage from '../components/NonStretchedImage'

function PostPage({data}) {
  const {stravaWorkout} = data
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Home"
      />

      <section className="text-left">
        <div key={stravaWorkout.id} style={{paddingTop: '2em'}}>
          <h1 className="text-2xl">{stravaWorkout.name}</h1>
          {stravaWorkout.image && <NonStretchedImage fluid={stravaWorkout.image.childImageSharp.fluid} />}

          <SimpleFormat text={ stravaWorkout.description } />
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
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_noBase64
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
