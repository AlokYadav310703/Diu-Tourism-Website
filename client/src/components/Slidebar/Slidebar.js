import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Slidebar.css"; // Import your CSS file

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="menu-btn" onClick={toggleSidebar}>&#9776;</div>
            {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
            
            <div className={`sidebar ${isOpen ? "active" : ""}`}>
                <ul>
                    <li><i className="fas fa-home"></i> Home</li>
                    <li><i className="fas fa-info-circle"></i> About Diu</li>
                    <li><i className="fas fa-map-marker-alt"></i> Places to Visit</li>
                    <li><i className="fas fa-star"></i> Facilities</li>
                    <li><i className="fas fa-calendar-alt"></i> Events</li>
                    <li><i className="fas fa-file-alt"></i> Tender / Circulars</li>
                    <li><i className="fas fa-images"></i> Gallery</li>
                    <li><i className="fas fa-users"></i> Citizen Corner</li>
                    <li><i className="fas fa-phone"></i> Contact Us</li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
