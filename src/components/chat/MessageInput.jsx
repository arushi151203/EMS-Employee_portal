import { useRef, useState } from "react";
import "./MessageInput.css";

import EmojiPicker from "emoji-picker-react";

import {
  FiSmile,
  FiPaperclip,
  FiMic,
  FiSend,
  FiX,
} from "react-icons/fi";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef();

  const handleSend = () => {
    if (!text.trim() && !selectedFile) return;

    let finalMessage = text;

    if (selectedFile) {
      finalMessage += ` 📎 ${selectedFile.name}`;
    }

    sendMessage(finalMessage.trim());

    setText("");
    setSelectedFile(null);
    setShowEmoji(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <>
      {selectedFile && (
        <div className="attachment-preview">

          <span>
            📎 {selectedFile.name}
          </span>

          <button
            onClick={() => setSelectedFile(null)}
          >
            <FiX />
          </button>

        </div>
      )}

      <div className="message-input-container">

        {/* Emoji */}

        <div className="emoji-container">

          <button
            className="action-btn"
            onClick={() =>
              setShowEmoji(!showEmoji)
            }
          >
            <FiSmile />
          </button>

          {showEmoji && (
            <div className="emoji-picker">
              <EmojiPicker
                theme="dark"
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}

        </div>

        {/* Attachment */}

        <button
          className="action-btn"
          onClick={chooseFile}
        >
          <FiPaperclip />
        </button>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFile}
        />

        {/* Input */}

        <div className="input-wrapper">

          <input
            value={text}
            placeholder="Type a message..."
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

        </div>

        {/* Mic */}

        <button className="action-btn">
          <FiMic />
        </button>

        {/* Send */}

        <button
          className="send-btn"
          onClick={handleSend}
        >
          <FiSend />
        </button>

      </div>
    </>
  );
}

export default MessageInput;