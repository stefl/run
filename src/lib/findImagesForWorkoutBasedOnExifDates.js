function findImagesForWorkoutBasedOnExifDates(stravaWorkout, allImageSharp) {
  const {startTime, endTime} = stravaWorkout.fields  
  const images = allImageSharp.nodes.filter((i) => ((i.dateTakenTimestamp >= startTime) && (i.dateTakenTimestamp <= endTime)))
  return images
}

export default findImagesForWorkoutBasedOnExifDates