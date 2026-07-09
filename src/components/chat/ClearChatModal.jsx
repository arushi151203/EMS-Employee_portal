import "./ClearChatModal.css";

function ClearChatModal({
  show,
  onCancel,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="clear-chat-modal">

        <h3>Clear Conversation</h3>

        <p>
          Are you sure you want to clear this conversation?
          <br />
          This action cannot be undone.
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="clear-btn"
            onClick={onConfirm}
          >
            Clear
          </button>

        </div>

      </div>

    </div>
  );
}

export default ClearChatModal;