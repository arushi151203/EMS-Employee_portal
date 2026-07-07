import "./ChatWindow.css";
import { useEffect, useRef } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({
  selectedContact,
  messages,
  contacts,
  setContacts,
  setSelectedContact,
  sendMessage,
}) {
  const chatMessages = messages[selectedContact.id] || [];

  const bottomRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  // Mark messages as read
  useEffect(() => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          unread: 0,
        };
      }
      return contact;
    });

    setContacts(updatedContacts);

    const updatedSelected = updatedContacts.find(
      (contact) => contact.id === selectedContact.id
    );

    if (updatedSelected) {
      setSelectedContact(updatedSelected);
    }
  }, [selectedContact.id]);

  return (
    <div className="chat-window">

      {/* Header */}
      <div className="chat-window-header">

        <div className="chat-user">

          <div className="header-avatar">
            {selectedContact.avatar}
          </div>

          <div className="header-info">
            <h3>{selectedContact.name}</h3>

            <span>
              {selectedContact.online
                ? "Online"
                : "Offline"}
            </span>
          </div>

        </div>

        <div className="header-icons">

          <button>
            <FiSearch />
          </button>

          <button>
            <FiMoreVertical />
          </button>

        </div>

      </div>

      {/* Messages */}
      <div className="messages-area">

        <div className="today">
          Today
        </div>

        {chatMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* Message Input */}
      <MessageInput
        sendMessage={sendMessage}
      />

    </div>
  );
}

export default ChatWindow;