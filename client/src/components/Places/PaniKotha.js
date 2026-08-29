import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/f11.jpg',
  '/assets/f12.jpg',
  '/assets/f13.jpg',
  '/assets/f14.jpg',
  '/assets/f15.jpg',
  '/assets/f16.jpg',
  '/assets/f17.jpg',
  '/assets/f18.jpg',
];

const PaniKotha = () => {
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
                alt={`Pani Kotha Fort ${index + 1}`}
              />
            ))}
          </div>
        </div>
      <div className="places-page-wrapper">
        

        <nav className="places-links">
          <ul>
            <li><Link to="/places/nagoa" className={location.pathname === "/places/nagoa" ? "active-link" : ""}>Beaches</Link></li>
            <li><Link to="/places/PaniKotha" className={location.pathname === "/places/PaniKotha" ? "active-link" : ""}>Forts</Link></li>
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
            <h1 className="placesh1">Fortim do Mar (Pani Kotha)</h1>
            <p className="places-intro">The Island Fortress of Diu</p>
          </header>

          <section>
            <p className="intro">
              Built in 1541 AD during Portuguese rule, Fortim do Mar (literally "Fort of the Sea") stands as a remarkable example of 16th century maritime military architecture. This isolated island fortress, locally known as Pani Kotha ("Water House"), has guarded Diu's harbor for nearly five centuries.
            </p>
            <div className="highlight-box">
              <p>The fortress played a crucial role in the 1546 Siege of Diu when Portuguese forces withstood months of Ottoman attacks, thanks to its strategic position controlling all ship movements.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Historical Significance</h2>
            <div className="why-visit">
              {[
                { title: "Portuguese Era", text: "Built to protect valuable spice trade routes in 1541 AD" },
                { title: "Military Strategy", text: "Withstood the 1546 Ottoman siege for months" },
                { title: "Original Structure", text: "Originally a watchtower built by Malik Ayaz" },
                { title: "UNESCO Nomination", text: "Part of Diu's Portuguese-era fortifications nomination" },
                { title: "Modern Role", text: "Still houses an operational lighthouse since 1864" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Architectural Features</h2>
            <div className="attractions">
              {[
                { name: "Hexagonal Design", desc: "3-meter-thick laterite stone walls in unique shape" },
                { name: "Central Bastion", desc: "Houses the operational lighthouse with green beams" },
                { name: "Chapel", desc: "Dedicated to Our Lady of the Sea (1638)" },
                { name: "Water Systems", desc: "Rainwater collection cisterns (origin of 'Pani Kotha' name)" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Visitor Experience</h2>
            <ul className="tips">
              <li><strong>Boat Ride:</strong> Scenic 15-minute journey from Diu Jetty (₹50 per person)</li>
              <li><strong>Lighthouse:</strong> Climb for panoramic views of Diu coastline</li>
              <li><strong>Chapel Visit:</strong> See the original 17th century Portuguese altar</li>
              <li><strong>Best Time:</strong> Late afternoon for sunset views from western ramparts</li>
              <li><strong>Night Viewing:</strong> Special illuminated viewing until 9:00 PM</li>
            </ul>
          </section>

          <section>
            <h2 className="section-title">Visitor Information</h2>
            <div className="attractions">
              {[
                { name: "Timings", desc: "9:00 AM to 5:30 PM daily (extended to 9:00 PM for night viewing)" },
                { name: "Boat Schedule", desc: "Departs every 30 minutes from Diu Jetty" },
                { name: "Entry Fee", desc: "₹25 for Indians, ₹300 for foreigners" },
                { name: "Location", desc: "1.5 km offshore from Diu Town (20.7125° N, 70.9875° E)" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tips">
            <h2 className="section-title">Nearby Attractions</h2>
            <div className="attractions">
              {[
                { name: "Diu Fort", desc: "1.2 km inland - Massive Portuguese citadel" },
                { name: "Naida Caves", desc: "800m from jetty - Spectacular rock formations" },
                { name: "Diu Museum", desc: "1 km from jetty - Portuguese-era artifacts" },
                { name: "Gangeshwar Temple", desc: "3 km away - Unique seaside Shiva temple" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="cta">
            <h2>Step Into Portuguese Maritime History</h2>
            <p>Pani Kotha offers a unique opportunity to experience a perfectly preserved island fortress that has stood guard over Diu for centuries. The boat ride, historic atmosphere, and stunning views make this a must-visit destination.</p>
            <p><strong>Plan your visit to this extraordinary piece of living history today!</strong></p>
          </div>
        </div>

        <Feedback placename="paniKotha" />
      </div>
    </div>
  );
};

export default PaniKotha;