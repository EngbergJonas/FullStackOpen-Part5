import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, newTitle, handleTitleChange, newUrl, newAuthor, handleUrlChange, handleAuthorChange }) => {
  return (
    <form onSubmit={addBlog}>
      <p>
        Title: <input value={newTitle} onChange={handleTitleChange} />
      </p>
      <p>
        Author: <input value={newAuthor} onChange={handleAuthorChange} />
      </p>
      <p>
        Url: <input value={newUrl} onChange={handleUrlChange} />
      </p>
      <button type='submit'>Post</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}

export default BlogForm
