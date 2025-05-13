import React from "react";
import { useEffect, useRef } from "react";
import "./ImageUploadPopup.css";

const ImageUploadPopup = ({ isOpen, setIsOpen, buttonRef, onSelect }) => {
  const componentRef = useRef(null);
  console.log("Load Popup vào DOM: " + isOpen);
  // Hàm xử lý click ra ngoài
  useEffect(() => {
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
  }, []);

  if (!isOpen) return null;

  return (
    <div className="popup-menu" ref={componentRef}>
      <div className="popup-menu-item" onClick={() => onSelect("choose")}>
        <span className="popup-menu-icon">🖼️</span>
        Chọn ảnh bìa
      </div>
      <div className="popup-menu-item" onClick={() => onSelect("upload")}>
        <span className="popup-menu-icon">⬆️</span>
        Tải ảnh lên
      </div>
    </div>
  );
};

export default ImageUploadPopup;
