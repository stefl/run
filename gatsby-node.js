//const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)

exports.createPages = async function({ graphql, actions }) {
  console.log('*** CREATE PAGES ***')
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: '/donate', toPath: 'https://uk.virginmoneygiving.com/fundraiser-display/showROFundraiserPage?userUrl=StefL&pageUrl=2', isPermanent: true });
  
  const postLayout = path.resolve(`./src/layouts/post.js`)

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

  const posts = data.allStravaWorkout.nodes
    
  // Creating strava post pages
  posts.forEach((post, index, arr) => {
    //console.log('Post', {post})
    const prev = arr[index - 1]
    const next = arr[index + 1]

    createPage({
      path: post.fields.slug,
      component: postLayout,
      context: {
        slug: post.fields.slug,
        prev: prev,
        next: next,
      },
    })
  })
}

exports.onCreatePage = async function ({ page }) {
  //console.log('Created Page!', page)
}

exports.onCreateNode = async function ({ node, actions, getNode }) {
  const { createNodeField, createPage } = actions
  const postLayout = path.resolve(`./src/layouts/post.js`)
  if (node.internal.type === `StravaWorkout`) {
    //console.log('Created Workout!', {node})
    //const value = createFilePath({ node, getNode })
    const [month, day, year] = new Date(node.start_date)
      .toLocaleDateString("en-EN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
    //const slug = value.replace("/posts/", "").replace(/\/$/, "")
    const url = `/posts/${year}/${month}/${day}-${node.id}`

    await createNodeField({
      name: `slug`,
      node,
      value: url,
    })

    // console.log('Create page', url)
    // await createPage({
    //   path: url,
    //   component: postLayout,
    //   context: {
    //     slug: url
    //   },
    // })
  }
}