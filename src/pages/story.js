import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Link from "gatsby-link"

function StoryPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Story"
      />

      <section className="pt-8">
        <h2 className="pb-4">Hi, I'm Stef!</h2>

        <p className="pb-4">I'm a designer and technologist living in South London, UK. You can find me on <a href="https://twitter.com/stef" className="text-blue-500">Twitter</a> and <a href="https://instagram.com/stef" className="text-blue-500">Instagram</a> as @stef. This is my running blog that I've built so that folks who don't <a className="text-blue-500" href="https://www.strava.com/athletes/47920858">follow me on Strava</a> can also see my updates.</p>

        <p className="pb-4">I was an absolute beginner at running in September 2019, when my wife, Emily, suggested that I should try out Couch to 5k because I was, well, developing a bit of a paunch and was in need of introducing some exercise into my weekly routine.</p>

        <p className="pb-4">Since then I've gone from being unable to run for more than a minute without being puffed out, to taking on the London Marathon this April.</p>

        <p className="pb-4">It's quite a challenge, so I've been writing and sharing the experience along the way. First on <a className="text-blue-500" href="https://twitter.com/stef/status/1184012953550491648">this Twitter thread</a>, and now <a className="text-blue-500" href="https://www.strava.com/athletes/47920858">on Strava</a> and <a className="text-blue-500" href="https://instagram.com/stef">on Instagram</a>.</p>

        <p className="pb-4">Other than running for fitness, and mental health, there's another part to the story. Emily and I have four children together, and over the Summer of 2019, two were diagnosed with autism. They're awesome, intelligent, creative and inspiring kids, but they find a few things difficult which makes home life somewhat challenging at times! At the same time, I found that a lot of what we were reading about their experience of the world resonated, and I took had a diagnosis.</p>

        <p className="pb-4">You can <a className="text-blue-500" href="https://medium.com/@stef/why-im-running-the-london-marathon-for-team-autism-8fb19c8191de">read the full story in my blog post</a>, but suffice to say, I've encountered some discomfort talking about it, and it concerns me that something that is so common has a taboo around it. So I'm running to raise funds for the National Autistic Society who do great work countering that stigma, as well as supporting autistic folks who have much greater care needs than our family.</p>

        <p className="pb-4">If you'd like to support me in this challenge, <Link to="/donate"><a className="text-blue-500" >please donate</a></Link>. I'm really grateful for everyone who has backed me to do this so far. Here's to getting to the finish line uninjured and in a good time!</p>

        <p className="pb-16">Cheers, Stef</p>

        <p className="pb-16"><a className="text-blue-500" href="https://github.com/stefl/run">The code for this site is on Github</a>.</p>
      </section>
    </Layout>
  );
}

export default StoryPage;
