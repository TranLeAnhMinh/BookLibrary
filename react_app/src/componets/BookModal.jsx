import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import "../css/BookModal.css";
import { getAllPublishers } from "../../services/publisherservices";
import { searchAuthors } from "../../services/authorservices";

const BookModal = ({ isOpen, onClose, onSubmit, book }) => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    thumbnail: "",
    images: [],
    fullDescription: "",
    pageCount: "",
    publishYear: "",
    author_ids: [],
    publisher_id: "",
    quantity: ""
  });

  const [publishers, setPublishers] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getAllPublishers().then((res) => {
        if (res.success) setPublishers(res.publishers);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        shortDescription: book.short_description || "",
        thumbnail: book.image_url || "",
        images: [],
        fullDescription: book.description || "",
        pageCount: book.page || "",
        publishYear: book.published_year || "",
        author_ids: book.author_ids || [],
        publisher_id: book.publisher_id || "",
        quantity: book.quantity || ""
      });

      if (book.author_ids && book.authors) {
        const authorNames = book.authors.split(",").map((name) => name.trim());
        const authorObjects = book.author_ids.map((id, idx) => ({
          value: id,
          label: authorNames[idx] || `Tác giả #${id}`
        }));
        setSelectedAuthors(authorObjects);
      }
    } else {
      setFormData({
        title: "",
        shortDescription: "",
        thumbnail: "",
        images: [],
        fullDescription: "",
        pageCount: "",
        publishYear: "",
        author_ids: [],
        publisher_id: "",
        quantity: ""
      });
      setSelectedAuthors([]);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 1);
    setFormData((prev) => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let thumbnailUrl = formData.thumbnail;

    if (formData.images.length > 0) {
      const file = formData.images[0];
      const data = new FormData();
      data.append("image", file);
      data.append("slug", formData.title);

      try {
        const res = await fetch("http://127.0.0.1:5000/api/upload-image", {
          method: "POST",
          body: data
        });

        const result = await res.json();
        if (result.success) {
          thumbnailUrl = result.url;
        } else {
          alert("Upload ảnh thất bại: " + result.message);
          return;
        }
      } catch {
        alert("Lỗi kết nối khi upload ảnh.");
        return;
      }
    }

    const payload = {
      title: formData.title,
      short_description: formData.shortDescription,
      image_url: thumbnailUrl,
      description: formData.fullDescription,
      page: formData.pageCount,
      published_year: formData.publishYear,
      author_ids: selectedAuthors.map((a) => a.value),
      publisher_id: parseInt(formData.publisher_id),
      quantity: formData.quantity
    };

    onSubmit(payload);
  };

  const loadAuthorOptions = async (inputValue, callback) => {
    if (!inputValue) return callback([]);
    const res = await searchAuthors(inputValue);
    if (res.success) {
      const options = res.results.map((a) => ({
        label: a.name,
        value: a.id
      }));
      callback(options);
    } else {
      callback([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{book ? "Sửa Sách" : "Thêm Sách"}</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Tên sách" required value={formData.title} onChange={handleChange} />
          <input name="shortDescription" placeholder="Mô tả ngắn" required value={formData.shortDescription} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handleImagesChange} />
          {formData.thumbnail && <img src={formData.thumbnail} alt="preview" style={{ width: "100px", margin: "10px 0" }} />}
          <textarea name="fullDescription" placeholder="Mô tả chi tiết" value={formData.fullDescription} onChange={handleChange}></textarea>
          <input name="pageCount" placeholder="Số trang" value={formData.pageCount} onChange={handleChange} />
          <input name="publishYear" placeholder="Năm xuất bản" value={formData.publishYear} onChange={handleChange} />

          {/* Nhà xuất bản */}
          <div style={{ marginTop: "12px" }}>
            <label>Nhà xuất bản:</label>
            <select
              name="publisher_id"
              required
              value={formData.publisher_id}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            >
              <option value="">-- Chọn nhà xuất bản --</option>
              {publishers.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {pub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tác giả */}
          <div style={{ marginTop: "12px" }}>
            <label>Tác giả:</label>
            <AsyncSelect
              isMulti
              cacheOptions
              loadOptions={loadAuthorOptions}
              defaultOptions
              value={selectedAuthors}
              onChange={(selected) => {
                setSelectedAuthors(selected);
                setFormData((prev) => ({
                  ...prev,
                  author_ids: selected.map((a) => a.value)
                }));
              }}
              styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
            />
          </div>

          <input name="quantity" placeholder="Số lượng" required value={formData.quantity} onChange={handleChange} />

          <div className="button-container">
            <button type="button" onClick={onClose}>Hủy</button>
            <button type="submit">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;