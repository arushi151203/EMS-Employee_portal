import { FiCheck } from "react-icons/fi";
import "./MessageBubble.css";

function MessageBubble({ message }) {
  return (
    <div className={`message-row ${message.type}`}>
      <div className={`chat-bubble ${message.type}`}>
        <p>{message.text}</p>

        <div className="bubble-footer">
          <span>{message.time}</span>

          {message.type === "sent" && (
            <div className="message-status">
              {message.status === "sent" && (
                <FiCheck />
              )}

              {message.status === "delivered" && (
                <>
                  <FiCheck />
                  <FiCheck />
                </>
              )}

              {message.status === "read" && (
                <div className="double-read">
                  <FiCheck />
                  <FiCheck />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;