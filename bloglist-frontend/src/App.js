import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } catch (exception) {
      setMessage('Already logged out.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } finally {
      setUser(null)
    }
  }

  const blogsToShow = blogs.filter(blog => blog)

  const rows = () => blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: user.name,
      url: newUrl,
      likes: 0,
      userId: user.id
    }

    blogService.create(blogObject).then(data => {
      setBlogs(blogs.concat(data))
    })
    setMessage(`A new Blog, ${newTitle}, was created!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div className='App'>
      <div>
        <h1 className='title'>Blog List</h1>
      </div>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div className='blog-container'>
          <div>
            <p className='logged'>
              Welcome, {user.name}.{' '}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>
          <h2>Blogs</h2>
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            handleTitleChange={handleTitleChange}
            newUrl={newUrl}
            handleUrlChange={handleUrlChange}
          />
          <ul>{rows()}</ul>
        </div>
      )}
    </div>
  )
}

export default App
