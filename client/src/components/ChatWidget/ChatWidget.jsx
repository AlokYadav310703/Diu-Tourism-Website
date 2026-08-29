import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaComments, FaCompass, FaPaperPlane, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // the greeting below counts as unread until first opened
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Diu tourism assistant. Ask me about places, hotels, restaurants, or transport." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const openWidget = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/chatbot', { question });
      setMessages((prev) => [...prev, { role: 'bot', text: response.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-widget-container">
      {isOpen ? (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <div className="chat-widget-avatar">
              <FaCompass />
            </div>
            <div className="chat-widget-header-text">
              <span className="chat-widget-title">Diu Tourism Assistant</span>
              <span className="chat-widget-subtitle">Ask me anything about Diu</span>
            </div>
            <button className="chat-widget-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((m, i) => (
              <div key={i} className="chat-widget-row" style={{ '--i': i }}>
                {m.role === 'bot' && (
                  <div className="chat-widget-msg-avatar">
                    <FaCompass />
                  </div>
                )}
                <div className={`chat-widget-message ${m.role === 'user' ? 'user' : 'bot'}`}>
                  {m.role === 'bot' ? (
                    // Bot replies are rendered as Markdown (tables, bold,
                    // headers, lists) since the model naturally formats richer
                    // answers that way. User messages stay plain text - no
                    // reason to parse Markdown out of what someone actually typed.
                    <div className="chat-widget-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-widget-row">
                <div className="chat-widget-msg-avatar">
                  <FaCompass />
                </div>
                <div className="chat-widget-message bot chat-widget-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-widget-input-row">
            <input
              className="chat-widget-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Diu…"
            />
            <button
              className="chat-widget-send-btn"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button className="chat-widget-fab" onClick={openWidget} aria-label="Open Diu tourism chat assistant">
          <FaComments />
          {hasUnread && <span className="chat-widget-fab-dot" />}
        </button>
      )}
    </div>
  );
};

export default ChatWidget;