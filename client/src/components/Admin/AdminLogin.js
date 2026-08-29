// import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Admin is now just a flag on a normal account (profiles.is_admin in
// Supabase), not a separate credential/login flow — so there's no more
// distinct "admin login" form. This route just sends people to the
// regular login page; once logged in, admin-only buttons and pages
// appear automatically based on their profile.
const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
};

export default AdminLogin;
