import React from 'react'
import renderAst from './ContentRenderer'
import { Calendar } from 'react-feather';
import {WorkoutAggregateStats} from './WorkoutStats'
import WorkoutDonateCTA from './WorkoutDonateCTA'
import Workout from './Workout'
import NonStretchedImage from './NonStretchedImage'
import findImagesForWorkoutBasedOnExifDates from '../lib/findImagesForWorkoutBasedOnExifDates'

function Post({post, workouts, images}) {
  return <div>
    <h1 className="text-3xl w-full overflow-hidden leading-tight mb-6 mx-4">
      {post.frontmatter.title}
    </h1>

    {workouts &&
      <div className="mb-12 mx-4">
        <h2 className="text-l w-full overflow-hidden leading-tight mb-2">
          <span className="inline-block mr-2"><Calendar size={16} /></span> 
          <span className="inline-block">
            <span>{post.frontmatter.workoutsFrom}</span> to <span>{post.frontmatter.workoutsTo}</span>
          </span>
        </h2>
        <WorkoutAggregateStats workouts={workouts} />
      </div>
    }

    {post.frontmatter.image &&
      <div className="mb-8 bg-gray-300 w-full">
        <NonStretchedImage fluid={post.frontmatter.image.childImageSharp.fluid} />
      </div>
    }

    <div className="mx-4">
      {renderAst(post.htmlAst)}
    </div>

    <div className="mt-12">
      <WorkoutDonateCTA />
    </div>

    {
      workouts &&
      <div>
        <div className="mt-12">
          <h1 className="text-3xl w-full overflow-hidden leading-tight mb-2 mx-4">
            All the updates I posted
          </h1>
          {workouts.map((stravaWorkout) => 
            <Workout 
              key={stravaWorkout.id} 
              workout={stravaWorkout} 
              detailed={false} 
              images={findImagesForWorkoutBasedOnExifDates(stravaWorkout, images)} 
            />
          )}
        </div>

        <div className="mt-12">
          <WorkoutDonateCTA />
        </div>
      </div>
    }
  </div>
}

export default Post