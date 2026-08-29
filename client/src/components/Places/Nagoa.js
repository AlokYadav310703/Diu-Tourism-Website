import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/Nagoa1.jpg',
  '/assets/Nagoa2.jpg',
  '/assets/chakratirth.jpg',
  '/assets/ghoghla.png'
];

const Nagoa = () => {
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
            <li><Link to="/places/nagoa" className={location.pathname === "/places/nagoa" ? "active-link" : ""}>Nagoa Beach</Link></li>
            <li><Link to="/places/ghoghla" className={location.pathname === "/places/ghoghla" ? "active-link" : ""}>Ghoghla Beach</Link></li>
            <li><Link to="/places/chakratirth" className={location.pathname === "/places/chakratirth" ? "active-link" : ""}>Chakratirth Beach</Link></li>
            <li><Link to="/places/jallandhar" className={location.pathname === "/places/jallandhar" ? "active-link" : ""}>Jallandhar Beach</Link></li>
            <li><Link to="/places/gomtimata" className={location.pathname === "/places/gomtimata" ? "active-link" : ""}>Gomtimata Beach</Link></li>
          </ul>
        </nav>

        <div className="places-details">
          <header>
            <h1 className="placesh1">Discover the Serene Beauty of Nagoa Beach, Diu</h1>
            <p className="places-intro">A Hidden Gem on India's Western Coast</p>
          </header>

          <section>
            <p className="intro">Just 8 km from Diu's town center, Nagoa Beach is a breathtaking semi-circular bay that blends natural beauty, adventure, and tranquility. Famous for its powdery white sands and calm turquoise waters, this beach offers the perfect escape for sun-seekers, swimmers, and those looking to unwind in a peaceful seaside setting.</p>
            <div className="highlight-box">
              <p>With its rare Hoka palm trees, gentle waves, and Goa-like vibes without the crowds, Nagoa Beach is Diu's best-kept coastal secret.</p>
            </div>
          </section>

          <section>
            <h2>Why Visit Nagoa Beach?</h2>
            <div className="why-visit">
              {[
                { title: "Pristine & Peaceful", text: "One of the cleanest beaches in Diu, ideal for relaxation with its uncrowded shores and soothing atmosphere." },
                { title: "Picturesque Landscape", text: "Lined with rare Hoka palm trees that create a dreamy tropical backdrop perfect for photography." },
                { title: "Gentle Waves", text: "Safe for swimming and wading, making it perfect for families with children." },
                { title: "Water Sports Fun", text: "Try jet skiing, banana boat rides, and parasailing for an adrenaline rush on the water." },
                { title: "Goa-like Vibes", text: "All the beauty of Goa's beaches, but with fewer crowds and more authentic charm." }
              ].map((item, index) => (
                <div className="benefit-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Nearby Attractions</h2>
            <div className="attractions">
              {[
                { name: "Diu Fort", desc: "6 km away - A historic Portuguese-era fortress with stunning panoramic sea views." },
                { name: "Naida Caves", desc: "7 km away - A fascinating network of volcanic rock formations with unique light patterns." },
                { name: "Gangeshwar Temple", desc: "5 km away - A unique Shiva temple where natural waves wash over the five lingams." },
                { name: "St. Paul's Church", desc: "7 km away - A beautifully preserved 17th-century Portuguese church with remarkable architecture." }
              ].map((place, index) => (
                <div className="attraction-item" key={index}>
                  <h3>{place.name}</h3>
                  <p>{place.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section >
            <h2>Best Time to Visit</h2>
            <p>The ideal time is <strong>October to March</strong>, when the weather is pleasantly cool (20-30°C) and perfect for beach activities. Monsoon season (June-September) brings lush greenery but limited water sports.</p>
          </section>

          <section className="tips">
            <h2>Travel Tips</h2>
            <ul>
              <li><strong>Sunset Magic:</strong> Stay till evening for breathtaking sunsets over the Arabian Sea - the golden hour is spectacular for photography.</li>
              <li><strong>Local Eats:</strong> Try fresh seafood at nearby shacks or visit Diu town for Portuguese-inspired cuisine like seafood curries and bebinca (traditional Goan dessert).</li>
              <li><strong>Stay Options:</strong> Choose from beachside resorts, cozy homestays, or budget-friendly guesthouses - many offer sea views.</li>
              <li><strong>Footwear:</strong> The sand can get hot during midday - carry flip flops or sandals.</li>
              <li><strong>Safety:</strong> While generally safe, avoid swimming during high tide or if red flags are posted.</li>
            </ul>
          </section>

          <div className="cta">
            <h2>Plan Your Perfect Beach Getaway</h2>
            <p>Whether you're looking for a relaxing retreat, a fun-filled day by the sea, or a blend of both, Nagoa Beach promises an unforgettable experience.</p>
            <p><strong>Visit today and discover Diu's coastal paradise!</strong></p>
          </div>
        </div>

        <Feedback placename="nagoa" />
      </div>
    </div>
  );
};

export default Nagoa;
