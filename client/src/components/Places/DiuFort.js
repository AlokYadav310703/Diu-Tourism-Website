import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/f12.jpg',
  '/assets/D2.png',
  '/assets/D3.png',
  '/assets/f14.jpg',
  '/assets/f15.jpg',
  '/assets/f16.jpg',
];

const DiuFort = () => {
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
                alt={`Diu Fort ${index + 1}`}
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
            <li><Link to="/places/DiuFort" className={location.pathname === "/places/DiuFort" ? "active-link" : ""}>Diu Fort</Link></li>
            <li><Link to="/places/PaniKotha" className={location.pathname === "/places/PaniKotha" ? "active-link" : ""}>Fortress of Panikotha</Link></li>
          </ul>
        </nav>

        <div className="places-details">
          <header>
            <h1 className="placesh1">Diu Fortress</h1>
            <p className="places-intro">Portugal's Mighty Sea Citadel</p>
          </header>

          <section>
            <p className="intro">
              Built in 1535 as part of a strategic alliance between the Portuguese and Bahadur Shah, Sultan of Gujarat, Diu Fort is a monumental seaside fortress covering 5.6 hectares. Reconstructed in 1546 by Portuguese commander D. Joao de Castro, this massive structure stands as one of India's most impressive colonial-era fortifications.
            </p>
            <div className="highlight-box">
              <p>Surrounded by sea on three sides and a protective canal on the fourth, the fort's ingenious design withstood numerous sieges during its 400 years of Portuguese rule.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Architectural Marvels</h2>
            <div className="why-visit">
              {[
                { title: "Massive Walls", text: "10-meter high laterite stone walls up to 5 meters thick" },
                { title: "Strategic Design", text: "Sea-facing bastions with 70+ cannons still in place" },
                { title: "Underground Passages", text: "Network of tunnels connecting key defense points" },
                { title: "Water Systems", text: "Sophisticated rainwater harvesting and storage" },
                { title: "Lighthouse", text: "19th century lighthouse offering panoramic views" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Historical Highlights</h2>
            <div className="attractions">
              {[
                { name: "Siege of 1546", desc: "Withstood 7-month Ottoman siege with 20,000 troops" },
                { name: "Portuguese Era", desc: "Served as military HQ for 400+ years" },
                { name: "Strategic Importance", desc: "Key to controlling Arabian Sea trade routes" },
                { name: "Liberation", desc: "Captured by India in Operation Vijay (1961)" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Must-See Features</h2>
            <ul className="tips">
              <li><strong>Cannon Display:</strong> Original Portuguese and British cannons along ramparts</li>
              <li><strong>St. George's Church:</strong> 16th century chapel with colonial-era artifacts</li>
              <li><strong>Prison Complex:</strong> Historic jail cells with Portuguese inscriptions</li>
              <li><strong>Bastion Views:</strong> Panoramic sea views from strategic defense points</li>
              <li><strong>Sunset Point:</strong> Western walls offer spectacular sunset vistas</li>
            </ul>
          </section>

          <section>
            <h2 className="section-title">Visitor Information</h2>
            <div className="attractions">
              {[
                { name: "Timings", desc: "8:00 AM to 6:00 PM daily" },
                { name: "Entry Fee", desc: "₹25 for Indians, ₹300 for foreigners" },
                { name: "Guided Tours", desc: "Available in English, Hindi and Portuguese" },
                { name: "Location", desc: "Eastern coast of Diu Island, 1km from city center" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tips">
            <h2 className="section-title">Exploring Tips</h2>
            <ul>
              <li><strong>Footwear:</strong> Wear comfortable shoes for walking on uneven surfaces</li>
              <li><strong>Timing:</strong> Visit early morning or late afternoon to avoid heat</li>
              <li><strong>Photography:</strong> Golden hour provides best lighting for photos</li>
              <li><strong>Hydration:</strong> Carry water as facilities are limited inside</li>
              <li><strong>Combine Visit:</strong> Pair with nearby Pani Kotha fortress</li>
            </ul>
          </section>

          <div className="cta">
            <h2>Step Into Colonial History</h2>
            <p>Diu Fort offers an unparalleled journey through centuries of maritime history, military strategy, and colonial architecture. Walking its ramparts transports you back to an era of sea battles and spice trade dominance.</p>
            <p><strong>Plan your visit to this magnificent UNESCO-nominated fortress today!</strong></p>
          </div>
        </div>

        <Feedback placename="diuFort" />
      </div>
    </div>
  );
};

export default DiuFort;