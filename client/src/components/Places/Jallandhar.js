import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/jh1.jpg',
  '/assets/jh2.jpg',
  '/assets/jh3.jpeg',
];

const Jallandhar = () => {
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
              alt={`Jallandhar Beach ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="places-page-wrapper">


        <nav className="places-links">
          <ul>
            <li>
              <Link
                to="/places/nagoa"
                className={location.pathname.startsWith("/places/") ? "active-link" : ""}
              >
                Beaches
              </Link>
            </li>

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
            <h1 className="placesh1">Jallandhar Beach</h1>
            <p className="places-intro">Diu's Serene Coastal Sanctuary</p>
          </header>

          <section>
            <p className="intro">
              Named after the demon Jallandhar from Hindu mythology, this tranquil beach offers a peaceful escape from busier tourist spots. With its golden sands, rocky outcrops, and the historic Jallandhar Shrine overlooking the shore, it's the perfect destination for visitors seeking solitude and natural beauty.
            </p>
            <div className="highlight-box">
              <p>Unlike Diu's more crowded beaches, Jallandhar remains blissfully undeveloped, offering an authentic coastal experience with breathtaking sunrise and sunset views.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Why Visit Jallandhar Beach?</h2>
            <div className="why-visit">
              {[
                { title: "Tranquil Atmosphere", text: "Escape the crowds at this peaceful, less-commercialized beach" },
                { title: "Scenic Beauty", text: "Golden sands framed by dramatic rocky formations" },
                { title: "Jallandhar Shrine", text: "Small temple to Goddess Chandrika on a picturesque hillock" },
                { title: "Photography", text: "Perfect light conditions at sunrise and sunset" },
                { title: "Heritage Walk", text: "Explore Diu's cultural history along the coastal trail" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Beach Features</h2>
            <div className="attractions">
              {[
                { name: "Shoreline", desc: "1.5 km stretch of soft golden sand" },
                { name: "Water Conditions", desc: "Gentle waves suitable for safe swimming" },
                { name: "Rock Formations", desc: "Dramatic volcanic rocks perfect for exploration" },
                { name: "Facilities", desc: "Basic amenities with minimal commercialization" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Visitor Information</h2>
            <ul className="tips">
              <li><strong>Best Time to Visit:</strong> October to March (pleasant weather)</li>
              <li><strong>Timings:</strong> Accessible all day, best at low tide</li>
              <li><strong>Entry Fee:</strong> No charge, open to public</li>
              <li><strong>Location:</strong> Western coast of Diu, 5 km from city center</li>
              <li><strong>Parking:</strong> Available near the beach entrance</li>
            </ul>
          </section>

          <section className="tips">
            <h2 className="section-title">Things to Do</h2>
            <ul>
              <li><strong>Sunrise/Sunset Viewing:</strong> Spectacular colors over the Arabian Sea</li>
              <li><strong>Temple Visit:</strong> Climb to Jallandhar Shrine for panoramic views</li>
              <li><strong>Beachcombing:</strong> Discover shells and interesting rock formations</li>
              <li><strong>Photography:</strong> Capture the dramatic coastal scenery</li>
              <li><strong>Picnics:</strong> Enjoy meals with ocean views (carry-in, carry-out)</li>
            </ul>
          </section>

          <div className="cta">
            <h2>Discover Diu's Hidden Gem</h2>
            <p>Whether you're seeking solitude, natural beauty, or a glimpse into local mythology, Jallandhar Beach offers an authentic coastal experience away from the crowds.</p>
            <p><strong>Plan your peaceful beach getaway today!</strong></p>
          </div>
        </div>

        <Feedback placename="jallandhar" />
      </div>
    </div>
  );
};

export default Jallandhar;