import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
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

	const toggleDeleteButton = {
		display: user.username === blog.user.username ? '' : 'none'
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<li className='blog-list'>
					<ul className='clickable' onClick={toggleVisibility}>
						{blog.title} by {blog.author}
					</ul>
				</li>
			</div>
			<div style={showWhenVisible}>
				<li className='blog-list'>
					<ul className='clickable' onClick={toggleVisibility}>
						{blog.title}
					</ul>
					<a href={blog.url}>{blog.url}</a>
					<ul>
						{blog.likes} likes
						<button onClick={likeBlog}>Like</button>
					</ul>
					<ul>{blog.author}</ul>
					<ul>Posted by, {blog.user.name}.</ul>
					<div style={toggleDeleteButton}>
						<button onClick={deleteBlog}>Delete</button>
					</div>
				</li>
			</div>
		</div>
	)
}
export default Blog
