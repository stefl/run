import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from 'gatsby'
import Workout from '../components/Workout'
import findImagesForWorkoutBasedOnExifDates from '../lib/findImagesForWorkoutBasedOnExifDates'
import {Link} from 'gatsby'
import { ArrowLeft, ArrowRight } from 'react-feather';

function PostListingPage({data, pageContext}) {
  const {
    numPages,
    currentPage,
    prev,
    next
  } = pageContext

  const {allDropboxNode, allStravaWorkout} = data
  const mainImages = allDropboxNode
    .edges.filter((a) => a && a.node && a.node.localFile)
    .map((d) => d.node.localFile.childImageSharp)

  return (
    <Layout>
      <SEO
        keywords={[`londonmarathon`, `autism`, `running`, `fundraising`]}
        title="Stef's London Marathon Journey"
      />

      <section className="text-left w-full m-auto" style={{maxWidth: '768px'}}>
        {allStravaWorkout.nodes.map((stravaWorkout) => {
          const images = findImagesForWorkoutBasedOnExifDates(stravaWorkout, mainImages)
          return <Workout 
            key={stravaWorkout.id} 
            workout={stravaWorkout} 
            detailed={false} 
            images={images} />
          }
        )}
      </section>

      <div className="flex mb-16 mt-16 text-center">
        <div className="w-1/3">
          {prev && <Link to={prev}><ArrowLeft className="inline-block" /></Link>}
        </div>
        <div className="w-1/3">
          {currentPage} of {numPages}
        </div>
        <div className="w-1/3">
          {next && <Link to={next}><ArrowRight className="inline-block" /></Link>}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PostListingPageQuery($skip: Int!, $limit: Int!) {

    allDropboxNode(filter: {path: {regex: "/Main.+/"}}, limit: 10000) {
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

    allStravaWorkout(
      limit: $limit
      skip: $skip
      sort: {order: DESC, fields: start_date} 
      filter: {distance: {gt: 1000}}
    ) {
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
        elapsed_time
        id
        strava_id
        fields {
          slug
          startTime
          endTime
        }
      }
    }
  }
`

export default PostListingPage;
