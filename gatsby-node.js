//const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)
const { slash } = require(`gatsby-core-utils`)

async function createWorkoutPages(createPage, graphql) {
  const workoutLayout = path.resolve(`./src/layouts/workout.js`)

  const { data } = await graphql(`
    {
      allStravaWorkout(sort: {order: DESC, fields: start_date}) {
        nodes {
          id
          start_date
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

    await createNodeField({
      name: `slug`,
      node,
      value: url,
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