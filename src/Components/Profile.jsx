import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Profile = ({ onClose }) => {
  const el = document.createElement('div');

  React.useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const handleBackgroundClick = (event) => {
    event.stopPropagation();
    onClose();
  }

  const handleModalClick = (event) => {
    event.stopPropagation();
  }

  return ReactDOM.createPortal(
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={handleModalClick}>
        {/* Your profile content here */}
        <p>Profile content...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
}

export default Profile;
