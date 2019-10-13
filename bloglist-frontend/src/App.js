import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [ blogs, setBlogs ] = useState([])
	const [ newTitle, setNewTitle ] = useState('')
	const [ newUrl, setNewUrl ] = useState('')
	const [ newAuthor, setNewAuthor ] = useState('')
	const [ message, setMessage ] = useState(null)
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFromRef = React.createRef()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password
			})

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

			blogService.setToken(user.token)

			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage('Wrong credentials')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLogout = async event => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedBlogAppUser')
			setUser(null)
		} catch (exception) {
			setMessage('Already logged out.')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleTitleChange = event => {
		setNewTitle(event.target.value)
	}

	const handleUrlChange = event => {
		setNewUrl(event.target.value)
	}

	const handleAuthorChange = event => {
		setNewAuthor(event.target.value)
	}

	const addBlog = async event => {
		event.preventDefault()
		blogFromRef.current.toggleVisibility()

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			likes: 0
		}

		try {
			const addedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(addedBlog))

			//This is necessary to update the publisher of the blog
			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs)

			setMessage(`${user.name} added ${addedBlog.author}.`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
			setNewTitle('')
			setNewUrl('')
			setNewAuthor('')
		} catch (error) {
			setMessage(error.response.data.error)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const likeBlog = id => {
		const blog = blogs.find(b => b.id === id)
		const changedBlog = { ...blog, likes: blog.likes + 1 }

		blogService
			.update(id, changedBlog)
			.then(returnedBlog => {
				setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
			})
			.catch(error => {
				setMessage(`${error.res.data.error}`)
				setTimeout(() => {
					setMessage(null)
				}, 5000)
				setBlogs(blogs.filter(b => b.id !== id))
			})
	}

	const deleteBlog = id => {
		const blog = blogs.find(b => b.id === id)

		if (window.confirm(`Are you sure you want to delete, ${blog.title}?`)) {
			blogService
				.remove(blog.id)
				.then(() => {
					blogService.getAll().then(blogs => {
						setBlogs(blogs)
					})
				})
				.catch(error => {
					setMessage(`${error.res.data.error}`)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
					setBlogs(blogs.filter(b => b.id !== id))
				})
		}
	}

	const loginForm = () => (
		<Togglable buttonLabel='Login'>
			<LoginForm
				user={user}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
			/>
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel='New Blog' ref={blogFromRef}>
			<BlogForm
				addBlog={addBlog}
				newTitle={newTitle}
				handleTitleChange={handleTitleChange}
				newUrl={newUrl}
				handleUrlChange={handleUrlChange}
				handleAuthorChange={handleAuthorChange}
				newAuthor={newAuthor}
			/>
		</Togglable>
	)

	const rows = () =>
		blogs
			.sort((a, b) => b.likes - a.likes)
			.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					user={user !== null ? user : 'null'}
					deleteBlog={() => deleteBlog(blog.id)}
					likeBlog={() => likeBlog(blog.id)}
				/>
			))

	return (
		<div className='content'>
			<h1 className='title'>Blog List</h1>
			<Notification message={message} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p className='logged'>
						Welcome, {user.name}.<button onClick={handleLogout}>Logout</button>
					</p>
					{blogForm()}
				</div>
			)}

			<h2>Blogs</h2>
			<ul>{rows()}</ul>
		</div>
	)
}

export default App
