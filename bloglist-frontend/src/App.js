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
	const [ message, setMessage ] = useState(null)
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs))
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

	const handleLogin = async (event) => {
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

	const handleLogout = async (event) => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedBlogAppUser')
		} catch (exception) {
			setMessage('Already logged out.')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} finally {
			setUser(null)
		}
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	const addBlog = (event) => {
		event.preventDefault()
		blogFromRef.current.toggleVisibility()

		const blogObject = {
			title: newTitle,
			author: user.name,
			url: newUrl,
			likes: 0,
			userId: user.id
		}

		blogService.create(blogObject).then((data) => {
			setBlogs(blogs.concat(data))
			setNewTitle('')
			setNewUrl('')
		})

		setMessage(`A new Blog, ${newTitle}, was created!`)
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const blogsToShow = blogs.filter((blog) => blog)

	const rows = () => blogsToShow.map((blog) => <Blog key={blog.id} blog={blog} />)

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
			/>
		</Togglable>
	)

	return (
		<div>
			<h1 className='title'>Blog List</h1>
			<Notification message={message} />
			{user === null ? (
				loginForm()
			) : (
				<div className='blog-container'>
					<p className='logged'>
						Welcome, {user.name}.<button onClick={handleLogout}>Logout</button>
					</p>
					{blogForm()}
				</div>
			)}
			<div className='blog-container'>
				<h2>Blogs</h2>
				<ul>{rows()}</ul>
			</div>
		</div>
	)
}

export default App
