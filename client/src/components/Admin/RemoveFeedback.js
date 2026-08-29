import React from "react";
import { Link } from "react-router-dom";

// This standalone form used to ask an admin to type in a place name,
// username, and comment text to identify feedback to remove — but its
// field names didn't actually match what the backend expected, so it
// was likely already broken. Feedback.js now has a working inline
// "Remove" button directly next to each comment (using the feedback's
// real id), which is both more reliable and easier to use — so that's
// the place to remove feedback from now.
const RemoveFeedback = () => (
    <div className="admin-transport-wrapper">
        <div className="admin_activity_wrapper">
            <h2>Remove Feedback</h2>
            <p>
                Feedback is now removed directly from each attraction's page —
                open the place, find the comment, and click its "Remove" button.
            </p>
            <Link to="/places/nagoa">Go to Attractions</Link>
        </div>
    </div>
);

export default RemoveFeedback;
