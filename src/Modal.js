// src/Modal.js

import React from "react";
import "./Modal.css"; // Importing styles for the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render anything if modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {children} {/* Content of the modal */}
      </div>
    </div>
  );
};

export default Modal;
