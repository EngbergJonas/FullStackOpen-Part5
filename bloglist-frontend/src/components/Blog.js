import React from 'react'
const Blog = ({ blog }) => (
  <li className='blog-list'>
    {blog.title} by {blog.author}
  </li>
)

export default Blog
