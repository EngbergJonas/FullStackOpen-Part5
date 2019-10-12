import React, { useState } from 'react'
const Blog = ({ blog }) => {
	//showAll when clicking will show blog.likes,url
	const [ showAll, setShowAll ] = useState(false)
	return (
		<li onClick={() => console.log('click!')} className='blog-list'>
			{blog.title} by {blog.author}
		</li>
	)
}
export default Blog
