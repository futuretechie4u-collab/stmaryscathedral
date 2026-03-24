import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/signin.css"

const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password')
      setLoading(false)
      return
    }

    // Hardcoded credentials (replace with API call later)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username)
      navigate('/')
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
<section class="add-card page">
  <form class="form" onSubmit={handleSignIn}>
    {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
    <label for="name" class="label">
      <span class="title">USER NAME</span>
      <input
        class="input-field"
        type="text"
        name="input-name"
        title="Input title"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <label for="serialCardNumber" class="label">
      <span class="title">PASSWORD</span>
      <input
        id="serialCardNumber"
        class="input-field"
        type="password"
        name="input-name"
        title="Input title"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
 
    <input class="checkout-btn" type="submit" value={loading ? "SIGNING IN..." : "SIGN IN"} disabled={loading} />
  </form>
</section>
  )
}

export default SignIn
