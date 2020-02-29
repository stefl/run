import React from 'react'

import { Watch, TrendingUp, Zap, Activity } from 'react-feather';

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function secondsToHoursMinutesSeconds(seconds) {
  let t = new Date(null)
  t.setSeconds(seconds)
  return t.toISOString().substr(11, 8).replace(/00:/,'')
}

function WorkoutStats({workout} ) {
  const speed = Math.round(1 / (workout.average_speed * 60) * 100000) / 100

  return <h2 className="text-l mb-4">
    <span className="mr-5 inline-block">
      <span className="inline-block mr-2"><TrendingUp size={16} /></span> 
      <span className="inline-block">{Math.round(workout.distance / 10) / 100} km</span>
    </span>
    <span className="mr-5 inline-block">
      <span className="inline-block mr-2"><Watch size={16} /></span> 
      <span className="inline-block">{secondsToHoursMinutesSeconds(workout.moving_time)}</span>
    </span>
    <span className="inline-block">
      <span className="inline-block mr-2"><Zap size={16} /></span> 
      <span className="inline-block">{ Math.floor(speed)}:{pad(Math.round((speed*100) % 60), 2)} min/km</span>
    </span>
  </h2>
}

function WorkoutAggregateStats({workouts}) {
  console.log(workouts)
  const totalTime = workouts.map((w) => w.moving_time).reduce((a,b) => a + b, 0)
  const totalDistance = workouts.map((w) => w.distance).reduce((a,b) => a + b, 0)
  const averageSpeed = workouts.filter((w) => w.speed ).map((w) => w.speed).reduce((a,b) => a + b, 0) / workouts.length
  
  const speed = Math.round(1 / (averageSpeed * 60) * 100000) / 100

  return <h2 className="text-l mb-4">
    <span className="mr-5 inline-block">
      <span className="inline-block mr-2"><Activity size={16} /></span> 
      <span className="inline-block">{workouts.length} activities</span>
    </span>
    <span className="mr-5 inline-block">
      <span className="inline-block mr-2"><TrendingUp size={16} /></span> 
      <span className="inline-block">{Math.round(totalDistance / 10) / 100} total km</span>
    </span>
    <span className="mr-5 inline-block">
      <span className="inline-block mr-2"><Watch size={16} /></span> 
      <span className="inline-block">{secondsToHoursMinutesSeconds(totalTime)}</span>
    </span>
  </h2>
}

export {WorkoutStats, WorkoutAggregateStats}