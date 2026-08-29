import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import "./AddRemovePublicToilets.css";

const AddRemovePublicToilets = () => {
  const currState = useLocation();
  const serviceType = currState.state?.service || "unknown";

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [toilets, setToilets] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  const isAdd = serviceType === "addPublicToilets";
  const successMessage = isAdd ? "added" : "removed";

  // In remove mode, load the existing list so the admin picks a real
  // entry (by id) instead of retyping a name that might not match exactly.
  useEffect(() => {
    if (!isAdd) {
      api.get("/admin_activity/publicToilets")
        .then((res) => setToilets(res.data))
        .catch((err) => console.error("Error fetching public toilets:", err));
    }
  }, [isAdd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!isAdd && !window.confirm("Are you sure you want to remove this public toilet?")) {
      return;
    }

    try {
      if (isAdd) {
        await api.post("/admin_activity/addPublicToilets", { name, latitude: lat, longitude: lng });
      } else {
        if (!selectedId) {
          setMessage("Please select a toilet to remove.");
          return;
        }
        await api.post("/admin_activity/removePublicToilets", { id: selectedId });
      }

      setMessage(`Public Toilet ${successMessage} successfully! 🚻`);
      setName("");
      setLat("");
      setLng("");
      setSelectedId("");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="admin-transport-wrapper">
      <div className="admin_activity_wrapper">
        <form className="admin-activity-form" onSubmit={handleSubmit}>
          <h2>{isAdd ? "Add Public Toilet" : "Remove Public Toilet"}</h2>

          {isAdd ? (
            <>
              <div className="input-group">
                <input
                  name="adminPublicToiletName"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  name="adminPublicToiletLat"
                  type="number"
                  placeholder="Latitude"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  name="adminPublicToiletLng"
                  type="number"
                  placeholder="Longitude"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div className="input-group">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                required
              >
                <option value="" disabled>Select a public toilet</option>
                {toilets.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          {message && <p className="message">{message}</p>}

          <button type="submit" className="adminPublicToiletSubmit">
            {isAdd ? "Add Public Toilet" : "Remove Public Toilet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRemovePublicToilets;
