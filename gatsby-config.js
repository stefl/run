
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
    author: `stef`,
    defaultImage: `/sharing/social-sharing.jpg`
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/photos`,
    //     name: `photos`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true,
        // blocks: ["h2"], Blocks option value can be provided here as an array.
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
        ]
      }
    },
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
        icon: `src/images/man-running-light-skin-tone.png`
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
    //`gatsby-plugin-offline`,
    {
      resolve:`gatsby-plugin-netlify`,
      options: {
        
      }
      // options: {
      //   headers: {
      //     "/public/**/*.html": [
      //       "cache-control: public",
      //       "cache-control:  max-age=0", 
      //       "cache-control: must-revalidate"
      //     ],
      //     "/sw.js": [
      //       "cache-control: public",
      //       "cache-control:  max-age=0", 
      //       "cache-control: must-revalidate"
      //     ],
      //     "/public/page-data/*": [
      //       "cache-control: public",
      //       "cache-control:  max-age=0", 
      //       "cache-control: must-revalidate"
      //     ]
      //   }
      // }
    },
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
    {
      resolve: `gatsby-source-dropbox`,
      options: {
        accessToken: process.env.DROPBOX_ACCESS_TOKEN,
        extensions: ['.jpg','.jpeg'],
        //path: '/Apps/Run\ Stef',
        recursive: true,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp-exif`,
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
