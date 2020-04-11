import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Workout from '../components/Workout'
import Link from 'gatsby-link'
import WorkoutDonateCTA from '../components/WorkoutDonateCTA'

function WorkoutPage({data}) {
  const {stravaWorkout, mainImages, otherImages} = data
  const mainImagesToDisplay = mainImages.edges.map((d) => d.node.localFile.childImageSharp)
  const otherImagesToDisplay = otherImages.edges.map((d) => d.node.localFile.childImageSharp)
  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `running`, `fundraising`]}
        title={stravaWorkout.name}
        image={stravaWorkout.image ? stravaWorkout.image.childImageSharp.fluid : null}
        url={`https://run.stef.io/${stravaWorkout.fields.slug}/`}
      />

      <section className="text-left m-auto" style={{maxWidth: '48rem'}}>
        <Workout 
          workout={stravaWorkout} 
          detailed={true} 
          images={mainImagesToDisplay} 
          otherImages={otherImagesToDisplay} />

        <WorkoutDonateCTA />
        <div className="pt-16 pb-16 text-blue-500">
          <Link to="/">View all runs</Link>
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query WorkoutPageQuery($slug: String!, $startTime: Float, $endTime: Float ) {

    mainImages: allDropboxNode(filter: {
      path: {regex: "/Main.+/"},
      localFile: {childImageSharp: {dateTakenTimestamp: {gte: $startTime, lte: $endTime}}}
    }, limit: 1000) {
      edges {
        node {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
              dateTakenTimestamp
            }
          }          
        }
      }
    }

    otherImages: allDropboxNode(filter: {
      path: {regex: "/Other.+/"},
      localFile: {childImageSharp: {dateTakenTimestamp: {gte: $startTime, lte: $endTime}}}
    }, limit: 1000) {
      edges {
        node {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
              dateTakenTimestamp
            }
          }          
        }
      }
    }

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
      elapsed_time
      elev_high
      elev_low
      id
      strava_id
      fields {
        slug
        startTime
        endTime
      }
    }
  }
`

export default WorkoutPage;
