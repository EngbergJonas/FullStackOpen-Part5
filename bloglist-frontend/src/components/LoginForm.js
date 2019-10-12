import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username
        <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}
export default LoginForm
