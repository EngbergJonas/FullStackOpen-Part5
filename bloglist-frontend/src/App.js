import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
    } catch (exception) {
      setErrorMessage('Already logged out.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } finally {
      window.location.reload()
    }
  }

  const blogsToShow = blogs.filter(blog => blog)

  const rows = () => blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <div className='App'>
      <div>
        <h1 className='title'>Blog List</h1>
      </div>
      <Notification message={errorMessage} />

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
          <h2>Blogs</h2>
          <ul>{rows()}</ul>
        </div>
      )}
    </div>
  )
}

export default App
