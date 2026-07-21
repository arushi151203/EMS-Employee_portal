import "./ChatMenu.css";
import { FiTrash2 } from "react-icons/fi";

function ChatMenu({
  showMenu,
  onClearChat,
}) {
  if (!showMenu) return null;

  return (
    <div className="chat-menu">

      <button onClick={onClearChat}>
        <FiTrash2 />
        <span>Clear Chat</span>
      </button>

    </div>
  );
}

export default ChatMenu;