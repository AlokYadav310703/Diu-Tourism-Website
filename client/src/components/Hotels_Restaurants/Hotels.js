import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Hotels.css";

const Hotels = () => {
  const { isAdmin } = useAuth();
  const [hotelsData, setHotelsData] = useState([]);
  const [message, setMessage] = useState("");
  // const [message] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    api
      .get("/hotel")
      .then((response) => setHotelsData(response.data))
      .catch((error) => console.error("Error fetching hotels details:", error));
  }, []);

  const handleRemoveHotelClick = (hotel) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove hotel "${hotel.name}"?`);
    if (!confirmDelete) return;

    api
      .post("/admin_activity/removeHotel", { id: hotel.id })
      .then(() => {
        window.alert(`Hotel "${hotel.name}" removed successfully!`);
        setHotelsData((prev) => prev.filter((h) => h.id !== hotel.id));
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong while removing the hotel.");
      });
  };

  const handleAddHotelSubmit = () => {
    const { name, address, phone, website } = newHotel;

    if (!name || !address || !phone || !website) {
      alert("Please fill in all fields.");
      return;
    }

    api
      .post("/admin_activity/addHotel", newHotel)
      .then((response) => {
        alert("Hotel added successfully!");
        setHotelsData([...hotelsData, response.data]);
        setShowModal(false);
        setNewHotel({ name: "", address: "", phone: "", website: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding hotel.");
      });
  };

  return (
    <div className="hotels-page-wrapper">
      <Navbar />
      <div className="details-container">
        <h2>Hotel Details</h2>
        {message && <p className="message">{message}</p>}
        {hotelsData.length > 0 ? (
          <div className="cards-wrapper">
            {hotelsData.map((hotel, index) => (
              <div className="hotel-card" key={hotel.id ?? index}>
                <h3>{hotel.name}</h3>
                <p><span>Address:</span> {hotel.address}</p>
                <p><span>Phone:</span> {hotel.phone}</p>
                <a href={hotel.website} target="_blank" rel="noopener noreferrer">Visit Site</a>
                {isAdmin && (
                  <div
                    className="remove-hotel-card"
                    onClick={() => handleRemoveHotelClick(hotel)}
                  >
                    <button id="admin-remove-hotel-btn">Remove</button>
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="hotel-card add-hotel-card" onClick={() => setShowModal(true)}>
                <h3>+ Add Hotel</h3>
              </div>
            )}
          </div>
        ) : (
          <p className="no-data">No hotel details available.</p>
        )}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Hotel</h2>

            <input
              type="text"
              placeholder="Hotel Name"
              value={newHotel.name}
              onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Address"
              value={newHotel.address}
              onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
            />

            <input
              type="number"
              maxLength={12}
              placeholder="Phone"
              value={newHotel.phone}
              onChange={(e) => setNewHotel({ ...newHotel, phone: e.target.value })}
            />

            <input
              type="text"
              placeholder="Website"
              value={newHotel.website}
              onChange={(e) => setNewHotel({ ...newHotel, website: e.target.value })}
            />

            <div className="modal-buttons">
              <button onClick={handleAddHotelSubmit}>Add Hotel</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Hotels;
