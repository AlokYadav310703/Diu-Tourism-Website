import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
    '/assets/CV1.png',
    '/assets/CV2.png',
    '/assets/CV3.png',
    '/assets/CV4.png',
];

const NadiaCaves = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000);

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
                                alt={`Nadia Caves ${index + 1}`}
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
                        <li><Link to="/places/nadiaCaves" className={location.pathname === "/places/nadiaCaves" ? "active-link" : ""}>Other Places</Link></li>
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
                        <h1 className="placesh1">Nadia Caves - Diu's Natural Labyrinth</h1>
                        <p className="places-intro">A Geological Marvel with Historical Significance</p>
                    </header>

                    <section>
                        <p className="intro">
                            Located just outside the city walls of the Diu Fort, the Naida Caves are one of Diu's most fascinating natural attractions. This stunning network of interconnected caves features square-cut steps, natural openings, and a maze-like formation that is still not fully explored.
                        </p>
                        <div className="highlight-box">
                            <p>Local legends claim Portuguese soldiers hid here during Operation Vijay (1961) when Diu was integrated into India.</p>
                        </div>
                    </section>

                    <section>
                        <h2>Key Features</h2>
                        <div className="why-visit">
                            {[
                                { title: "Geological Wonder", text: "Formed naturally by erosion and geological activity over centuries" },
                                { title: "Unique Architecture", text: "Features square-cut steps and open roofs with dramatic light play" },
                                { title: "Historical Significance", text: "Believed to be partially carved by Portuguese for building materials" },
                                { title: "Photographer's Paradise", text: "Stunning light and shadow effects create perfect photo opportunities" },
                                { title: "Explorer's Delight", text: "Maze-like formation with areas still not fully explored" }
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
                                { name: "Location", desc: "Just outside Diu Fort walls, easily accessible from Diu town" },
                                { name: "Accessibility", desc: "Well-connected by road from nearby towns and cities" },
                                { name: "Nearest Station", desc: "Delwada Railway Station" },
                                { name: "Best Time to Visit", desc: "Early morning or late afternoon for best lighting" }
                            ].map((place, index) => (
                                <div className="attraction-item" key={index}>
                                    <h3>{place.name}</h3>
                                    <p>{place.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Scientific Importance</h2>
                        <p>
                            For enthusiasts of geology and natural history, the Naida Caves offer a glimpse into the wonders of speleology—the scientific study of caves involving geology, archaeology, and biology. The caves showcase Diu's diverse landscape with surrounding limestone cliffs, rocky coves, and sandy beaches.
                        </p>
                    </section>

                    <section className="tips">
                        <h2>Visiting Tips</h2>
                        <ul>
                            <li><strong>Footwear:</strong> Wear comfortable shoes with good grip for cave exploration</li>
                            <li><strong>Timing:</strong> Visit during daylight hours for best visibility</li>
                            <li><strong>Photography:</strong> Bring a camera to capture the unique light patterns</li>
                            <li><strong>Combine Visit:</strong> Pair with a trip to nearby Diu Fort</li>
                            <li><strong>Safety:</strong> Stay on marked paths and avoid isolated areas</li>
                        </ul>
                    </section>

                    <div className="cta">
                        <h2>Explore Diu's Underground Wonder</h2>
                        <p>Whether you're an explorer, a history buff, or simply seeking peace amidst nature, the Naida Caves are a must-visit destination in Diu.</p>
                        <p><strong>Discover this geological marvel today!</strong></p>
                    </div>
                </div>

                <Feedback placename="Nadia_Caves" />
            </div>
        </div>
    );
};

export default NadiaCaves;