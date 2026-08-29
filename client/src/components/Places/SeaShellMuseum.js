import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
    '/assets/SeaShl1.jpg',
    '/assets/SeaShl6.jpeg',
    '/assets/SeaShl2.jpg',
    '/assets/SeaShl3.jpg',
    '/assets/SeaShl4.jpg',
];

const SeaShellMuseum = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="places-page-full-wrapper">
             <div className="slideshow-images">
                    <div className="slideshow-container">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                className={`slide ${index === currentSlide ? 'active' : ''}`}
                                alt={`Sea Shell Museum ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            <div className="places-page-wrapper">

               

                <nav className="places-links">
                    <ul>
                        <li><Link to="/places/nagoa" className={location.pathname === "/places/nagoa" ? "active-link" : ""}>Beaches</Link></li>
                        <li><Link to="/places/DiuFort" className={location.pathname === "/places/DiuFort" ? "active-link" : ""}>Forts</Link></li>
                        <li><Link to="/places/temples" className={location.pathname === "/places/temples" ? "active-link" : ""}>Temples</Link></li>
                        <li><Link to="/places/seaShellMuseum" className={location.pathname === "/places/seaShellMuseum" ? "active-link" : ""}>Other Places</Link></li>
                    </ul>
                </nav>

                <nav className="places-links">
                    <ul>
                        <li><Link to="/places/stPaulsChurch" className={location.pathname === "/places/stPaulsChurch" ? "active-link" : ""}>St Paul's Church</Link></li>
                        <li><Link to="/places/nadiaCaves" className={location.pathname === "/places/nadiaCaves" ? "active-link" : ""}>Nadia Caves</Link></li>
                        <li><Link to="/places/khukriMemorial" className={location.pathname === "/places/khukriMemorial" ? "active-link" : ""}>INS Khukri Memorial</Link></li>
                        {/* <li><Link to="/places/diuMuseum" className={location.pathname === "/places/diuMuseum" ? "active-link" : ""}>St. Thomas Church</Link></li> */}
                        <li><Link to="/places/seaShellMuseum" className={location.pathname === "/places/seaShellMuseum" ? "active-link" : ""}>Sea Shell Museum</Link></li>
                    </ul>
                </nav>

                <div className="places-details">
                    <header>
                        <h1 className="placesh1">Sea Shell Museum – A Unique Marine Collection</h1>
                        <p className="places-intro">Asia's Largest Collection of Marine Shells</p>
                    </header>

                    <section>
                        <p className="intro">Located near Nagoa Beach on Airport Road, this museum is home to 2,500–3,000 sea shells, collected over 50 years by Captain Devjibhai Vira Fulbaria, a merchant navy veteran. It's considered the largest sea shell collection in Asia.</p>
                        <div className="highlight-box">
                            <p>A fascinating journey through marine biodiversity, showcasing shells from across the world's oceans.</p>
                        </div>
                    </section>

                    <section>
                        <h2>Museum Highlights</h2>
                        <div className="why-visit">
                            {[
                                { title: "Diverse Collection", text: "Over 3,000 specimens showcasing marine biodiversity from around the world" },
                                { title: "Detailed Exhibits", text: "Magnifying glasses provided to view intricate shell details" },
                                { title: "Educational Displays", text: "Informative English labels explaining each specimen" },
                                { title: "Two Floors", text: "Spacious exhibition spread across two levels" },
                                { title: "Souvenir Shop", text: "On-site shop offering shell-based jewelry and decorative items" }
                            ].map((item, index) => (
                                <div className="benefit-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Visitor Information</h2>
                        <div className="attractions">
                            {[
                                { name: "Entry Fee", desc: "₹10 per person" },
                                { name: "Photography", desc: "Not allowed inside the museum" },
                                { name: "Location", desc: "Near Nagoa Beach, Airport Road, Diu" },
                                { name: "Best Time to Visit", desc: "Morning hours for smaller crowds" }
                            ].map((place, index) => (
                                <div className="attraction-item" key={index}>
                                    <h3>{place.name}</h3>
                                    <p>{place.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>About the Collector</h2>
                        <p>The entire collection was amassed by <strong>Captain Devjibhai Vira Fulbaria</strong>, a merchant navy officer who dedicated 50 years to building this remarkable collection from his travels across the world's oceans.</p>
                    </section>

                    <section className="tips">
                        <h2>Tips for Visitors</h2>
                        <ul>
                            <li><strong>Timing:</strong> Plan for at least 45 minutes to appreciate the collection</li>
                            <li><strong>Souvenirs:</strong> Unique shell crafts available at reasonable prices</li>
                            <li><strong>Combine With:</strong> Visit nearby Nagoa Beach afterwards</li>
                            <li><strong>Accessibility:</strong> Wheelchair accessible ground floor</li>
                            <li><strong>Nearby:</strong> Several good restaurants within walking distance</li>
                        </ul>
                    </section>

                    <div className="cta">
                        <h2>Discover the Wonders of Marine Life</h2>
                        <p>Whether you're a marine enthusiast, curious traveler, or looking for an educational experience, the Sea Shell Museum offers a unique glimpse into oceanic biodiversity.</p>
                        <p><strong>Plan your visit to this one-of-a-kind museum today!</strong></p>
                    </div>
                </div>

                <Feedback placename="sea_shell_museum" />
            </div>
        </div>
    );
};

export default SeaShellMuseum;