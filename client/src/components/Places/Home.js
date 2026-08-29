import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const exploreCards = [
    {
      title: "Pristine Beaches",
      description: "Discover Diu's stunning coastline with golden sands and clear waters",
      link: "/places/nagoa",
      image: "../assets/nagoa.jpg"
    },

    {
      title: "Historic Forts",
      description: "Explore centuries-old Portuguese forts and colonial architecture",
      link: "/places/DiuFort",
      image: "../assets/f15.jpg"
    },
    {
      title: "Sacred Temples",
      description: "Visit ancient temples with unique architecture and spiritual significance",
      link: "/places/temples",
      image: "../assets/temple1.png"
    },
    {
      title: "Local Cuisine",
      description: "Savor the flavors of authentic Diu seafood and Portuguese-inspired dishes",
      link: "/restaurants",
      image: "../assets/res.jpg"
    }
  ];

  const activities = [
    { name: "Water Sports", icon: "🏄" },
    { name: "Heritage Walks", icon: "🚶" },
    { name: "Island Tours", icon: "🚤" },
    { name: "Sunset Views", icon: "🌅" },
    { name: "Local Markets", icon: "🛍️" }
  ];

  return (

    <div className="home-page-wrapper">
      <div className="home-page">
        {/* Hero Section */}
        <section className="main-page-section">
          <div className="hero-content">
            <h1>Discover the Hidden Gem of India</h1>
            <p>Experience the perfect blend of sun, sand, and history in beautiful Diu</p>
            <Link to="/places/nagoa" className="explore-button">Explore Diu</Link>
          </div>
        </section>

        {/* Introduction */}
        <section className="intro-section">
          <div className="container">
            <h2>Welcome to Diu</h2>
            <p>
              Diu, a small island territory off the southern coast of Gujarat's Kathiawar peninsula,
              offers a unique blend of Portuguese heritage and coastal beauty. With its pristine beaches,
              historic forts, and laid-back atmosphere, Diu provides the perfect escape from the hustle
              of city life. The island's tropical climate, palm-fringed shores, and colonial architecture
              create a Mediterranean-like charm that's unlike anywhere else in India.
            </p>
          </div>
        </section>

        {/* Explore Cards */}
        <section className="explore-section">
          <div className="container">
            <h2>Explore Diu</h2>
            <div className="explore-grid">
              {exploreCards.map((card, index) => (
                <Link to={card.link} key={index} className="explore-card">
                  <div className="card-image" style={{ backgroundImage: `url(${card.image})` }} loading="lazy"></div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="card-link">Discover more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="activities-section">
          <div className="container">
            <h2>Popular Activities</h2>
            <div className="activities-grid">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <h3>{activity.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready for Your Diu Adventure?</h2>
            <p>Plan your perfect trip with our curated guides and local tips</p>
            <div className="cta-buttons">
              <Link to="/eventPlanner" className="cta-button primary">Browse Destinations</Link>
              <Link to="/contactUs" className="cta-button secondary">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>

    </div>

  );
};

export default Home;