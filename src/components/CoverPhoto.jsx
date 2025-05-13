import "./CoverPhoto.css";
import cameraIcon from "../assets/icons/camera-icon.png";
import { useState, useRef } from "react";
import ImageUploadPopup from "./ImageUploadPopup";

function CoverPhoto() {
  const [editCoverMenuOpen, setEditCoverMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const editCoverClick = () => {
    console.log("bật popup");
    setEditCoverMenuOpen(!editCoverMenuOpen);
  };
  const img =
    "https://plus.unsplash.com/premium_photo-1664635402104-75d7480fbeff?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div>
      <div className="cover-container">
        <img className="cover-image" src={img}></img>
        <div className="popup-container">
          <button
            ref={buttonRef}
            className="edit-button"
            onClick={editCoverClick}
          >
            <img src={cameraIcon} className="change-image-icon" />
            <span className="edit-button-text"> Edit Cover Photo </span>
          </button>
          <ImageUploadPopup
            isOpen={editCoverMenuOpen}
            setIsOpen={setEditCoverMenuOpen}
            buttonRef={buttonRef}
          />
        </div>
      </div>
    </div>
  );
}

function EditCoverPopup() {}
export default CoverPhoto;
