import React from "react";
import NonStretchedImage from './NonStretchedImage'
import SimpleFormat from './simpleFormat'
import Img from "gatsby-image"
import Link from "gatsby-link"
import WorkoutMap from './WorkoutMap'
import {WorkoutStats} from './WorkoutStats'

function WorkoutTitle({title, slug, detailed}) {
  const t = title.replace(/&nbsp;/g, ' ')
  return <h1 className="text-3xl w-full overflow-hidden leading-tight mb-2">
    {detailed ? <span>{t}</span> : <Link to={slug}>{t}</Link>}
  </h1>
}

function WorkoutMeta({date}) {
  return <p className="text-xs tracking-widest text-gray-500 mb-2">
    {(new Date(date)).toLocaleString().replace()}
  </p>
}

function WorkoutDescription({description}) {
  return <div className="mb-8">
    <SimpleFormat text={description } />
  </div>
}

function WorkoutImage({image}) {
  return <div className="mb-8 bg-gray-300 w-full">
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

    <WorkoutMeta date={workout.start_date_local} />

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