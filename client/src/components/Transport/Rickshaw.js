import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LocalBuses.css";

const Rickshaw = () => {
  const { isAdmin } = useAuth();
  const [busData, setBusData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRickshaw, setNewRickshaw] = useState({
    driver_name: "",
    phone: "",
  });

  useEffect(() => {
    api
      .get("/transport/rickshaw")
      .then((response) => setBusData(response.data))
      .catch((error) => console.error("Error fetching rickshaw details:", error));
  }, []);

  const handleRemoveRickshaw = (rickshaw) => {
    const confirmDelete = window.confirm(`Remove rickshaw owner "${rickshaw.driver_name}"?`);
    if (!confirmDelete) return;

    api
      .post("/admin_activity/removeRickshaw", { id: rickshaw.id })
      .then(() => {
        window.alert("Rickshaw removed successfully!");
        setBusData((prev) => prev.filter((item) => item.id !== rickshaw.id));
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong while removing the rickshaw.");
      });
  };

  const handleAddRickshaw = () => {
    const { driver_name, phone } = newRickshaw;

    if (!driver_name || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    api
      .post("/admin_activity/addRickshaw", newRickshaw)
      .then((response) => {
        alert("Rickshaw added successfully!");
        setBusData([...busData, response.data]);
        setShowModal(false);
        setNewRickshaw({ driver_name: "", phone: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding rickshaw.");
      });
  };

  return (
    <div className="buses-page-wrapper">
      <div className="details-container">
        <h2>Rickshaw Details</h2>
        {busData.length > 0 ? (
          <div className="table-wrapper">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Owner Name</th>
                  <th>Contact</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {busData.map((rickshaw, index) => (
                  <tr key={rickshaw.id ?? index}>
                    <td>{rickshaw.driver_name}</td>
                    <td>{rickshaw.phone}</td>
                    {isAdmin && (
                      <td>
                        <button  className="adminRemoveRickshawBtn" onClick={() => handleRemoveRickshaw(rickshaw)}>Remove</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No Rickshaw details available.</p>
        )}

        {isAdmin && (
          <div className="add-localbus-btn-wrapper">
            <button className="add-localbus-btn" onClick={() => setShowModal(true)}>
              + Add Rickshaw
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Rickshaw</h2>

            <input
              type="text"
              placeholder="Owner Name"
              value={newRickshaw.driver_name}
              onChange={(e) => setNewRickshaw({ ...newRickshaw, driver_name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={newRickshaw.phone}
              onChange={(e) => setNewRickshaw({ ...newRickshaw, phone: e.target.value })}
            />

            <div className="modal-buttons">
              <button onClick={handleAddRickshaw}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rickshaw;
