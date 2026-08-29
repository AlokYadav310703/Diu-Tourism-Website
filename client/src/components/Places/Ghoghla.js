import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/gh1.png',
  '/assets/gh2.png',
  '/assets/gh3.jpg',
  '/assets/gh4.jpg',
  '/assets/gh5.jpg'
];

const Ghoghla = () => {
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
                alt={`Ghoghla Beach ${index + 1}`}
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
            <h1 className="placesh1">Ghoghla Beach</h1>
            <p className="places-intro">Diu's Premier Blue Flag Certified Beach</p>
          </header>

          <section>
            <p className="intro">
              As the largest beach in Diu and an aspirant for the prestigious International Blue Flag Certification, Ghoghla Beach offers world-class amenities amidst pristine natural beauty. Situated at the entrance to the Union Territory, this golden-sand paradise combines safety, recreation, and environmental excellence.
            </p>
            <div className="highlight-box">
              <p>With its gentle waves, vast tidal area, and top-tier facilities, Ghoghla Beach sets the standard for sustainable beach tourism in India.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Beach Features</h2>
            <div className="why-visit">
              {[
                { title: "Blue Flag Standards", text: "Meeting international environmental and safety benchmarks" },
                { title: "Safe Swimming Zones", text: "Designated areas with trained lifeguards on duty" },
                { title: "Premium Facilities", text: "Bio-toilets, showers, drinking water stations" },
                { title: "Recreational Spaces", text: "Open gym, children's park, and landscaped gardens" },
                { title: "Year-Round Appeal", text: "Optimum water temperatures throughout seasons" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Visitor Amenities</h2>
            <div className="attractions">
              {[
                { name: "Hygiene Facilities", desc: "Ergonomic bio-toilet blocks and change rooms" },
                { name: "Safety Measures", desc: "24/7 security and trained lifeguards" },
                { name: "Accessibility", desc: "Wheelchair-friendly pathways and ramps" },
                { name: "Dining Options", desc: "Beachside cafes serving local cuisine" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Activities</h2>
            <ul className="tips">
              <li><strong>Leisure Swimming:</strong> In designated safe zones</li>
              <li><strong>Beach Walks:</strong> Explore the vast tidal area</li>
              <li><strong>Fitness:</strong> Use the open-air gym equipment</li>
              <li><strong>Family Time:</strong> Children's play area available</li>
              <li><strong>Photography:</strong> Capture stunning coastal views</li>
            </ul>
          </section>

          <section className="tips">
            <h2 className="section-title">Visitor Information</h2>
            <div className="attractions">
              {[
                { name: "Best Time to Visit", desc: "October to March for ideal weather" },
                { name: "Operating Hours", desc: "6:00 AM to 6:00 PM daily" },
                { name: "Entry Fee", desc: "Free access to all facilities" },
                { name: "Location", desc: "At Diu's entrance, 2km from city center" }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="cta">
            <h2>Experience Diu's Finest Beach</h2>
            <p>Ghoghla Beach offers the perfect combination of natural beauty, modern amenities, and environmental responsibility - making it ideal for families, solo travelers, and everyone in between.</p>
            <p><strong>Plan your visit to this award-winning beach destination today!</strong></p>
          </div>
        </div>

        <Feedback placename="ghoghla" />
      </div>
    </div>
  );
};

export default Ghoghla;