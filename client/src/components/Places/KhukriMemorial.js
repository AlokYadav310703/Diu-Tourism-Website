import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
    '/assets/KH1.png',
    '/assets/KH2.png',
    '/assets/KH4.png',
    '/assets/KH5.png'
];

const KhukhriMemorial = () => {
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
                                alt={`INS Khukri Memorial ${index + 1}`}
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
                        <li><Link to="/places/khukriMemorial" className={location.pathname === "/places/khukriMemorial" ? "active-link" : ""}>Other Places</Link></li>
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
                        <h1 className="placesh1">INS Khukri Memorial</h1>
                        <p className="places-intro">A Tribute to Naval Heroes of the 1971 War</p>
                    </header>

                    <section>
                        <p className="intro">
                            The INS Khukri Memorial stands on a hillock near Chakratirth Beach, commemorating the 179 brave sailors and officers who made the ultimate sacrifice during the 1971 Indo-Pak war. On December 9, 1971, INS Khukri became the first Indian naval ship to be lost in combat when it was torpedoed by Pakistani submarine PNS Hangor.
                        </p>
                        <div className="highlight-box">
                            <p>Captain Mahendra Nath Mulla, the commanding officer, chose to go down with his ship, setting an unparalleled example of leadership and sacrifice in Indian naval history.</p>
                        </div>
                    </section>

                    <section>
                        <h2>Memorial Features</h2>
                        <div className="why-visit">
                            {[
                                { title: "Scale Model", text: "Detailed replica of the original INS Khukri frigate" },
                                { title: "Martyrs' Wall", text: "Commemorative plaque listing all 179 crew members who perished" },
                                { title: "Panoramic Views", text: "Commanding views of the Arabian Sea where the ship sank" },
                                { title: "Historical Displays", text: "Exhibits detailing the ship's history and final mission" },
                                { title: "Reflection Area", text: "Quiet space for contemplation and paying respects" }
                            ].map((item, index) => (
                                <div className="benefit-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Historical Context</h2>
                        <div className="attractions">
                            {[
                                { name: "The Incident", desc: "Sank on December 9, 1971 after being hit by three torpedoes" },
                                { name: "Rescue Efforts", desc: "INS Kirpan rescued 67 survivors after heroic efforts" },
                                { name: "Captain's Sacrifice", desc: "Capt. Mulla gave his life jacket to a sailor and went down with the ship" },
                                { name: "Legacy", desc: "The sinking became a rallying point for Indian forces in the war" }
                            ].map((place, index) => (
                                <div className="attraction-item" key={index}>
                                    <h3>{place.name}</h3>
                                    <p>{place.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Visitor Information</h2>
                        <p>
                            Located near Chakratirth Beach in Diu, the memorial is open daily from <strong>8:00 AM to 6:00 PM</strong>. The site offers parking facilities and is wheelchair accessible. The best time to visit is early morning or late afternoon when the sea breeze makes the experience more pleasant.
                        </p>
                    </section>

                    <section className="tips">
                        <h2>Visiting Tips</h2>
                        <ul>
                            <li><strong>Timing:</strong> Allow at least 45 minutes to fully experience the memorial</li>
                            <li><strong>Photography:</strong> Permitted throughout the memorial grounds</li>
                            <li><strong>Nearby:</strong> Combine your visit with Chakratirth Beach</li>
                            <li><strong>Special Events:</strong> Annual memorial ceremony held every December 9th</li>
                            <li><strong>Respect:</strong> Maintain solemn decorum as this is a war memorial</li>
                        </ul>
                    </section>

                    <div className="cta">
                        <h2>Honor India's Naval Heroes</h2>
                        <p>The INS Khukri Memorial stands as a powerful reminder of courage, sacrifice, and patriotism. It's a must-visit for anyone interested in India's military history or wishing to pay respects to our brave sailors.</p>
                        <p><strong>Visit this poignant tribute to India's maritime valor!</strong></p>
                    </div>
                </div>

                <Feedback placename="khukhri_memorial" />
            </div>
        </div>
    );
};

export default KhukhriMemorial;