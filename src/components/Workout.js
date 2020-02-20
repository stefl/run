import React from "react";
import NonStretchedImage from './NonStretchedImage'
import SimpleFormat from './simpleFormat'
import Img from "gatsby-image"

// distance - metres
// moving_time - seconds
// elev - metres
// average_speed - meters per second
// 

function Workout({workout}) {
  return <div key={workout.id} style={{paddingTop: '2em', maxWidth: '768px'}}>
    <h1 className="text-3xl">{workout.name}</h1>
    <h2 className="text-xl mb-4">
      <span className="mr-4">
        {Math.round(workout.distance / 10) / 100}km
      </span>
      <span className="mr-4">
        {Math.round(workout.moving_time * 10 / 60) / 10} minutes
      </span>
      <span className="mr-4">
        {Math.round(1 / (workout.average_speed * 60) * 100000) / 100 } minutes/km
      </span>
    </h2>
    {workout.image && <div className="mb-4 bg-black w-full"><NonStretchedImage fluid={workout.image.childImageSharp.fluid} /></div>}

    <SimpleFormat text={ workout.description } />
  </div>
}

export default Workout