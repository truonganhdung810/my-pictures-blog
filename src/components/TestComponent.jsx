import React, { useState } from 'react'

function ParentComponent() {
  const [showChild, setShowChild] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div>
      {showChild && (
        <ChildComponent
          onButtonClick={() => {
            setShowPopup(true) // Bật popup
            setShowChild(false) // Ẩn component chứa button
          }}
        />
      )}

      {showPopup && <PopupComponent onClose={() => setShowPopup(false)} />}
    </div>
  )
}

function ChildComponent({ onButtonClick }) {
  return (
    <div>
      <button onClick={onButtonClick}>Open Popup</button>
    </div>
  )
}

function PopupComponent({ onClose }) {
  return (
    <div style={{ padding: 20, background: '#eee', border: '1px solid #ccc' }}>
      <p>This is a popup!</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default ParentComponent
