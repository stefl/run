import PropTypes from "prop-types";
import React from "react";
import Link from "gatsby-link"
import Header from "./header";

function Layout(props) {
  console.log('Layout props', props)
  const { children } = props
  const page = children[0]
  const {url} = page.props
  const isStoryPage = url && (url.split("/")[3] === 'story')
  return (
    <div className="font-sans min-h-screen text-gray-900 w-full">

      <main className="md:justify-center mx-auto py-8 md:p-8 w-full">
        
        <Header />
        {!isStoryPage && <section className="p-4 bg-gray-200 mt-8 w-full">
          <p><strong>Hi! I'm Stef 👋</strong> Last September, I started running, aged 41, having not run since school. Things escalated!
          I'm now training for the London Marathon in October 🙀 <Link className="text-blue-500 font-bold" to="/story">Read the full story</Link></p>
        </section>}
        {children}
      </main>

    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
