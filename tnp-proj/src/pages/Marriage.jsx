import React from 'react'
import { useNavigate } from "react-router-dom";
import "../css/memberdetails.css";

const Marriage = () => {
  const navigate = useNavigate();
  return (
    <div className="card-container1">
      <div className="card" onClick={() => navigate("/AddMarriage")}>
        <div className="card-details">
          <span className="card-icon">💍</span>
          <p className="text-title">Add Marriage</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/ViewMarriage")}>
        <div className="card-details">
          <span className="card-icon">📜</span>
          <p className="text-title">View Records</p>
        </div>
      </div>
    </div>
  )
}

export default Marriage
