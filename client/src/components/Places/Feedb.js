import { useState, useEffect } from "react";
import "./Feedback.css";

const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [newFeedback, setNewFeedback] = useState("");
    const [replies, setReplies] = useState({});
    const [replyText, setReplyText] = useState({});

    // Fetch feedback from the backend
    useEffect(() => {
        fetch("http://localhost:5000/msg/feedback")
            .then((response) => response.json())
            .then((data) => setFeedbackData(data))
            .catch((error) => console.error("Error fetching feedback details:", error));
    }, []);

    const handleSubmitFeedback = () => {
        if (!newFeedback.trim()) return;

        fetch("http://localhost:5000/msg/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback: newFeedback })
        })
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData([...feedbackData, data]); // Update UI
                setNewFeedback(""); // Clear input field
            })
            .catch((error) => console.error("Error submitting feedback:", error));
    };
    // Fetch replies for a specific feedback
    const fetchReplies = (userID) => {
        fetch(`http://localhost:5000/mgs/feedback/${userID}/replies`)
            .then((response) => response.json())
            .then((data) => setReplies({ ...replies, [userID]: data }))
            .catch((error) => console.error("Error fetching replies:", error));
    };

    // Send a reply to backend
    const handleReply = (userID) => {
        if (!replyText[userID]?.trim()) return;

        fetch(`http://localhost:5000/msg/feedback/${userID}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: replyText[userID] })
        })
            .then(() => {
                fetchReplies(userID);
                setReplyText({ ...replyText, [userID]: "" });
            })
            .catch((error) => console.error("Error submitting reply:", error));
    };


    return (
        <div className="page-wrapper">
            <div className="feedback-container">
                <h2>User Feedback</h2>
                {/* Input for new feedback */}
                <div className="feedback-input">
                    <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Write your feedback..."
                    />
                    <button onClick={handleSubmitFeedback}>Post</button>
                </div>

                {feedbackData.length > 0 ? (
                    <div className="feedback-list">
                        {feedbackData.map((feedback) => (
                            <div key={feedback.userID} className="feedback-item">
                                <div className="feedback-header">
                                    <span className="username">@{feedback.username}</span>
                                    <span className="time">{feedback.time}</span>
                                </div>
                                <p className="comment">{feedback.feedback}</p>

                                <div className="feedback-actions">
                                    <button onClick={() => fetchReplies(feedback.userID)}>Replies</button>
                                </div>

                                {/* Replies Section */}
                                {replies[feedback.userID] && (
                                    <div className="replies">
                                        {replies[feedback.userID].map((reply, index) => (
                                            <p key={index} className="reply">{reply.text}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Input */}
                                <div className="reply-input">
                                    <input
                                        type="text"
                                        value={replyText[feedback.userID] || ""}
                                        onChange={(e) => setReplyText({ ...replyText, [feedback.userID]: e.target.value })}
                                        placeholder="Write a reply..."
                                    />
                                    <button onClick={() => handleReply(feedback.userID)}>Reply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No feedback available.</p>
                )}
            </div>
        </div>

    );
};

export default Feedback;
