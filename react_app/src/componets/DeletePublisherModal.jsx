const DeletePublisherModal = ({ isOpen, onClose, onDelete, publisherName }) => {
    if (!isOpen) return null; // Nếu modal không mở thì không render
  
    return (
      <div style={modalOverlay}>
        <div style={modalBox}>
          <h3>Xác nhận xóa nhà xuất bản</h3>
          <p>Bạn có chắc chắn muốn xóa nhà xuất bản "{publisherName}"?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button onClick={onClose} style={{ padding: "8px 16px" }}>Hủy</button>
            <button onClick={onDelete} style={{ padding: "8px 16px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px" }}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeletePublisherModal;