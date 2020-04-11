import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Workout from '../components/Workout'
import WorkoutDonateCTA from '../components/WorkoutDonateCTA'
import {Link} from 'gatsby'
import { ArrowLeft, ArrowRight, List} from 'react-feather';

function WorkoutPage({data, pageContext}) {
  const {stravaWorkout, mainImages, otherImages} = data
  const {
    numPages,
    currentPage,
    prev,
    next
  } = pageContext
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
      <div className="flex mb-16 mt-16 text-center">
        <div className="w-1/3">
          {prev && <Link to={prev.fields.slug}><ArrowLeft className="inline-block" /></Link>}
        </div>
        <div className="w-1/3">
          <Link to='/'><List className="inline-block" /></Link>
        </div>
        <div className="w-1/3">
          {next && <Link to={next.fields.slug}><ArrowRight className="inline-block" /></Link>}
        </div>
      </div>
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
