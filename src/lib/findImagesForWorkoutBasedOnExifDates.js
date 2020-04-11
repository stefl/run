function findImagesForWorkoutBasedOnExifDates(stravaWorkout, allImageSharp) {
  const {startTime, endTime} = stravaWorkout.fields  
  let nodes = (allImageSharp && allImageSharp.nodes) ? allImageSharp.nodes : allImageSharp
  const images = nodes.filter((i) => ((i.dateTakenTimestamp >= startTime) && (i.dateTakenTimestamp <= endTime)))
  return images
}

export default findImagesForWorkoutBasedOnExifDates