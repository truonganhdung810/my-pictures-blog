import './CoverPhoto.css'
import { useState, useRef } from 'react'
import ImageUploadPopup from './MenuChangeCover'
import { FaCamera } from 'react-icons/fa'
import CameraButton from './TestComponent'
import MenuChangeCover from './MenuChangeCover'
import ParentComponent from './TestComponent'
function CoverPhoto() {
  const defaultUrl =
    'https://plus.unsplash.com/premium_photo-1664635402104-75d7480fbeff'
  const [img, setImg] = useState(defaultUrl)
  const [originImg, setOriginImg] = useState(null)
  const [editCoverMenuOpen, setEditCoverMenuOpen] = useState(false)
  const [isPreviewCover, setIsPreviewCover] = useState(false)

  const buttonRef = useRef(null)

  const setCoverImage = (urlImG) => {
    setIsPreviewCover(true)
    setOriginImg(img)
    setImg(urlImG)
  }

  const editCoverClick = () => {
    console.log('bật popup')
    setEditCoverMenuOpen(!editCoverMenuOpen)
  }

  function cancelEdit() {
    setImg(originImg)
    setIsPreviewCover(false)
  }
  function saveEdit() {
    setIsPreviewCover(false)
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
        <img className="cover-image" src={img}></img>

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
  )
}

function EditCoverPopup() {}
export default CoverPhoto
