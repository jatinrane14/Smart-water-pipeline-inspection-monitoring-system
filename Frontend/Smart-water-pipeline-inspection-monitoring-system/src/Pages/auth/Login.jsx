import React, { useState } from "react";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login Details:", {
      email,
      password,
    });

    // Later:
    // Call your Java Spring Bo
    // ot login API here.
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <h1>AQUA-SENTRY</h1>
          <h2>Smart Water Pipeline</h2>
          <p>
            AI-Assisted Leak Detection & Pipeline Monitoring System
          </p>
        </div>

        <div className="login-card">
          <h2>Login</h2>
          <p className="login-subtitle">
            Sign in to access the monitoring dashboard
          </p>

          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <a href="/register">Create Account</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;