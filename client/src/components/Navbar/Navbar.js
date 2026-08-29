import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarSide, setSidebarSide] = useState("right");
  const menuToggleRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut().then(() => navigate("/"));
    }
  };

  const toggleSidebar = (event) => {
    event.stopPropagation();
    const buttonRect = menuToggleRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    setSidebarSide(buttonRect.left < windowWidth / 2 ? "left" : "right");
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const updateSidebarPosition = () => {
      setSidebarSide(window.innerWidth < 768 ? "left" : "right");
    };
    updateSidebarPosition();
    window.addEventListener("resize", updateSidebarPosition);
    return () => window.removeEventListener("resize", updateSidebarPosition);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  const handleEventPlannerClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      if (window.confirm("Login to view Event Planner?")) {
        navigate("/login");
      }
    }
  };

  const handleSidebarEventPlannerClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      if (window.confirm("Login to view Event Planner?")) {
        setIsSidebarOpen(false);
        navigate("/login");
      }
    } else {
      setIsSidebarOpen(false);
    }
  };

  // NOTE: this used to also fire a GET to /sendQueryEmail (the trip-reminder
  // batch emailer) on every single Home click, which meant any visitor
  // landing on the homepage triggered an email pass across all users with
  // a trip tomorrow. That's now a separate endpoint (server/routes/
  // tripReminders.js) meant to be hit once a day by a scheduled job, not by
  // page navigation — so that side effect was dropped here.
  const handleHomeClick = (e) => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/logo.png" alt="logo" />
        <h1>Diu Tourism</h1>
      </div>

      <div className="nav-links-container">
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-active-link" : ""}
              onClick={handleHomeClick}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-active-link" : ""}>About</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <NavLink to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? "nav-active-link" : ""}>Login</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/hotels" className={({ isActive }) => isActive ? "nav-active-link" : ""}>Hotels</NavLink>
          </li>
          <li>
            <NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "nav-active-link" : ""}>Attractions</NavLink>
          </li>
          <li>
            <NavLink
              to={isLoggedIn ? "/eventPlanner" : "#"}
              onClick={handleEventPlannerClick}
              className={({ isActive }) => (isLoggedIn && isActive) ? "nav-active-link" : ""}
            >
              Event Planner
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu-toggle" onClick={toggleSidebar} ref={menuToggleRef}>☰</div>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""} ${sidebarSide}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>
        <ul>
          <li>
            <NavLink 
              to="/" 
              onClick={(e) => {
                handleHomeClick(e);
                setIsSidebarOpen(false);
              }}
            >
              Home
            </NavLink>
          </li>
          <li><NavLink to="/about" onClick={() => setIsSidebarOpen(false)}>About</NavLink></li>
          <li>
            {isLoggedIn ? (
              <NavLink to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</NavLink>
            ) : (
              <NavLink to="/login" onClick={() => setIsSidebarOpen(false)}>Login</NavLink>
            )}
          </li>
          <li><NavLink to="/hotels" onClick={() => setIsSidebarOpen(false)}>Hotels</NavLink></li>
          <li><NavLink to="/places/nagoa" onClick={() => setIsSidebarOpen(false)}>Attractions</NavLink></li>
          <li>
            <NavLink
              to={isLoggedIn ? "/eventPlanner" : "#"}
              onClick={handleSidebarEventPlannerClick}
              className={({ isActive }) => (isLoggedIn && isActive) ? "nav-active-link" : ""}
            >
              Event Planner
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
