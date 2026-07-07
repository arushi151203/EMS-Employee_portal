import "./Chat.css";
import { useState } from "react";

import initialContacts from "../data/contacts";
import initialMessages from "../data/messages";

import ContactList from "../components/chat/ContactList";
import ChatWindow from "../components/chat/ChatWindow";

function Chat() {
  const [contacts, setContacts] = useState(initialContacts);

  const [selectedContact, setSelectedContact] = useState(
    initialContacts[0]
  );

  const [messages, setMessages] = useState(initialMessages);

  // Send message
  const sendMessage = (text) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      id: Date.now(),
      type: "sent",
      text,
      time: currentTime,
      status: "read",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [
        ...(prev[selectedContact.id] || []),
        newMessage,
      ],
    }));

    const updatedContact = {
      ...selectedContact,
      lastMessage: text,
      time: currentTime,
      unread: 0,
    };

    const updatedContacts = [
      updatedContact,
      ...contacts.filter(
        (contact) => contact.id !== selectedContact.id
      ),
    ];

    setContacts(updatedContacts);
    setSelectedContact(updatedContact);
  };

  // Receive message
  const receiveMessage = (contactId, text) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      id: Date.now(),
      type: "received",
      text,
      time: currentTime,
    };

    setMessages((prev) => ({
      ...prev,
      [contactId]: [
        ...(prev[contactId] || []),
        newMessage,
      ],
    }));

    const updatedContacts = contacts.map((contact) => {
      if (contact.id !== contactId) return contact;

      return {
        ...contact,
        lastMessage: text,
        time: currentTime,
        unread:
          selectedContact.id === contactId
            ? 0
            : contact.unread + 1,
      };
    });

    const activeContact = updatedContacts.find(
      (contact) => contact.id === contactId
    );

    setContacts([
      activeContact,
      ...updatedContacts.filter(
        (contact) => contact.id !== contactId
      ),
    ]);
  };

  return (
    <div className="chat-page">
      <aside className="left-panel">
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
      </aside>

      <main className="right-panel">
        <ChatWindow
          selectedContact={selectedContact}
          messages={messages}
          contacts={contacts}
          setContacts={setContacts}
          setSelectedContact={setSelectedContact}
          sendMessage={sendMessage}
          receiveMessage={receiveMessage}
        />
      </main>
    </div>
  );
}

export default Chat;