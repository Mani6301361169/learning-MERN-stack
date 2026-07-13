import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login({ isLogin, setLogin }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleLogin(){
        setLoading(true);
        setTimeout(() => {
            if (
                email === "admin@example.com" &&
                password === "123456789"
            ) {
                setLogin(true);
                try {
                    localStorage.setItem("isLogin", "true");
                } catch (e) {}
                setMessage("Login successful!");
                navigate("/dashboard");
            } else {
                setMessage("Invalid email or password");
            }
            setLoading(false);
        }, 2000);
    }
    
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Placement Management</h2>
                <h3>Welcome back! Sign in to continue</h3>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="button" className="toggle-password-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide password" : "Show password"}
                </button>

                <button className="login-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {isLogin ? (
                    <>
                        <p className="welcome-text">Welcome</p>
                        <button className="login-btn secondary" onClick={() => setLogin(false)}>Logout</button>
                    </>
                ) : (
                    <>
                        <h3 className="message-text">{message}</h3>
                        <p className="register-text">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;