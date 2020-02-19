
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
    title: `Stef running the 2020 London Marathon `,
    description: `I'm running to raise funds for The National Autistic Society`,
    author: `@stef`
  },
  plugins: [
    {
      resolve: `gatsby-source-strava`,
      options: strava_options,
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `src/images/tailwind-icon.png`
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
  ]
};
