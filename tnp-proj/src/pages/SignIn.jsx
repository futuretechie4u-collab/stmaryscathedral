import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/signin.css"
import API_BASE from "../api";

const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include"
      });
      if (res.ok) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

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

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error('Invalid username or password');
      }

      localStorage.setItem('username', data.username || username);
      navigate('/');
    } catch {
      setError('Invalid username or password');
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const verifyAuth = async () => {
      const isAuthed = await checkAuth();
      if (isAuthed) {
        navigate('/');
      }
    };
    verifyAuth();
  }, [navigate]);

  return (
<section class="add-card page">
  <form class="form" onSubmit={handleSignIn}>
    <label><h2>Administrator Panel</h2></label>
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
        placeholder="Password"
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
