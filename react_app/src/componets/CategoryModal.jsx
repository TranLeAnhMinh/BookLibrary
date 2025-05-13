import React, { useState, useEffect } from "react";

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const CategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description);
    } else {
      setName("");
      setSlug("");
      setDescription("");
    }
  }, [category]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !slug) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    onSubmit({ name, slug, description });
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3>{category ? "Sửa danh mục" : "Thêm danh mục"}</h3>
        <input
          type="text"
          placeholder="Tên danh mục"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slug"
          style={inputStyle}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          style={{ ...inputStyle, height: "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "8px 16px" }}>Huỷ</button>
          <button onClick={handleSubmit} style={{ padding: "8px 16px", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "5px" }}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;