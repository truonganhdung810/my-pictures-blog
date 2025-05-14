import React from "react";
import { useState, useEffect, useRef } from "react";
import "./MenuChangeCover.css";
import { GrGallery } from "react-icons/gr";
import { BsUpload } from "react-icons/bs";
import { IoMdLink } from "react-icons/io";

const MenuChangeCover = ({ isOpen, setIsOpen, buttonRef, setCoverUrl }) => {
  const componentRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectUrl, setSelectUrl] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isValid, setIsValid] = useState(true); // null | true | false
  const [submitedUrl, setSubmitedUrl] = useState(false);

  // Nhận file từ local
  const handleFileChange = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl);
        setCoverUrl(imageUrl); // Thay đổi cover url
        setIsOpen(false);
      }
    }
  };

  const onSelect = (select) => {
    console.log(select);
    if (select === "upload") {
      fileInputRef.current.click();
    } else if (select === "link") {
      setSelectUrl(true);
    }
  };

  // Lấy link ảnh từ input url, cập nhật vào imgUrl để thay đổi Cover
  const submitUrl = (e) => {
    e.preventDefault();
    console.log("Image URL:", imgUrl);
    console.log(submitedUrl);
    setSubmitedUrl(true);
  };

  // Load ảnh từ link
  const handleLoad = () => {
    setCoverUrl(imgUrl); // Thay đổi cover url
    setIsOpen(false); // Đóng popup nếu hợp lệ
  };

  // Nếu load ảnh không hợp lệ
  const handleError = () => {
    console.log("error");
    setSubmitedUrl(false);
    setIsValid(false);
  };

  // Hàm xử lý click ra ngoài component (ở đây là popup hiển thị Menu)
  useEffect(() => {
    console.log("use Effect: " + isOpen);
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Gắn sự kiện click
    document.addEventListener("click", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (!selectUrl)
    return (
      <div className="popup-menu" ref={componentRef}>
        <div className="popup-menu-item" onClick={() => onSelect("gallery")}>
          <GrGallery className="popup-menu-icon"></GrGallery>
          From Gallery
        </div>
        <div className="popup-menu-item" onClick={() => onSelect("upload")}>
          <BsUpload className="popup-menu-icon"></BsUpload>
          Upload Photo
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }} // ẩn input
          />
        </div>
        <div className="popup-menu-item" onClick={() => onSelect("link")}>
          <IoMdLink className="popup-menu-icon"></IoMdLink>
          From URL
        </div>
      </div>
    );
  else
    return (
      <div className="popup-overlay-url">
        <div className="popup-content-url">
          <form onSubmit={submitUrl}>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Enter image URL"
              className="url-input"
              required
            />
            <div className="btn-group">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button className="close-btn" onClick={() => setSelectUrl(false)}>
                Close
              </button>
            </div>
          </form>
          {/* Sử dụng 1 thẻ img ẩn để load ảnh từ url, nếu có lỗi thì handle */}
          {/* Có thể sử dụng 1 cách khác là dùng UseEfect và Image Component của React */}
          {submitedUrl && (
            <img
              src={imgUrl}
              onLoad={handleLoad}
              onError={handleError}
              alt="Test"
              style={{ display: "none" }}
            />
          )}
          {isValid === false && <p>❌ URL invalid</p>}
        </div>
      </div>
    );
};

export default MenuChangeCover;
