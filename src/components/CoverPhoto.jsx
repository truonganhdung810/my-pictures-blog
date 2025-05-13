import './CoverPhoto.css'
import cameraIcon from '../assets/icons/camera-icon.png'

function CoverPhoto() {
  const img =
    'https://plus.unsplash.com/premium_photo-1664635402104-75d7480fbeff?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const handleEdit = () => {}

  return (
    <div>
      <div className="cover-container">
        <img className="cover-image" src={img}></img>
        <button className="edit-button" onClick={handleEdit}>
          <img src={cameraIcon} className="change-image-icon" />
          <span className="edit-button-text"> Edit Cover Photo </span>
        </button>
      </div>
    </div>
  )
}
export default CoverPhoto
