import "./ContactList.css";
import { useState } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";

function ContactList({
  contacts,
  selectedContact,
  setSelectedContact,
}) {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    const value = search.toLowerCase();

    return (
      contact.name.toLowerCase().includes(value) ||
      contact.lastMessage.toLowerCase().includes(value)
    );
  });

  return (
    <div className="contact-list">
      {/* Header */}

      <div className="contact-header">
        <h2>Messages</h2>

        <button className="icon-btn">
          <FiSettings />
        </button>
      </div>

      {/* Search */}

      <div className="search-container">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Contacts */}

      <div className="contact-items">

        {filteredContacts.length === 0 ? (

          <div className="empty-search">
            No conversations found
          </div>

        ) : (

          filteredContacts.map((contact) => (

            <div
              key={contact.id}
              className={`contact-card
                ${
                  selectedContact.id === contact.id
                    ? "active"
                    : ""
                }
                ${
                  contact.unread > 0
                    ? "unread"
                    : ""
                }
              `}
              onClick={() =>
                setSelectedContact(contact)
              }
            >

              <div className="avatar-container">

                <div className="contact-avatar">
                  {contact.avatar}
                </div>

                <span
                  className={`status-dot ${
                    contact.online
                      ? "online"
                      : "offline"
                  }`}
                ></span>

              </div>

              <div className="contact-content">

                <div className="contact-top">

                  <h4>{contact.name}</h4>

                  <span>{contact.time}</span>

                </div>

                <div className="contact-bottom">

                  <p>{contact.lastMessage}</p>

                  {contact.unread > 0 && (

                    <div className="unread-badge">
                      {contact.unread}
                    </div>

                  )}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ContactList;