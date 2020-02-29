import React from 'react'
import Link from 'gatsby-link'

function WorkoutDonateCTA() {
  return <div className="bg-gray-200 p-8">
    <h1 className="text-2xl pb-4">Donate to my charity</h1>
    <p className="pb-8">I'm running the London Marathon on 26th April – it would be awesome if you would sponsor me to raise funds for the National Autistic Society.</p>
    <Link to="/donate" className="px-4 py-3 bg-green-500 text-white rounded-lg font-black">Donate</Link>
  </div>
}

export default WorkoutDonateCTA