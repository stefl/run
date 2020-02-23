
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let strava_options = {
  id: process.env.STRAVA_CLIENT_ID,
  secret: process.env.STRAVA_CLIENT_SECRET,
  refresh_token: process.env.STRAVA_REFRESH_TOKEN,
  redirect_uri: process.env.STRAVA_REDIRECT_URI,
  server_url: process.env.SERVER_URL
}

// Trigger reauthentication and get new tokens
if(process.env.STRAVA_AUTH_CODE) {
  strava_options['code'] = process.env.STRAVA_AUTH_CODE
}

console.log(strava_options)

module.exports = {
  siteMetadata: {
    title: `Stef's London Marathon Journey`,
    description: `I'm running to raise funds for The National Autistic Society`,
    author: `@stef`
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-tinacms',
    //   options: {
    //     plugins: [
    //       "gatsby-tinacms-git",
    //       "gatsby-tinacms-remark",
    //     ],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      resolve: `gatsby-source-strava`,
      options: strava_options,
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Stef runs the marathon`,
        short_name: `run.stef`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `src/images/man-running-light-skin-tone.png`,
        defaultImage: `src/images/social-sharing.jpg`
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/style.css`]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'StravaWorkout',
        imagePath: 'nodes[].photos.primary.urls[].600',
        // OPTIONAL: Name you want to give new image field on the node.
        // Defaults to 'localImage'.
        name: 'itemImage',
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-client-side-redirect`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-666119-11",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        //anonymize: true,
        // Setting this parameter is also optional
       
        //respectDNT: true,
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        //cookieDomain: "stef.io",
      },
    }
  ]
};
