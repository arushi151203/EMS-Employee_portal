import { FiCheck, FiFileText } from "react-icons/fi";
import "./MessageBubble.css";

function MessageBubble({ message }) {
  return (
    <div className={`message-row ${message.type}`}>
      <div className={`chat-bubble ${message.type}`}>

        {/* Text Message */}
        {message.messageType === "text" || !message.messageType ? (
          <p>{message.text}</p>
        ) : (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="file-message"
          >
            <FiFileText />
            <span>{message.fileName}</span>
          </a>
        )}

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