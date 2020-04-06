//const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)
const { slash } = require(`gatsby-core-utils`)
const { GraphQLFloat } = require("gatsby/graphql")

async function createWorkoutPages(createPage, graphql) {
  const workoutLayout = path.resolve(`./src/layouts/workout.js`)

  const { data } = await graphql(`
    {
      allStravaWorkout(sort: {order: DESC, fields: start_date}) {
        nodes {
          id
          start_date_local
          elapsed_time
          fields {
            slug
          }
        }
      }
    }
  `)

  const workouts = data.allStravaWorkout.nodes
    
  // Creating strava workout pages
  workouts.forEach((workout, index, arr) => {
    const prev = arr[index - 1]
    const next = arr[index + 1]

    createPage({
      path: workout.fields.slug,
      component: workoutLayout,
      context: {
        slug: workout.fields.slug,
        startTime: workout.fields.startTime,
        endTime: workout.fields.endTime,
        prev: prev,
        next: next,
      },
    })
  })
  return
}

async function createPostPages(createPage, graphql) {
  const workoutLayout = path.resolve(`./src/layouts/post.js`)

  const { data } = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              workouts
              workoutsFrom
              workoutsTo
            }
          }
        }
      }
    }
  `)

  console.log({data})

  data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: edge.node.fields.slug, // required
      component: slash(workoutLayout),
      context: {
        slug: edge.node.fields.slug,
        startTime: edge.node.fields.startTime,
        endTime: edge.node.fields.endTime,
        workouts: edge.node.frontmatter.workouts,
        workoutsFrom: edge.node.frontmatter.workoutsFrom,
        workoutsTo: edge.node.frontmatter.workoutsTo,
      },
    })
  })

  return
}

exports.createPages = async function({ graphql, actions }) {
  console.log('*** CREATE PAGES ***')

  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: '/donate', toPath: 'https://uk.virginmoneygiving.com/fundraiser-display/showROFundraiserPage?userUrl=StefL&pageUrl=2', isPermanent: true });
  
  await createPostPages(createPage, graphql)

  await createWorkoutPages(createPage, graphql)

  return
  
}

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type ImageSharp implements Node {
//       dateTakenTimestamp: GraphQLFloat
//     }
//   `
//   createTypes(typeDefs)
// }

// Store the date taken from exif on the ImageSharp node
exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `ImageSharp`) {
    return {
      dateTakenTimestamp: {
        type: GraphQLFloat,
        resolve: source => {
          //console.log('Resolve dateTakenTimestamp')
          try {
            if(source.fields && source.fields.exif && source.fields.exif.meta && source.fields.exif.meta.dateTaken) {
              const gotTime = new Date(source.fields.exif.meta.dateTaken).getTime();
              //console.log('Got a time', gotTime)
              return gotTime
            } else {
              //console.log('Fall back to zero float')
              return 0.0
            }
          } catch(e) {
            //console.log(`Error with resolving dateTakenTimestamp`, e)
            return 0.0
          }
        }
     }
   };
  }

  // by default return empty object
  return {};
};

exports.onCreateNode = async function ({ node, actions, getNode }) {
  const { createNodeField, createPage } = actions
  if (node.internal.type === `StravaWorkout`) {
    const [month, day, year] = new Date(node.start_date)
      .toLocaleDateString("en-EN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
    const url = `/workouts/${year}/${month}/${day}-${node.id}`

    const timestamp = new Date(node.start_date_local).getTime()
    const startTime = timestamp - 3600000 // 1 hour before
    const endTime = timestamp + (node.elapsed_time * 1000)  + 3600000 // 1 hour after

    await createNodeField({
      name: `slug`,
      node,
      value: url,
    })

    await createNodeField({
      name: `startTime`,
      node,
      value: startTime,
    })

    await createNodeField({
      name: `endTime`,
      node,
      value: endTime,
    })
  }

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`
    createNodeField({ node, name: `slug`, value: slug })
  }

  if( node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.fields.slug,
    })

    // if (node.frontmatter.tags) {
    //   const tagSlugs = node.frontmatter.tags.map(
    //     tag => `/tags/${_.kebabCase(tag)}/`
    //   )
    //   createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    // }
  }
}