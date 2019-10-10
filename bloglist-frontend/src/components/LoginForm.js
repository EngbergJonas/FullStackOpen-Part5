import React from 'react'

const LoginForm = ({
  user,
  handleLogin,
  handleLogout,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username
        <input
          type='test'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          name='Username'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}
export default LoginForm
