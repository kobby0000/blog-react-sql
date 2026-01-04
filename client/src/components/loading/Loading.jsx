import React from 'react';
import "./loading.css";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Loading