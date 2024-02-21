/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/popup.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;