import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";

const navMenuClasses = "block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-green-500"
const navButtonClasses = "block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-white bg-green-500 px-3 py-2 rounded"
function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header>
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Link className="flex items-center no-underline text-blue-500" to="/">          
          <span className="font-bold text-xl tracking-tight">
            {site.siteMetadata.title}
          </span>
        </Link>

        <button
          className="block md:hidden border border-white flex items-center px-3 py-2 rounded text-green-500"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: `/`,
              title: `Progress`
            },
            {
              route: `/story`,
              title: `Story`
            },
            {
              route: `/donate`,
              title: `Donate`,
              button: true
            }
          ].map(link => (
            <Link
              className={link.button ? navButtonClasses : navMenuClasses}
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
