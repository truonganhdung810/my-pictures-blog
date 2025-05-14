import "./CoverPhoto.css";
import { useState, useRef, useEffect } from "react";
import ImageUploadPopup from "./MenuChangeCover";
import { FaCamera } from "react-icons/fa";
import CameraButton from "./TestComponent";
import MenuChangeCover from "./MenuChangeCover";
import ParentComponent from "./TestComponent";

function CoverPhoto() {
  const defaultUrl =
    "https://plus.unsplash.com/premium_photo-1664635402104-75d7480fbeff";

  const [img, setImg] = useState(defaultUrl);
  const [originImg, setOriginImg] = useState(null);
  const [editCoverMenuOpen, setEditCoverMenuOpen] = useState(false);
  const [isPreviewCover, setIsPreviewCover] = useState(false);
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);
  const coverContainerRef = useRef(null);
  const [fullWidth, setFullWidth] = useState(1280);

  // OffsetY là vị trí hiển thị của ảnh Cover so với container, đây là 1 trường cần lưu trữ kèm theo ảnh để hiển thị ảnh cho đẹp
  const [offsetY, setOffsetY] = useState(-200);
  const [startY, setStartY] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [containerHeight, setContainerHeight] = useState(400);
  const [imageHeight, setImageHeight] = useState(800);

  // Lấy ra chiều cao (Height) của image Cover
  useEffect(() => {
    const imgCom = new Image();
    imgCom.src = img;
    imgCom.onload = () => {
      console.log("Kich thuoc ảnh: " + imgCom.width + " x " + imgCom.height);
      // scale ảnh to lên hoặc nhỏ lại cho bằng width của container
      const imgH = (imgCom.height * fullWidth) / imgCom.width;
      const imgW = (imgCom.width * fullWidth) / imgCom.width;
      console.log("Kich thuoc ảnh scale: " + imgW + " x " + imgH);
      setImageHeight(imgH);
    };
    imgCom.onerror = () => setError("Failed to load image");
  }, [img]);

  // Lấy ra width của cover-container, nếu lớn hơn ảnh, thì phải scale ảnh lên cho bằng width của container
  useEffect(() => {
    if (coverContainerRef.current) {
      const w = coverContainerRef.current.offsetWidth; // Lấy chiều rộng container
      console.log("chiều rộng container: " + w);
      setFullWidth(w);
    }

    // Optional: Cập nhật width khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      if (coverContainerRef.current) {
        //console.log(coverContainerRef.current.offsetWidth);
        //setFullWidth(coverContainerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Các giá trị để thực hiện kéo thả vị trí cho ảnh Cover
  // chỉ thực hiện khi đang preview ảnh Cover, isPreviewCover=true

  const handleMouseDown = (e) => {
    if (isPreviewCover) {
      setStartY(e.clientY);
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    if (isPreviewCover) {
      const dy = e.clientY - startY;
      setStartY(e.clientY);

      // Giới hạn kéo không quá mức ảnh
      setOffsetY((prev) => {
        const newOffset = prev + dy;
        const maxOffset = 0;
        const minOffset = containerHeight - imageHeight;
        return Math.max(Math.min(newOffset, maxOffset), minOffset);
      });
    }
  };

  const handleMouseUp = () => {
    if (isPreviewCover) setDragging(false);
  };
  // Kêt thúc các sự kiện cho việc kéo thả vị trí ảnh Cover

  const setCoverImage = (urlImG) => {
    // Khởi tạo lại OffsetY=-200 là giá trị mặc định, nếu có dữ liệu OffsetY theo ảnh thì cài đặt giá trị này
    // Ở đây chương trình không lưu lại giá trị OffsetY của ảnh nên dùng giá trị mặc định khi thay 1 ảnh cover mới
    // Nếu chạy trên mobile, giá trị OffsetY này phải là giá trị khác
    setOffsetY(-200);
    setIsPreviewCover(true);
    setOriginImg(img);
    setImg(urlImG);
  };

  const editCoverClick = () => {
    console.log("bật popup");
    setEditCoverMenuOpen(!editCoverMenuOpen);
  };

  function cancelEdit() {
    console.log(originImg);
    setImg(originImg);
    setIsPreviewCover(false);
  }
  function saveEdit() {
    setIsPreviewCover(false);
  }

  return (
    <div>
      <div className="cover-container">
        {isPreviewCover && (
          <div className="confirm-change">
            <button className="btn-cancel" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="btn-save" onClick={saveEdit}>
              Save changes
            </button>
          </div>
        )}
        <div
          ref={coverContainerRef}
          className={`img-cover-container ${dragging ? "dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            className="cover-image"
            src={img}
            style={{
              height: { imageHeight },
              transform: `translateY(${offsetY}px)`,
              transition: dragging ? "none" : "transform 0.2s",
            }}
          ></img>
        </div>

        {!isPreviewCover && (
          <div className="popup-container">
            <button
              ref={buttonRef}
              className="edit-button"
              onClick={editCoverClick}
            >
              <FaCamera className="change-image-icon" />
              <div className="edit-button-text"> Edit Cover Photo </div>
            </button>
            <div className="vitri-popup">
              {editCoverMenuOpen && (
                <MenuChangeCover
                  isOpen={editCoverMenuOpen}
                  setIsOpen={setEditCoverMenuOpen}
                  buttonRef={buttonRef}
                  setCoverUrl={setCoverImage}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditCoverPopup() {}
export default CoverPhoto;
