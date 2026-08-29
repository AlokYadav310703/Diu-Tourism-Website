import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Restaurants.css";

const Restaurants = () => {
  const { isAdmin } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
    type: "",
    open_time: "",
    close_time: "",
  });

  useEffect(() => {
    api
      .get("/restaurant")
      .then((response) => setRestaurants(response.data))
      .catch((error) =>
        console.error("Error fetching restaurant details:", error)
      );
  }, []);

  const handleRemoveRestaurant = (restaurant) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove restaurant "${restaurant.name}"?`);
    if (!confirmDelete) return;

    api
      .post("/admin_activity/removeRestaurant", { id: restaurant.id })
      .then(() => {
        window.alert(`Restaurant "${restaurant.name}" removed successfully!`);
        setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id));
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong while removing the restaurant.");
      });
  };

  const handleAddRestaurant = () => {
    const { name, address, phone } = newRestaurant;

    if (!name || !address || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    api
      .post("/admin_activity/addRestaurant", newRestaurant)
      .then((response) => {
        alert("Restaurant added successfully!");
        setRestaurants([...restaurants, response.data]);
        setShowModal(false);
        setNewRestaurant({ name: "", address: "", phone: "", type: "", open_time: "", close_time: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding restaurant.");
      });
  };

  return (
    <div className="restaurants-page-wrapper">
      <Navbar />
      <div className="details-container">
        <h2>Restaurant Details</h2>
        {message && <p className="message">{message}</p>}
        {restaurants.length > 0 ? (
          <div className="cards-wrapper">
            {restaurants.map((restaurant, index) => (
              <div className="restaurant-card" key={restaurant.id ?? index}>
                <h3>{restaurant.name}</h3>
                <p><span>Address:</span> {restaurant.address}</p>
                <p><span>Phone:</span> {restaurant.phone}</p>
                <p><span>Type:</span> {restaurant.type}</p>
                <p><span>Opening Hours:</span> {restaurant.open_time} - {restaurant.close_time}</p>
                {isAdmin && (
                  <div className="remove-restaurants-card">
                    <button
                      id="admin-remove-restaurants-btn"
                      onClick={() => handleRemoveRestaurant(restaurant)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <div
                className="restaurant-card add-restaurant-card"
                onClick={() => setShowModal(true)}
              >
                <h3>+ Add Restaurant</h3>
              </div>
            )}
          </div>
        ) : (
          <p className="no-data">No restaurant details available.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Restaurant</h2>

            <input
              type="text"
              placeholder="Restaurant Name"
              value={newRestaurant.name}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address"
              value={newRestaurant.address}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={newRestaurant.phone}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="type"
              value={newRestaurant.type}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, type: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="Open Time"
              value={newRestaurant.open_time}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, open_time: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="Close Time"
              value={newRestaurant.close_time}
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, close_time: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button onClick={handleAddRestaurant}>Add Restaurant</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Restaurants;
