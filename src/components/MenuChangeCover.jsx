import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './MenuChangeCover.css'
import { GrGallery } from 'react-icons/gr'
import { BsUpload } from 'react-icons/bs'
import { IoMdLink } from 'react-icons/io'

const MenuChangeCover = ({ isOpen, setIsOpen, buttonRef, setCoverUrl }) => {
  const componentRef = useRef(null)
  const fileInputRef = useRef(null)
  const [selectUrl, setSelectUrl] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [errorUrl, setErrorUrl] = useState('')

  const handleFileChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    if (file) {
      if (file && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file)
        console.log(imageUrl)
        setCoverUrl(imageUrl) // Thay đổi cover url
        setIsOpen(false)
      }
    }
  }

  const onSelect = (select) => {
    console.log(select)
    if (select === 'upload') {
      fileInputRef.current.click()
    } else if (select === 'link') {
      setSelectUrl(true)
    }
  }

  const submitUrl = (e) => {
    e.preventDefault()
    const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
    if (imgUrl.match(imageExtensions)) {
      console.log('Valid Image URL:', imgUrl)
      setErrorUrl('')
      setIsOpen(false) // Đóng popup nếu hợp lệ
    } else {
      setErrorUrl(
        'Please enter a valid image URL (e.g., .jpg, .png, .jpeg, .gif)'
      )
    }
  }

  // Hàm xử lý click ra ngoài
  useEffect(() => {
    console.log('use Effect: ' + isOpen)
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    // Gắn sự kiện click
    document.addEventListener('click', handleClickOutside)

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  if (!isOpen) return null

  if (!selectUrl)
    return (
      <div className="popup-menu" ref={componentRef}>
        <div className="popup-menu-item" onClick={() => onSelect('gallery')}>
          <GrGallery className="popup-menu-icon"></GrGallery>
          From Gallery
        </div>
        <div className="popup-menu-item" onClick={() => onSelect('upload')}>
          <BsUpload className="popup-menu-icon"></BsUpload>
          Upload Photo
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // ẩn input
          />
        </div>
        <div className="popup-menu-item" onClick={() => onSelect('link')}>
          <IoMdLink className="popup-menu-icon"></IoMdLink>
          From URL
        </div>
      </div>
    )
  else
    return (
      <div className="popup-overlay-url">
        <div className="popup-content-url">
          <h2>Enter Image URL</h2>
          <form onSubmit={submitUrl}>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Enter image URL"
              className="url-input"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
          {errorUrl && <p style={{ color: 'red' }}>{errorUrl}</p>}
          <button className="close-btn" onClick={() => setSelectUrl(false)}>
            Close
          </button>
        </div>
      </div>
    )
}

export default MenuChangeCover
