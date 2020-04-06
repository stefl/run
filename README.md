# A running blog powered by Strava

Wouldn't it be great if you could share your running progress with friends and family, without them having to have a Strava account to follow along? 

This is a Gatsby site that uses Strava activities as the basis for a blog.

Each activity is pulled in, with image, metadata and description.

You get a listing of all of your runs in reverse chronological order, and URLs to each individual run, so you can share them on social media.

Features in the works:

* Embed the run metadata into the image
* Display fundraising information on each post
* CTA for folks to donate after seeing your progress
* Other ways of visualising progress over time - graphs?!

You can see it in action on my site: [run.stef.io](https://run.stef.io)

To use this, you'll need to also deploy the Strava authentication middleware server that I've made, which is in a separate repo. This handles refreshing your access token so that you can deploy without re-authenticating each time.


# Large image files
These are stored using Git LFS https://git-lfs.github.com/

`brew install git-lfs`