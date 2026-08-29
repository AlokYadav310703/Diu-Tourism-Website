import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/go1.png',
  '/assets/go7.jpeg',
  '/assets/jh2.jpg',
  '/assets/go9.jpg',
];

const Gomtimata = () => {
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
              alt={`Gomtimata Beach ${index + 1}`}
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
            <h1 className="placesh1">Gomtimata Beach</h1>
            <p className="places-intro">Diu's Secluded Coastal Sanctuary</p>
          </header>

          <section>
            <p className="intro">
              Nestled in Vanakbara village, Gomtimata Beach is a 5 km stretch of pristine shoreline offering one of Diu's most peaceful retreats. Named after the Gomtimata Temple on its shores, this secluded beach combines natural beauty with spiritual significance, featuring white sands, dramatic coral rocks, and breathtaking sunsets.
            </p>
            <div className="highlight-box">
              <p>The beach's untouched beauty and religious importance make it a unique destination where visitors can experience both natural tranquility and cultural heritage.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title">Beach Highlights</h2>
            <div className="why-visit">
              {[
                { title: "Secluded Beauty", text: "Pristine 5 km shoreline away from crowds" },
                { title: "Natural Features", text: "White sands, coral rocks, and rolling waves" },
                { title: "Sunset Views", text: "Spectacular orange-pink skies over the Arabian Sea" },
                { title: "Spiritual Significance", text: "Home to the sacred Gomtimata Temple" },
                { title: "Shell Collection", text: "Excellent spot for finding unique seashells" }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">Gomtimata Temple</h2>
            <div className="attractions">
              {[
                { name: "Deity", desc: "Dedicated to Goddess Gomti, a form of Durga" },
                { name: "Location", desc: "Situated right on the beach shoreline" },
                { name: "Significance", desc: "Important pilgrimage site for local fishermen" },
                { name: "Architecture", desc: "Simple white structure blending with beach" }
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
              <li><strong>Timings:</strong> Open all day, best visited at low tide</li>
              <li><strong>Swimming:</strong> Not advised due to strong tides and rocks</li>
              <li><strong>Facilities:</strong> Basic amenities available in Vanakbara village</li>
              <li><strong>Location:</strong> 7 km from Diu town center</li>
            </ul>
          </section>

          <section className="tips">
            <h2 className="section-title">Things to Do</h2>
            <ul>
              <li><strong>Beachcombing:</strong> Explore the shoreline for shells and coral</li>
              <li><strong>Sunset Photography:</strong> Capture stunning evening colors</li>
              <li><strong>Temple Visit:</strong> Experience the spiritual atmosphere</li>
              <li><strong>Coastal Walks:</strong> Enjoy long walks along the 5 km beach</li>
              <li><strong>Birdwatching:</strong> Spot coastal and migratory birds</li>
            </ul>
          </section>

          <div className="cta">
            <h2>Discover Diu's Hidden Gem</h2>
            <p>Whether you seek solitude, spiritual connection, or simply want to experience one of Diu's most unspoiled beaches, Gomtimata offers a perfect escape from the ordinary.</p>
            <p><strong>Plan your peaceful beach retreat today!</strong></p>
          </div>
        </div>

        <Feedback placename="gomtimata" />
      </div>
    </div>
  );
};

export default Gomtimata;