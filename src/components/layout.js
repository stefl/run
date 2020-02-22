import PropTypes from "prop-types";
import React from "react";

import Header from "./header";

function Layout({ children }) {
  return (
    <div className="font-sans min-h-screen text-gray-900">

      <main className="md:justify-center max-w-4xl mx-auto px-4 py-8 md:p-8 w-full" style={{maxWidth: '768px'}}>
        <Header />

        {children}
      </main>

    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
