import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql, useStaticQuery } from 'gatsby'
import Workout from '../components/Workout'
import Link from 'gatsby-link'
import rehypeReact from "rehype-react"
import WorkoutDonateCTA from '../components/WorkoutDonateCTA'
import { Watch, TrendingUp, Zap } from 'react-feather';
import {WorkoutAggregateStats} from '../components/WorkoutStats'
import { Calendar } from 'react-feather';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    p: PostParagraph,
    h2: HeadingTwo,
    a: PostLink
  }
}).Compiler

function PostParagraph({children}) {
  return <p className="mb-4 font-sans text-base md:text-lg lg:text-lg xl:text-lg">{children}</p>
}

function HeadingTwo({children}) {
  return <h2 className="text-2xl w-full overflow-hidden leading-tight mb-2 mt-12">{children}</h2>
}

function PostLink({children, href}) {
  return <a href={href} className="text-blue-500">{children}</a>
}

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
      />

      <section className="text-left pt-12 pb-8" style={{maxWidth: '48rem'}}>
        <h1 className="text-3xl w-full overflow-hidden leading-tight mb-6">
          {post.frontmatter.title}
        </h1>

        {workouts &&
          <div className="mb-12">
            <h2 className="text-l w-full overflow-hidden leading-tight mb-2">
              <span className="inline-block mr-2"><Calendar size={16} /></span> 
              <span className="inline-block">
                <span>{post.frontmatter.workoutsFrom}</span> to <span>{post.frontmatter.workoutsTo}</span>
              </span>
            </h2>
            <WorkoutAggregateStats workouts={workouts} />
          </div>
        }

        {renderAst(post.htmlAst)}

        <div className="mt-12">
          <WorkoutDonateCTA />
        </div>

        {
          workouts &&
          <div className="mt-12">
            <h1 className="text-3xl w-full overflow-hidden leading-tight mb-2">
              All the updates I posted
            </h1>
            {workouts.map((stravaWorkout) => 
              <Workout key={stravaWorkout.id} workout={stravaWorkout} detailed={false} />
            )}
          </div>
        }
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
