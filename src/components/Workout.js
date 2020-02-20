import React from "react";
import NonStretchedImage from './NonStretchedImage'
import SimpleFormat from './simpleFormat'
import Img from "gatsby-image"
import Link from "gatsby-link"

// distance - metres
// moving_time - seconds
// elev - metres
// average_speed - meters per second
// 

function Workout({workout, detailed=false}) {
  return <div key={workout.id} style={{paddingTop: '2em', maxWidth: '768px'}}>
    <h1 className="text-3xl">
      {detailed ? <span>{workout.name}</span> : <Link to={workout.fields.slug}>{workout.name}</Link>}</h1>
    <h2 className="text-xl mb-4">
      <span className="mr-5">
        {Math.round(workout.distance / 10) / 100} km
      </span>
      <span className="mr-5">
        {Math.round(workout.moving_time * 10 / 60) / 10} min
      </span>
      <span className="">
        {Math.round(1 / (workout.average_speed * 60) * 100000) / 100 } min/km
      </span>
    </h2>
    {workout.image && <div className="mb-4 bg-gray-300 w-full"><NonStretchedImage fluid={workout.image.childImageSharp.fluid} /></div>}

    <SimpleFormat text={ workout.description } />
  </div>
}

export default Workout