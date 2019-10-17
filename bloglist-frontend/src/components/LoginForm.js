import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username
        <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        Password
        <input type='password' value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
