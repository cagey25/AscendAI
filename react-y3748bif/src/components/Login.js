import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '500px' }}>
      <div className="hero-bg"></div>
      <div className="hero-content" style={{ paddingTop: '80px' }}>
        <p className="eyebrow" style={{ color: '#cfe8cf', letterSpacing: 4 }}>OPERATION</p>
        <h1 style={{ color: '#a8ffb0', fontSize: 44, margin: '4px 0 30px' }}>ASCEND</h1>

        <input
          className="chat-input"
          style={{ width: '100%', marginBottom: 12, display: 'block' }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="chat-input"
          style={{ width: '100%', marginBottom: 20, display: 'block' }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: '#ff8080', fontSize: 12 }}>{error}</p>}

        <button className="login-btn" onClick={handleSubmit} style={{ width: '100%' }}>
          {isSignup ? 'CREATE ACCOUNT' : 'INITIATE LOGIN'}
        </button>

        <p className="footer-text">
          {isSignup ? 'Already a recruit?' : 'New Recruit?'}{' '}
          <span className="footer-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Create Account'}
          </span>
        </p>
      </div>
    </div>
  );
}