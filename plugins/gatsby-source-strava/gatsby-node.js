const asyncForEach = require('async-await-foreach') 
const axios = require('axios')
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const strava = require('strava-v3')
const storage = require('node-persist')

// curl -X POST https://www.strava.com/api/v3/oauth/token \
//   -d client_id=ReplaceWithClientID \
//   -d client_secret=ReplaceWithClientSecret \
//   -d code=ReplaceWithCode \
//   -d grant_type=authorization_code

const getAccessDetailsFromCode = config => {
  return axios
    .post(`https://www.strava.com/api/v3/oauth/token`, {
      grant_type: 'authorization_code',
      code: config.code,
      client_id: config.id,
      client_secret: config.secret,
    })
    .catch(err => {
      throw err
    })
}

const getAccessToken = config => {
  return axios
    .post(`https://www.strava.com/oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token: config.refresh_token,
      client_id: config.id,
      client_secret: config.secret,
    })
    .catch(err => {
      throw err
    })
}

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

  if(configOptions.code) {
    // Go to https://www.strava.com/oauth/authorize?scope=read,activity:read&client_id=42871&response_type=code&redirect_uri=http://run.stef.io&approval_prompt=force
    const codeResponse = await getAccessDetailsFromCode(configOptions)
    console.log('Copy and paste these values into your config:')
    console.log('---')
    console.log(codeResponse.data)
    console.log('---')
    throw('Do not continue')
  }

  const response = await getAccessTokenFromServer(configOptions)

  console.log('Refreshed Access Token', response.data)

  const access_token = response.data.access_token
  const config = {
    access_token
  }
  console.log({config})
  strava.config(config)

  const activities = await strava.athlete.listActivities({access_token})

  for(activity of activities) {
    let wk 
    wk = await storage.getItem(`${activity.id}`)
    if(!wk) {
      wk = await strava.activities.get({access_token, id: activity.id})
      await storage.setItem(`${activity.id}`, wk)
    }

    const nodeData = processWorkout(
      wk,
      createNodeId,
      createContentDigest
    )
    await createNode(nodeData)
  }

  console.log('Complete adding activities')

  return

  // return new Promise((resolve, reject) => {
  //   strava.athlete.activities.get( (err, res) => {
  //     //console.log(res)
  //     if (err) reject(err)

  //     res.forEach(workout => {
  //       strava.activities.get(workout.id, (aErr, aRes) => {

  //         //console.log(aRes)

  //         if (aErr) reject(aErr)

  //         const nodeData = processWorkout(
  //           aRes,
  //           createNodeId,
  //           createContentDigest
  //         )
  //         createNode(nodeData)
  //       })
  //     })
  //     resolve()
  //   })
  // })
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

