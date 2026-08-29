import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/Gangeshwar1.jpg',
  '/assets/Gangeshwar2.jpg',
  '/assets/Gangeshwar1.jpg',
  '/assets/Gangeshwar2.jpg'
  // '/assets/Gangeshwar3.jpg',
  // '/assets/Gangeshwar4.jpg',
  // '/assets/Gangeshwar-interior.jpg',
  // '/assets/Gangeshwar-waves.jpg',
];

const Gangeshwar = () => {
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
                alt={`Gangeshwar Temple ${index + 1}`}
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
            <li><Link to="/places/temples" className={location.pathname === "/places/temples" ? "active-link" : ""}>Gangeshwar Temple</Link></li>
          </ul>
        </nav>

        <div className="places-details">
          <header>
            <h1 className="placesh1">Gangeshwar Temple</h1>
            <p className="places-intro">Where the Arabian Sea Worships Lord Shiva</p>
          </header>

          <section>
            <p className="intro">
              Nestled along Diu's rocky coastline, Gangeshwar Temple is a unique Shiva shrine where five naturally formed lingams are perpetually bathed by the Arabian Sea waves. This sacred site, believed to have been established by the Pandavas during their exile, offers a mystical blend of spiritual devotion and natural wonder.
            </p>
            <div className="highlight-box">
              <p>The temple gets its name 'Gangeshwar' as the seawater washing the lingas is considered as sacred as the Ganges, with devotees believing it carries the same purifying powers.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Sacred Significance</h2>
            <div className="why-visit">
              {[
                { title: "Pandava Connection", text: "Believed to be established by the five Pandava brothers during their exile" },
                { title: "Natural Abhishekam", text: "Sea waves continuously perform ritual bathing of the lingas" },
                { title: "Spiritual Cleansing", text: "Devotees believe worship here brings purification and fulfills wishes" },
                { title: "Mythological Importance", text: "Named 'Gangeshwar' as the seawater is considered as holy as the Ganges" },
                { title: "Meditative Atmosphere", text: "Rhythmic waves create a naturally tranquil environment for prayer" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Visitor Information</h2>
            <div className="attractions">
              {[
                { name: "Location", desc: "Fudam Village, just 3 km from Diu Town" },
                { name: "Timings", desc: "Open daily from 5:00 AM to 9:00 PM" },
                { name: "Best Time", desc: "October-March during low tide for best viewing" },
                { name: "Special Events", desc: "Grand celebrations during Mahashivratri and annual Pandava festival" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Unique Features</h2>
            <ul className="tips">
              <li><strong>Five Lingas:</strong> Representing the five Pandava brothers from the Mahabharata</li>
              <li><strong>Cave Setting:</strong> Simple rock-cut shrine maintaining ancient character</li>
              <li><strong>Tidal Worship:</strong> Nature's own ritual bathing by sea waves</li>
              <li><strong>Soundscape:</strong> Meditative blend of waves, bells and chants</li>
              <li><strong>Coastal Location:</strong> Breathtaking views of the Arabian Sea</li>
            </ul>
          </section>

          <section>
            <h2 className="section-title">Nearby Attractions</h2>
            <div className="attractions">
              {[
                { name: "Fudam Bird Sanctuary", desc: "2 km away - Haven for migratory birds" },
                { name: "Vanakbara Village", desc: "Traditional fishing community with colorful boats" },
                { name: "Diu Museum", desc: "Showcasing Portuguese-era artifacts and history" },
                { name: "Naida Caves", desc: "Fascinating network of volcanic rock formations" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tips">
            <h2 className="section-title">Visiting Tips</h2>
            <ul>
              <li><strong>Timing:</strong> Check tide schedules - low tide offers best linga visibility</li>
              <li><strong>Attire:</strong> Modest clothing recommended for temple visit</li>
              <li><strong>Footwear:</strong> Rocky surface - wear comfortable, grippy shoes</li>
              <li><strong>Photography:</strong> Allowed but be respectful during worship</li>
              <li><strong>Safety:</strong> Be cautious of waves during high tide</li>
            </ul>
          </section>

          <div className="cta">
            <h2>Experience Divine Nature at Gangeshwar</h2>
            <p>Whether you seek spiritual solace, historical connection, or simply wish to witness one of India's most unique temples, Gangeshwar offers an unforgettable experience where divinity meets the sea.</p>
            <p><strong>Plan your visit to this mystical coastal temple today!</strong></p>
          </div>
        </div>

        <Feedback placename="gangeshwar" />
      </div>
    </div>
  );
};

export default Gangeshwar;