import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LocalBuses.css";

const LocalBuses = () => {
  const { isAdmin } = useAuth();
  const [busData, setBusData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("both"); // "from", "to", "both"
  const [newBus, setNewBus] = useState({
    from_location: "",
    to_location: "",
    bus_time: "",
    cost: ""
  });

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch bus data
  useEffect(() => {
    setIsLoading(true);
    api
      .get("/transport/localbus")
      .then((response) => {
        setBusData(response.data);
        setFilteredData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bus details:", error);
        setIsLoading(false);
      });
  }, []);

  // Search filter function
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(busData);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase().trim();
    const filtered = busData.filter((bus) => {
      const fromMatch = bus.from_location?.toLowerCase().includes(searchTermLower);
      const toMatch = bus.to_location?.toLowerCase().includes(searchTermLower);
      
      if (searchType === "from") return fromMatch;
      if (searchType === "to") return toMatch;
      return fromMatch || toMatch; // "both"
    });

    setFilteredData(filtered);
  }, [searchTerm, busData, searchType]);

  const handleRemoveLocalBus = (bus) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the bus from "${bus.from_location}" to "${bus.to_location}"?`
    );
    if (!confirmDelete) return;

    api
      .post("/admin_activity/removeLocalBus", { id: bus.id })
      .then(() => {
        alert("Bus removed successfully!");
        setBusData((prev) => prev.filter((item) => item.id !== bus.id));
        setFilteredData((prev) => prev.filter((item) => item.id !== bus.id));
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong while removing the bus.");
      });
  };

  const handleAddLocalBus = () => {
    const { from_location, to_location, bus_time, cost } = newBus;

    if (!from_location || !to_location || !bus_time || !cost) {
      alert("Please fill in all fields.");
      return;
    }

    api
      .post("/admin_activity/addLocalBus", newBus)
      .then((response) => {
        alert("Local bus added successfully!");
        const updatedData = [...busData, response.data];
        setBusData(updatedData);
        setFilteredData(updatedData);
        setShowModal(false);
        setNewBus({ 
          from_location: "", 
          to_location: "", 
          bus_time: "", 
          cost: "" 
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding bus.");
      });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Get time status indicator
  const getTimeStatus = (busTime) => {
    const now = new Date();
    const [hours, minutes] = busTime.split(':').map(Number);
    
    const busDateTime = new Date(now);
    busDateTime.setHours(hours, minutes, 0);
    
    // If bus time is in the past, add a day
    if (busDateTime < now) {
      busDateTime.setDate(busDateTime.getDate() + 1);
    }
    
    const timeDiff = busDateTime - now;
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (timeDiff < 0) {
      return { status: 'passed', label: 'Passed', color: '#6b7280' };
    } else if (timeDiff < 3600000) { // Less than 1 hour
      return { 
        status: 'soon', 
        label: `🟢 In ${minutesDiff}m`, 
        color: '#22c55e' 
      };
    } else if (timeDiff < 7200000) { // Less than 2 hours
      return { 
        status: 'upcoming', 
        label: `🟡 In ${hoursDiff}h ${minutesDiff}m`, 
        color: '#f59e0b' 
      };
    } else {
      return { 
        status: 'scheduled', 
        label: `⏰ In ${hoursDiff}h ${minutesDiff}m`, 
        color: '#3b82f6' 
      };
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchType("both");
  };

  return (
    <div className="local-buses-container">
      {/* Real-time Clock Display */}
      <div className="clock-wrapper">
        <div className="clock-display">
          <span className="clock-icon">🕐</span>
          <span className="clock-time">{formatTime(currentTime)}</span>
          <span className="clock-date">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="buses-content">
        <div className="buses-header">
          <h2 className="buses-title">🚌 Local Buses Schedule</h2>
          <div className="buses-count">
            <span className="count-badge">
              {filteredData.length} of {busData.length} Buses
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={clearSearch}>
                ✕
              </button>
            )}
          </div>
          
          <div className="search-filters">
            <button
              className={`filter-btn ${searchType === 'both' ? 'active' : ''}`}
              onClick={() => setSearchType('both')}
            >
              All Locations
            </button>
            <button
              className={`filter-btn ${searchType === 'from' ? 'active' : ''}`}
              onClick={() => setSearchType('from')}
            >
              From
            </button>
            <button
              className={`filter-btn ${searchType === 'to' ? 'active' : ''}`}
              onClick={() => setSearchType('to')}
            >
              To
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading bus schedules...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="table-responsive">
            <table className="buses-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Timing</th>
                  <th>Status</th>
                  <th>Cost</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((bus, index) => {
                  const timeStatus = getTimeStatus(bus.bus_time);
                  const isSoon = timeStatus.status === 'soon';
                  
                  return (
                    <tr 
                      key={bus.id ?? index} 
                      className={`bus-row ${isSoon ? 'active-bus' : ''}`}
                      style={{ 
                        animationDelay: `${index * 0.05}s`
                      }}
                    >
                      <td>
                        <span className="location-icon">📍</span>
                        {bus.from_location}
                      </td>
                      <td>
                        <span className="location-icon">🏁</span>
                        {bus.to_location}
                      </td>
                      <td className="time-cell">{bus.bus_time}</td>
                      <td>
                        <span 
                          className={`status-badge status-${timeStatus.status}`}
                        >
                          {timeStatus.label}
                        </span>
                      </td>
                      <td>
                        <span className="cost-badge">₹{bus.cost}</span>
                      </td>
                      {isAdmin && (
                        <td>
                          <button 
                            onClick={() => handleRemoveLocalBus(bus)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>
              {searchTerm 
                ? `No buses found matching "${searchTerm}"` 
                : "No bus details available."}
            </p>
            {searchTerm && (
              <button className="clear-search-btn" onClick={clearSearch}>
                Clear Search
              </button>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="add-button-wrapper">
            <button className="add-bus-btn" onClick={() => setShowModal(true)}>
              + Add Local Bus
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🚌 Add New Local Bus</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>From Location</label>
                <input
                  type="text"
                  placeholder="Enter departure location"
                  value={newBus.from_location}
                  onChange={(e) => setNewBus({ ...newBus, from_location: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>To Location</label>
                <input
                  type="text"
                  placeholder="Enter destination location"
                  value={newBus.to_location}
                  onChange={(e) => setNewBus({ ...newBus, to_location: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Bus Time</label>
                <input
                  type="time"
                  placeholder="Select time"
                  value={newBus.bus_time}
                  onChange={(e) => setNewBus({ ...newBus, bus_time: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Cost (₹)</label>
                <input
                  type="text"
                  placeholder="Enter ticket price"
                  value={newBus.cost}
                  onChange={(e) => setNewBus({ ...newBus, cost: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-add" onClick={handleAddLocalBus}>
                Add Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalBuses;