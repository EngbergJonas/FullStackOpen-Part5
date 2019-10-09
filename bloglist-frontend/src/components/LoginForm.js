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
  if (user == null) {
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
  } else {
    return (
      <div>
        <p className='logged'>
          Welcome, {user.name}. <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    )
  }
}
export default LoginForm
