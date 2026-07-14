import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { STORAGE_KEYS, saveToStorage, readFromStorage, removeFromStorage } from "../../../utils/storage";
import "./login.css";

function Login({ isLogin, setLogin }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [storedStudents, setStoredStudents] = useState(() => readFromStorage(STORAGE_KEYS.STUDENTS, []));

    useEffect(() => {
        // keep stored students in sync on mount
        setStoredStudents(readFromStorage(STORAGE_KEYS.STUDENTS, []));
    }, []);

    function handleLogin(){
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password.trim();

        if (!normalizedEmail || !normalizedPassword) {
            setMessage("Please enter your email and password");
            return;
        }

        const matchedStudent = Array.isArray(storedStudents)
            ? storedStudents.find((student) => student.email === normalizedEmail && student.password === normalizedPassword)
            : null;
        const isDemoLogin = normalizedEmail === "admin@example.com" && normalizedPassword === "123456789";

        setLoading(true);
        setTimeout(() => {
            if (matchedStudent || isDemoLogin) {
                const activeUser = matchedStudent?.email || normalizedEmail;
                setLogin(true);
                setIsLoggedIn(true);
                setStoredStudents(readFromStorage(STORAGE_KEYS.STUDENTS, []));
                try {
                    saveToStorage(STORAGE_KEYS.IS_LOGIN, true);
                    saveToStorage(STORAGE_KEYS.LOGGED_IN_USER, activeUser);
                } catch (e) {}
                setMessage(`Login successful! Welcome ${activeUser}`);
                navigate("/dashboard");
            } else {
                setMessage("Invalid email or password");
            }
            setLoading(false);
        }, 500);
    }
    // if(isLoggedIn){
    //     sessionStorage.setItem(STORAGE_KEYS.IS_LOGIN, "true");
    //     setLogin(true);
    //     navigate("/dashboard");
    // }

    function handleLogout() {
        setLogin(false);
        setIsLoggedIn(false);
        removeFromStorage(STORAGE_KEYS.IS_LOGIN);
        removeFromStorage(STORAGE_KEYS.LOGGED_IN_USER);
        setMessage("Logged out successfully");
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

                <button type="button" className="login-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* storage preview and helpers removed per request */}

                {isLogin ? (
                    <>
                        <p className="welcome-text">Welcome</p>
                        <button className="login-btn secondary" onClick={handleLogout}>Logout</button>
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