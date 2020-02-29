import React from 'react'
import rehypeReact from "rehype-react"

function PostParagraph({children}) {
  return <p className="mb-4 font-sans text-base md:text-lg lg:text-lg xl:text-lg">{children}</p>
}

function HeadingTwo({children}) {
  return <h2 className="text-2xl w-full overflow-hidden leading-tight mb-2 mt-12">{children}</h2>
}

function PostLink({children, href}) {
  return <a href={href} className="text-blue-500">{children}</a>
}

const RenderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    p: PostParagraph,
    h2: HeadingTwo,
    a: PostLink
  }
}).Compiler

export default RenderAst