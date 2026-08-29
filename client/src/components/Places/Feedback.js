import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Feedback.css";

const Feedback = ({ placename }) => {
    const { isAdmin, isLoggedIn, user } = useAuth();
    const [feedbackData, setFeedbackData] = useState([]);
    const [newFeedback, setNewFeedback] = useState("");
    const [replies, setReplies] = useState({});
    const [replyText, setReplyText] = useState({});
    const [openFeedbacks, setOpenFeedbacks] = useState({});
    const navigate = useNavigate();

    // collect all feedback for this place
    useEffect(() => {
        api
            .get(`/msg/${placename}/feedback`)
            .then(res => setFeedbackData(res.data || []))
            .catch(err => console.error("Error fetching feedback:", err));
    }, [placename]);

    // submit (or update) your own feedback — posting again just updates
    // your existing comment now, since the backend upserts on (place, email)
    // instead of erroring with a 409 like the old per-place tables did.
    const handleSubmitFeedback = () => {
        if (!newFeedback.trim()) return;

        api
            .post(`/msg/${placename}/feedback`, { user_comment: newFeedback })
            .then(res => {
                setFeedbackData(prev => {
                    const withoutMine = prev.filter(fb => fb.email !== res.data.email);
                    return [...withoutMine, res.data];
                });
                setNewFeedback("");
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    const shouldRedirect = window.confirm("You are not logged in. Do you want to go to the login page?");
                    if (shouldRedirect) navigate("/login");
                    return;
                }
                console.error("Error posting feedback:", err);
            });
    };

    const fetchReplies = (feedbackId) => {
        setOpenFeedbacks(prev => ({ ...prev, [feedbackId]: !prev[feedbackId] }));

        if (replies[feedbackId] && openFeedbacks[feedbackId]) return;

        api
            .get(`/msg/feedback/${feedbackId}/replies`)
            .then(res => setReplies(prev => ({ ...prev, [feedbackId]: res.data || [] })))
            .catch(err => {
                console.error("Error fetching replies:", err);
                setReplies(prev => ({ ...prev, [feedbackId]: [] }));
            });
    };

    const handleReply = (feedbackId) => {
        const replyContent = replyText[feedbackId]?.trim();
        if (!replyContent) return;

        api
            .post(`/msg/feedback/${feedbackId}/reply`, { replier_comment: replyContent })
            .then(() => {
                fetchReplies(feedbackId);
                setReplyText(prev => ({ ...prev, [feedbackId]: "" }));
            })
            .catch(err => console.error("Error posting reply:", err));
    };

    // admin remove feedback
    const handleDeleteFeedback = (feedback) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove the comment from "${feedback.user_name}" saying "${feedback.user_comment}"?`);
        if (!confirmDelete) return;

        api
            .post("/admin_activity/removeFeedback", { id: feedback.id })
            .then(() => {
                setFeedbackData(prev => prev.filter(fb => fb.id !== feedback.id));
                window.alert("Comment removed successfully!");
            })
            .catch(err => {
                console.error("Error deleting feedback:", err);
                window.alert("An error occurred while trying to delete the comment.");
            });
    };

    // user removes their own feedback
    const handleUserDeleteFeedback = (feedback) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove your comment?`);
        if (!confirmDelete) return;

        api
            .post("/admin_activity/removeUserFeedback", { id: feedback.id })
            .then(() => {
                setFeedbackData(prev => prev.filter(fb => fb.id !== feedback.id));
                window.alert("Comment removed successfully!");
            })
            .catch(err => {
                console.error("Error deleting feedback:", err);
                window.alert("An error occurred while trying to delete the comment.");
            });
    };

    // admin remove reply
    const handleDeleteReply = (feedbackId, reply) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this reply by "${reply.replier_name}"?`);
        if (!confirmDelete) return;

        api
            .post("/admin_activity/removeReply", { id: reply.id })
            .then(() => {
                setReplies(prev => ({
                    ...prev,
                    [feedbackId]: prev[feedbackId]?.filter((r) => r.id !== reply.id),
                }));
                window.alert("Reply removed successfully!");
            })
            .catch(err => {
                console.error("Error deleting reply:", err);
                window.alert("An error occurred while trying to delete the reply.");
            });
    };

    return (
        <div className="feedback-page-wrapper">
            <div className="feedback-container">
                <h2 className="feedbackh2">Feedback for {placename}</h2>

                <div className="feedback-input">
                    <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Write your feedback..."
                    />
                    <button id="post" onClick={handleSubmitFeedback}>Post</button>
                </div>

                {feedbackData.length > 0 ? (
                    <div className="feedback-list">
                        {feedbackData.map((feedback) => (
                            <div key={feedback.id} className="feedback-item">
                                <div className="feedback-header">
                                    <span className="username">@{feedback.user_name}</span>
                                    {isAdmin && (
                                        <button className="admin-delete-feedback-btn" onClick={() => handleDeleteFeedback(feedback)}>
                                            Remove
                                        </button>
                                    )}
                                    <span className="time">
                                        on: {feedback.created_at ? new Date(feedback.created_at).toLocaleDateString() : "Unknown"}
                                    </span>
                                </div>
                                <p className="comment">{feedback.user_comment}</p>
                                {isLoggedIn && feedback.email === user?.email && (
                                    <button className="User-delete-feedback-btn" onClick={() => handleUserDeleteFeedback(feedback)}>
                                        Remove
                                    </button>
                                )}

                                <div className="feedback-actions">
                                    <button id="replies-button" onClick={() => fetchReplies(feedback.id)}>
                                        {openFeedbacks[feedback.id] ? "Hide Replies" : "Show Replies"} ({replies[feedback.id]?.length || 0})
                                    </button>
                                </div>

                                {openFeedbacks[feedback.id] && (
                                    <div className="replies-section">
                                        {replies[feedback.id]?.length > 0 ? (
                                            <div className="replies-list">
                                                {replies[feedback.id].map((reply) => (
                                                    <div key={reply.id} className="reply-item">
                                                        <div className="reply-header">
                                                            <span className="username">@{reply.replier_name}</span>
                                                            {isAdmin && (
                                                                <button className="admin-delete-reply-btn" onClick={() => handleDeleteReply(feedback.id, reply)}>
                                                                    Remove
                                                                </button>
                                                            )}
                                                            <span className="time">
                                                                on: {reply.created_at ? new Date(reply.created_at).toLocaleDateString() : "Unknown"}
                                                            </span>
                                                        </div>
                                                        <p className="reply-text">{reply.replier_comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-replies">No replies yet.</p>
                                        )}

                                        <div className="reply-input">
                                            <textarea
                                                value={replyText[feedback.id] || ""}
                                                onChange={(e) => setReplyText(prev => ({
                                                    ...prev,
                                                    [feedback.id]: e.target.value
                                                }))}
                                                placeholder="Write a reply..."
                                            />
                                            <button onClick={() => handleReply(feedback.id)}>Reply</button>
                                        </div>
                                    </div>
                                )}
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
