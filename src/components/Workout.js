import React from "react";
import NonStretchedImage from './NonStretchedImage'
import SimpleFormat from './simpleFormat'
import Img from "gatsby-image"
import Link from "gatsby-link"
import WorkoutMap from './WorkoutMap'

function secondsToHoursMinutesSeconds(seconds) {
  let t = new Date(null)
  t.setSeconds(seconds)
  return t.toISOString().substr(11, 8)
}

function WorkoutStats({workout} ) {
  const speed = Math.round(1 / (workout.average_speed * 60) * 100000) / 100

  return <h2 className="text-xl mb-4">
    <span className="mr-5">
      {Math.round(workout.distance / 10) / 100} km
    </span>
    <span className="mr-5">
      {secondsToHoursMinutesSeconds(workout.moving_time)}
    </span>
    <span className="">
      { Math.floor(speed)}:{Math.round((speed*100) % 60)} min/km
    </span>
  </h2>
}

function WorkoutTitle({title, slug, detailed}) {
  return <h1 className="text-3xl">
    {detailed ? <span>{title}</span> : <Link to={slug}>{title}</Link>}
  </h1>
}

function WorkoutDescription({description}) {
  return <div>
    <SimpleFormat text={description } />
  </div>
}

function WorkoutImage({image}) {
  return <div className="mb-4 bg-gray-300 w-full">
    <NonStretchedImage fluid={image.childImageSharp.fluid} />
  </div>
}

// distance - metres
// moving_time - seconds
// elev - metres
// average_speed - meters per second
// 

function Workout({workout, detailed}) {

  const hasDescription = (workout.description && workout.description !== 'null')

  return <div 
    key={workout.id} 
    className={hasDescription ? 'text-blue-800' : 'text-gray-500'} 
    style={{paddingTop: '2em', maxWidth: '768px'}}>

    <WorkoutTitle title={workout.name} detailed={detailed} slug={workout.fields.slug} />
    
    <WorkoutStats workout={workout} />

    {workout.image && <WorkoutImage image={workout.image} />}

    {hasDescription && <WorkoutDescription description={workout.description} />}

    {detailed && (typeof(window) !== 'undefined') &&
      <div>
        <WorkoutMap polyline={workout.map.summary_polyline} />
      </div>
    }
  </div>
}

export default Workout