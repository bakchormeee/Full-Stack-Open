const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br/>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm