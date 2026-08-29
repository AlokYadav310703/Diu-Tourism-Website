import React from "react";
import { Link } from "react-router-dom";

// Same situation as RemoveFeedback.js — replies are now removed with
// the inline "Remove" button next to each reply on the place's page,
// which uses the reply's real id instead of a hand-typed match.
const RemoveReply = () => (
    <div className="admin-transport-wrapper">
        <div className="admin_activity_wrapper">
            <h2>Remove Reply</h2>
            <p>
                Replies are now removed directly from each attraction's page —
                open the place, show replies, and click "Remove" next to the one you want gone.
            </p>
            <Link to="/places/nagoa">Go to Attractions</Link>
        </div>
    </div>
);

export default RemoveReply;
