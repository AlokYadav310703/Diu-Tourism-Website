import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LocalBuses.css";

// This page was entirely commented out in the original app — no live
// flights UI existed yet. Built fresh here, matching the same
// admin-managed add/remove pattern already used by StateBuses.js and
// LocalBuses.js (see the chat explanation for why this is admin-entered
// rather than auto-fetched from the internet — there's no free, reliable
// API covering Diu-specific flight routes).
const Flights = () => {
  const { isAdmin } = useAuth();
  const [flightData, setFlightData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFlight, setNewFlight] = useState({
    from_location: "",
    to_location: "",
    flight_time: "",
    flight_name: "",
  });

  useEffect(() => {
    api
      .get("/transport/flight")
      .then((response) => setFlightData(response.data))
      .catch((error) => console.error("Error fetching flight details:", error));
  }, []);

  const handleRemoveFlight = (flight) => {
    const confirmDelete = window.confirm(`Remove flight "${flight.flight_name}" from "${flight.from_location}" to "${flight.to_location}"?`);
    if (!confirmDelete) return;

    api
      .post("/admin_activity/removeFlight", { id: flight.id })
      .then(() => {
        window.alert("Flight removed successfully!");
        setFlightData((prev) => prev.filter((item) => item.id !== flight.id));
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong while removing the flight.");
      });
  };

  const handleAddFlight = () => {
    const { from_location, to_location, flight_time, flight_name } = newFlight;

    if (!from_location || !to_location || !flight_time || !flight_name) {
      alert("Please fill in all fields.");
      return;
    }

    api
      .post("/admin_activity/addFlight", newFlight)
      .then((response) => {
        alert("Flight added successfully!");
        setFlightData([...flightData, response.data]);
        setShowModal(false);
        setNewFlight({ from_location: "", to_location: "", flight_time: "", flight_name: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding flight.");
      });
  };

  return (
    <div className="buses-page-wrapper">
      <div className="details-container">
        <h2>Flight Details</h2>
        {flightData.length > 0 ? (
          <div className="table-wrapper">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Airline</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Time</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {flightData.map((flight, index) => (
                  <tr key={flight.id ?? index}>
                    <td>{flight.flight_name}</td>
                    <td>{flight.from_location}</td>
                    <td>{flight.to_location}</td>
                    <td>{flight.flight_time}</td>
                    {isAdmin && (
                      <td>
                        <button onClick={() => handleRemoveFlight(flight)}>Remove</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No flight details available yet.</p>
        )}

        {isAdmin && (
          <div className="add-localbus-btn-wrapper">
            <button className="add-localbus-btn" onClick={() => setShowModal(true)}>
              + Add Flight
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Flight</h2>

            <input
              type="text"
              placeholder="Airline / Flight Name"
              value={newFlight.flight_name}
              onChange={(e) => setNewFlight({ ...newFlight, flight_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="From Location"
              value={newFlight.from_location}
              onChange={(e) => setNewFlight({ ...newFlight, from_location: e.target.value })}
            />
            <input
              type="text"
              placeholder="To Location"
              value={newFlight.to_location}
              onChange={(e) => setNewFlight({ ...newFlight, to_location: e.target.value })}
            />
            <input
              type="time"
              placeholder="Flight Time"
              value={newFlight.flight_time}
              onChange={(e) => setNewFlight({ ...newFlight, flight_time: e.target.value })}
            />

            <div className="modal-buttons">
              <button onClick={handleAddFlight}>Add Flight</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
