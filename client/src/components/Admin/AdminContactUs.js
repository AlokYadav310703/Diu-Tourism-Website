import { useState, useEffect } from "react";
import api from "../../services/api";
import "./AdminContactUs.css";

const LocalcontactUs = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = () => {
    api
      .get("/admin_activity/fetchContactUs")
      .then((response) => setContactData(response.data))
      .catch((error) =>
        console.error("Error fetching contact details:", error)
      );
  };

  const removeAll = () => {
    if (window.confirm("Are you sure you want to remove all contact submissions?")) {
      api
        .post("/admin_activity/removeAllContactUs")
        .then(() => fetchContactData())
        .catch((err) => console.error("Error removing all:", err));
    }
  };

  const removeOne = (entry) => {
    if (window.confirm(`Are you sure you want to remove the contact submission from ${entry.user_name}?`)) {
      api
        .post("/admin_activity/removeOneContactUs", { id: entry.id })
        .then(() => fetchContactData())
        .catch((err) => console.error("Error removing one:", err));
    }
  };

  return (
    <div className="contactUs-page-wrapper">
      <div className="contactUs-details-container">
        <h2>User Suggestions</h2>
        {contactData.length > 0 ? (
          <div className="table-wrapper">
            <table className="contactUs-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>
                    <button
                      className="adminContactusRemoveAllbtn"
                      onClick={removeAll}
                    >
                      Remove ALL
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactData.map((entry, index) => (
                  <tr key={entry.id ?? index}>
                    <td>{entry.user_name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.subject}</td>
                    <td>{entry.message}</td>
                    <td>
                      <button
                        className="adminContactusRemoveOnebtn"
                        onClick={() => removeOne(entry)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default LocalcontactUs;
