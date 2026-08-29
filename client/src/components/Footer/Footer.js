import Weather from './Weather';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Footer.css';

const Footer = () => {
  const { isAdmin } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2>About Diu</h2>
          <p>
            Discover the rich history, beautiful beaches, and vibrant culture of Diu.
            Plan your perfect getaway with us. <br /> Explore ancient forts, savor local seafood, and experience the serene charm of this coastal paradise in Diu.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/places/nagoa">Attractions</Link></li>
            <li><Link to="/contactUs">ContactUs</Link></li>
            <li name="DispNearUtilityBtn"><Link to="/DispNearUtility">Nearest Utility</Link></li>

            {isAdmin && (
              <li name="adminActivitiesBtn"><Link to="/AdminActivities">Admin</Link></li>
            )}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h2>Services</h2>
          <ul>
            <li><Link to="/transport/buses" name="localBusDetailsFooter">Local Buses</Link></li>
            <li><Link to="/transport/statebuses">State Buses</Link></li>
            <li><Link to="/transport/rickshaw">Rickshaw Details</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
          </ul>
        </div>

        {/* Weather Section */}
        <div className="footer-section">
          <h2>Weather</h2>
          <Weather />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
