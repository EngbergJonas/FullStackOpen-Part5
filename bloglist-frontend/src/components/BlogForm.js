import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newUrl,
  handleUrlChange
}) => {
  return (
    <form onSubmit={addBlog}>
      <p>
        <input value={newTitle} onChange={handleTitleChange} />
      </p>
      <p>
        <input value={newUrl} onChange={handleUrlChange} />
      </p>
      <button type='submit'>Post</button>
    </form>
  )
}

export default BlogForm
