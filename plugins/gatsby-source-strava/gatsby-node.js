const asyncForEach = require('async-await-foreach') 
const axios = require('axios')
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const strava = require('strava-v3')
const storage = require('node-persist')

// To use this, you need to have a server running that provides
// a refreshed access token to Gatsby for each deployment

const getAccessTokenFromServer = config => {
  return axios
    .get(`${config.server_url}/new_token`, {
    })
    .catch(err => {
      throw err
    })
}

const processWorkout = (workout, createNodeId, createContentDigest) => {
  return Object.assign({}, workout, {
    id: createNodeId(`strava-${workout.id}`),
    parent: null,
    children: [],
    internal: {
      type: `StravaWorkout`,
      content: JSON.stringify(workout),
      contentDigest: createContentDigest(workout),
    },
  })
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  await storage.init( {

    dir: './cache',
 
    stringify: JSON.stringify,
 
    parse: JSON.parse,
 
    encoding: 'utf8',
 
    logging: false,  // can also be custom logging function
 
    ttl: 60 * 60 * 1000, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
 
    expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
 
    // in some cases, you (or some other service) might add non-valid storage files to your
    // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
    forgiveParseErrors: false

  } )

  const response = await getAccessTokenFromServer(configOptions)

  console.log('Refreshed Access Token', response.data)

  const access_token = response.data.access_token
  const config = {
    access_token
  }
  strava.config(config)

  let done = false
  let page = 1
  let activities = []
  while(!done) {
    let new_activities = await strava.athlete.listActivities({access_token, page})
    console.log(`Got activities page ${page}`)
    if(new_activities.length === 0) {
      console.log('Done!')
      done = true
    } else {
      activities = activities.concat(new_activities)
    }
    page = page + 1
  }

  console.log(`Found ${activities.length} activities`)

  for(activity of activities) {
    let wk 
    wk = await storage.getItem(`${activity.id}`)
    if(wk) {
      console.log(`Cache hit - ${activity.id}`)
    }
    if(!wk) {
      wk = await strava.activities.get({access_token, id: activity.id})
      let ttl = 60 * 60 * 1000
      let start_date = new Date(activity.start_date)
      if( start_date < (new Date() - 7)) {
        ttl = (7 + 7 * Math.random()) * 24 * 60 * 60 * 1000
      } 
      // Check old records once every week or fortnight at random 
      // to keep deploys quick
      await storage.setItem(`${activity.id}`, wk, {ttl})
    }

    const nodeData = processWorkout(
      wk,
      createNodeId,
      createContentDigest
    )
    await createNode(nodeData)
  }

  console.log('Completed adding activities')

  return
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type StravaWorkout implements Node {
      imagery: Imagery
    }
    type Imagery {
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "StravaWorkout" &&
    node.photos &&
    node.photos.primary &&
    (node.photos.primary.urls['600'] !== null)
  ) {
    console.log(`**** Image URL: ${JSON.stringify(node.photos.primary)}, ${node.photos.primary.urls['600']}`)
    let fileNode = await createRemoteFileNode({
      url: node.photos.primary.urls['600'], // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId: id => `image-sharp-${node.id}`, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      console.log('fileNode created')
      node.image___NODE = fileNode.id
    }
  }
}

