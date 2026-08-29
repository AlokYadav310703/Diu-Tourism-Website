import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import "./login.css";

// Rebuilt on Supabase Auth. Passing user_name in options.data makes it
// available to the handle_new_user() Postgres trigger (see db/schema.sql),
// which creates the profile row and seeds the 12 default itinerary
// activities automatically — no separate "create table for this user"
// step needed anymore.
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { user_name: name } }
        });

        setLoading(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        if (data.session) {
            // Email confirmation is off in your Supabase project settings —
            // the user is logged in immediately.
            setMessage("Signup successful! 🎉");
            navigate("/");
        } else {
            // Email confirmation is on — they need to click the link first.
            setMessage("Signup successful! Check your email to confirm your account, then log in.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSignup}>
                    <h2>Signup</h2>
                    <div className="input-login-group">
                        <input type="text" name="authSignupName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-login-group">
                        <input type="email" name="authSignupEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-login-group">
                        <input type="password" name="authSignupPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <button type="submit" name="authSignupSubmit" className="login-btn" disabled={loading}>
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
