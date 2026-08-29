import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/chakratirth.jpg',
  '/assets/go9.jpg',
  // '/assets/go8.jpg',
  '/assets/gh5.jpg',
  '/assets/gh4.jpg',
];

const Chakratirth = () => {
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
                alt={`Chakratirth Beach ${index + 1}`}
              />
            ))}
          </div>
        </div>
      <div className="places-page-wrapper">
    

        <nav className="places-links">
          <ul>
            <li><Link to="/places/chakratirth" className={location.pathname === "/places/chakratirth" ? "active-link" : ""}>Beaches</Link></li>
            <li><Link to="/places/DiuFort" className={location.pathname === "/places/DiuFort" ? "active-link" : ""}>Forts</Link></li>
            <li><Link to="/places/temples" className={location.pathname === "/places/temples" ? "active-link" : ""}>Temples</Link></li>
            <li><Link to="/places/stPaulsChurch" className={location.pathname === "/places/stPaulsChurch" ? "active-link" : ""}>Other Places</Link></li>
          </ul>
        </nav>

        <nav className="places-links">
          <ul>
            <li><Link to="/places/nagoa" className={location.pathname === "/places/nagoa" ? "active-link" : ""}>Nagoa Beach</Link></li>
            <li><Link to="/places/ghoghla" className={location.pathname === "/places/ghoghla" ? "active-link" : ""}>Ghoghla Beach</Link></li>
            <li><Link to="/places/chakratirth" className={location.pathname === "/places/chakratirth" ? "active-link" : ""}>Chakratirth Beach</Link></li>
            <li><Link to="/places/jallandhar" className={location.pathname === "/places/jallandhar" ? "active-link" : ""}>Jallandhar Beach</Link></li>
            <li><Link to="/places/gomtimata" className={location.pathname === "/places/gomtimata" ? "active-link" : ""}>Gomtimata Beach</Link></li>
          </ul>
        </nav>

        <div className="places-details">
          <header>
            <h1 className="placesh1">Chakratirth Beach</h1>
            <p className="places-intro">Diu's Spiritual Sunset Paradise</p>
          </header>

          <section>
            <p className="intro">
              Named after the mythical 'chakra' (divine disc) of Lord Vishnu, Chakratirth Beach offers a serene coastal experience just minutes from Diu town. This picturesque beach is renowned for its white sands, crystal-clear waters, and the rare ability to witness both sunrise and sunset over the Arabian Sea.
            </p>
            <div className="highlight-box">
              <p>Known as Diu's official Sunset Point, the beach transforms into a magical canvas of colors each evening, creating unforgettable memories for visitors.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Beach Highlights</h2>
            <div className="why-visit">
              {[
                { title: "Twin Views", text: "One of few beaches where you can see both sunrise and sunset" },
                { title: "Spiritual Significance", text: "Associated with Lord Vishnu's divine chakra" },
                { title: "Serene Atmosphere", text: "Peaceful environment with minimal crowds" },
                { title: "Photography", text: "Ideal for capturing stunning coastal landscapes" },
                { title: "Accessibility", text: "Just 2km from Diu town center" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Visitor Experience</h2>
            <div className="attractions">
              {[
                { name: "Sunset Views", desc: "Spectacular evening colors over the Arabian Sea" },
                { name: "Beach Walks", desc: "Long stretches of white sand perfect for leisurely strolls" },
                { name: "Water Quality", desc: "Clear, calm waters ideal for wading" },
                { name: "Local Legends", desc: "Stories of Lord Vishnu's presence in the area" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Practical Information</h2>
            <ul className="tips">
              <li><strong>Best Time to Visit:</strong> October to March for pleasant weather</li>
              <li><strong>Sunset Timing:</strong> Arrive 1 hour before sunset for best experience</li>
              <li><strong>Facilities:</strong> Basic amenities available nearby</li>
              <li><strong>Safety:</strong> Generally safe for wading, but check tide conditions</li>
              <li><strong>Photography Tip:</strong> Golden hour provides perfect lighting</li>
            </ul>
          </section>

          <section className="tips">
            <h2 className="section-title">Nearby Attractions</h2>
            <div className="attractions">
              {[
                { name: "INS Khukri Memorial", desc: "2km away - Tribute to 1971 war heroes" },
                { name: "Diu Fort", desc: "3km away - Impressive Portuguese-era fortress" },
                { name: "Gangeshwar Temple", desc: "4km away - Unique seaside Shiva temple" },
                { name: "Diu Museum", desc: "2.5km away - Showcasing local history" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="cta">
            <h2>Experience Diu's Sunset Magic</h2>
            <p>Whether you seek spiritual connection, photographic inspiration, or simply a peaceful beach experience, Chakratirth offers a perfect blend of natural beauty and cultural significance.</p>
            <p><strong>Plan your visit to this enchanting coastal retreat today!</strong></p>
          </div>
        </div>

        <Feedback placename="chakratirth" />
      </div>
    </div>
  );
};

export default Chakratirth;