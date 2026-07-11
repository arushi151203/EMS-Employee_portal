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

  // Open Chat
  const openChat = (contact) => {
    const updatedContacts = contacts.map((c) =>
      c.id === contact.id
        ? {
            ...c,
            unread: 0,
          }
        : c
    );

    const selected = updatedContacts.find(
      (c) => c.id === contact.id
    );

    const reordered = [
      selected,
      ...updatedContacts.filter(
        (c) => c.id !== contact.id
      ),
    ];

    setContacts(reordered);
    setSelectedContact(selected);
  };

  // Send Message (Text + File)
  const sendMessage = (data) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let newMessage;
    let lastMessage;

    if (data.messageType === "text") {
      if (!data.text.trim()) return;

      newMessage = {
        id: Date.now(),
        type: "sent",
        messageType: "text",
        text: data.text,
        time,
        status: "read",
      };

      lastMessage = data.text;
    } else {
      newMessage = {
        id: Date.now(),
        type: "sent",
        messageType: "file",
        fileName: data.fileName,
        fileType: data.fileType,
        fileUrl: data.fileUrl,
        time,
        status: "read",
      };

      lastMessage = `📎 ${data.fileName}`;
    }

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [
        ...(prev[selectedContact.id] || []),
        newMessage,
      ],
    }));

    const updatedContact = {
      ...selectedContact,
      lastMessage,
      time,
      unread: 0,
    };

    const reordered = [
      updatedContact,
      ...contacts.filter(
        (c) => c.id !== selectedContact.id
      ),
    ];

    setContacts(reordered);
    setSelectedContact(updatedContact);
  };

  // Clear Current Conversation
  const clearConversation = () => {
    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [],
    }));

    const updatedContact = {
      ...selectedContact,
      lastMessage: "",
      time: "",
      unread: 0,
    };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContact.id
          ? updatedContact
          : c
      )
    );

    setSelectedContact(updatedContact);
  };

  return (
    <div className="chat-page">

      <aside className="left-panel">

        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={openChat}
        />

      </aside>

      <main className="right-panel">

        <ChatWindow
          selectedContact={selectedContact}
          messages={messages}
          sendMessage={sendMessage}
          clearConversation={clearConversation}
        />

      </main>

    </div>
  );
}

export default Chat;