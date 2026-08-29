import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
    '/assets/PAUL1.png',
    // '/assets/PAUL2.png',
    '/assets/PAUL3.png',
    '/assets/PAUL1.png',
    '/assets/PAUL2.png',
];

const StPaulsChurch = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 5000);

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
                                alt={`Slide ${index + 1}`}
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
                        <li><Link to="/places/stPaulsChurch" className={location.pathname === "/places/stPaulsChurch" ? "active-link" : ""}>Other Places</Link></li>
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
                        <h1 className="placesh1">St. Paul's Church (Church of Immaculate Conception)</h1>
                        <p className="places-intro">A Masterpiece of Gothic Architecture in Diu</p>
                    </header>

                    <section>
                        <p className="intro">St. Paul's Church, also known as the Church of Immaculate Conception, is one of the most iconic Portuguese churches in India. Built in stunning Gothic architecture, its foundation was laid on 7th April 1601 during the governorship of Duarte de Melo, and completed in 1610.</p>
                        <div className="highlight-box">
                            <p>Originally built as a Jesuit seminary known as the Convent of St. Paul, it is believed Arabic was once taught here to prepare seminarians for service in Emperor Akbar's court.</p>
                        </div>
                    </section>

                    <section>
                        <h2>Architectural Highlights</h2>
                        <div className="why-visit">
                            {[
                                { title: "Main Altar", text: "Statue of Mary, Immaculate Conception with the Sanctum Sanctorum" },
                                { title: "Right Altar", text: "Dedicated to Our Lady of Rosary and features the Sacred Heart of Jesus" },
                                { title: "Left Altar", text: "Dedicated to Our Lady of Mount, with statues of St. Anthony and St. Sebastian" },
                                { title: "Artwork", text: "Two beautiful paintings near the entrance depicting the Birth of Jesus and His Presentation in the Temple" },
                                { title: "Materials", text: "Intricate black wooden altars and pulpit, crafted from wood brought from Mozambique" }
                            ].map((item, index) => (
                                <div className="benefit-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Historical Significance</h2>
                        <div className="attractions">
                            {[
                                { name: "Construction", desc: "Built between 1601-1610 during Portuguese rule in India" },
                                { name: "Architect", desc: "Designed by Jesuit priest Rev. Fr. Gaspar Soares" },
                                { name: "Cultural Role", desc: "Served as an important center for religious and language education" },
                                { name: "UNESCO Nomination", desc: "Recognized as a significant heritage site with Gothic architectural elements" }
                            ].map((place, index) => (
                                <div className="attraction-item" key={index}>
                                    <h3>{place.name}</h3>
                                    <p>{place.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Best Time to Visit</h2>
                        <p>The ideal time is <strong>October to March</strong>, when the weather is pleasantly cool (20-30°C). Morning visits are recommended for the best lighting to appreciate the architecture.</p>
                    </section>

                    <section className="tips">
                        <h2>Visitor Information</h2>
                        <ul>
                            <li><strong>Opening Hours:</strong> 8:00 AM to 6:00 PM daily</li>
                            <li><strong>Dress Code:</strong> Modest clothing recommended</li>
                            <li><strong>Photography:</strong> Allowed (no flash photography inside)</li>
                            <li><strong>Guided Tours:</strong> Available for detailed historical insights</li>
                            <li><strong>Accessibility:</strong> Wheelchair accessible with some limitations</li>
                        </ul>
                    </section>

                    <div className="cta">
                        <h2>Experience This Architectural Marvel</h2>
                        <p>Step back in time and witness the magnificent blend of European Gothic architecture with Indian craftsmanship at St. Paul's Church.</p>
                        <p><strong>Plan your visit to this UNESCO-nominated heritage site today!</strong></p>
                    </div>
                </div>

                <Feedback placename="St_Paul_Church" />
            </div>
        </div>
    );
};

export default StPaulsChurch;