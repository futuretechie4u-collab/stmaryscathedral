import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../api';
import '../css/signin.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setSuccess('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-card page">
      <form className="form" onSubmit={handleChangePassword}>
        <label><h2>Change Password</h2></label>
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
        
        <label htmlFor="oldPassword" className="label">
          <span className="title">CURRENT PASSWORD</span>
          <input
            id="oldPassword"
            className="input-field"
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </label>
        
        <label htmlFor="newPassword" className="label">
          <span className="title">NEW PASSWORD</span>
          <input
            id="newPassword"
            className="input-field"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <label htmlFor="confirmPassword" className="label">
          <span className="title">CONFIRM NEW PASSWORD</span>
          <input
            id="confirmPassword"
            className="input-field"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
     
        <input 
          className="checkout-btn" 
          type="submit" 
          value={loading ? "UPDATING..." : "CHANGE PASSWORD"} 
          disabled={loading} 
        />
      </form>
    </section>
  );
};

export default ChangePassword;
