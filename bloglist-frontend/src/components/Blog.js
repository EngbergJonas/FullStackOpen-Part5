import React, { useState } from 'react'
const Blog = ({ blog }) => {
	const [ visible, setVisible ] = useState(false)

	const hideWhenVisible = {
		display: visible ? 'none' : '',
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const showWhenVisible = {
		display: visible ? '' : 'none',
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div onClick={toggleVisibility} style={hideWhenVisible}>
				<li className='blog-list'>
					{blog.title} by {blog.author}
				</li>
			</div>
			<div onClick={toggleVisibility} style={showWhenVisible}>
				<li className='blog-list'>
					<ul>{blog.title}</ul>
					<a href={blog.url}>{blog.url}</a>
					<ul>{blog.author}</ul>
					<ul>
						{blog.likes} likes
						<button onClick={() => console.log('click!')}>Like</button>
					</ul>
				</li>
			</div>
		</div>
	)
}
export default Blog
