import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import "./login.css";

// Rebuilt on Supabase Auth. There's no separate "admin login" anymore —
// admin status is just a flag on your profile (set by an existing admin
// in the Supabase dashboard), so the same form works for everyone; admin
// pages/buttons show up automatically based on that flag once logged in.
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        setLoading(false);
        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage("Login successful! 🎉");
        navigate("/");
    };

    const handleGoogleLogin = async () => {
        setMessage("");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: window.location.origin }
        });
        if (error) setMessage(error.message);
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-login-group">
                        <input
                            name="authUserEmail"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-login-group">
                        <input
                            name="authUserPassword"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {message && <p className="login-message">{message}</p>}
                    <button type="submit" name="authLoginSubmit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <button
                        type="button"
                        className="signUp-btn"
                        onClick={handleGoogleLogin}
                    >
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        name="authSignupBtn"
                        className="signUp-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
