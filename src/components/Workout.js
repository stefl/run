import React, {Fragment} from "react";
import NonStretchedImage from './NonStretchedImage'
import SimpleFormat from './simpleFormat'
import Img from "gatsby-image"
import Link from "gatsby-link"
import WorkoutMap from './WorkoutMap'
import {WorkoutStats} from './WorkoutStats'
import { useStaticQuery, graphql } from "gatsby"

function WorkoutTitle({title, slug, detailed}) {
  const t = title.replace(/&nbsp;/g, ' ')
  return <h1 className="text-2xl md:text-3xl lg:text-4xl  w-full overflow-hidden leading-tight mb-2">
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
  const fluid = image.childImageSharp ? image.childImageSharp.fluid : image.fluid
  return <div className="mb-8 bg-gray-300 w-full">
    <NonStretchedImage fluid={fluid} />
  </div>
}

// distance - metres
// moving_time - seconds
// elev - metres
// average_speed - meters per second
// 

function Workout({workout, detailed, images}) {

  const hasDescription = (workout.description && workout.description !== 'null')

  return <div 
    key={workout.id} 
    className={['m-auto', (hasDescription ? 'text-blue-800' : 'text-gray-500')].join(' ')} 
    style={{paddingTop: '2em', maxWidth: '768px'}}>

    <WorkoutMeta date={workout.start_date_local} />

    <WorkoutTitle title={workout.name} detailed={detailed} slug={workout.fields.slug} />
    
    <WorkoutStats workout={workout} />

    {(workout.image || (images && (images.length > 0))) &&
      <Fragment>
        { (images && (images.length > 0)) ? 
          <WorkoutImage image={images[0]} date={workout.start_date_local} />
        :
          <WorkoutImage image={workout.image} date={workout.start_date_local} />
        }
      </Fragment>
    }

    {hasDescription && <WorkoutDescription description={workout.description} />}

    {detailed && (typeof(window) !== 'undefined') &&
      <div>
        <WorkoutMap polyline={workout.map.summary_polyline} />
      </div>
    }
  </div>
}

export default Workout
