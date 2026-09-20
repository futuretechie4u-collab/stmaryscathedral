import React from 'react';
import "../css/memberdetails.css";
import { useNavigate } from "react-router-dom";

const DeathRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="card-containermember">
      <div className="card" onClick={() => navigate("/AddDeathRecord")}>
        <div className="card-details">
          <span className="card-icon">➕</span>
          <p className="text-title">Death Record</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/ViewDeathRecords")}>
        <div className="card-details">
          <span className="card-icon">📜</span>
          <p className="text-title">View Records</p>
        </div>
      </div>
    </div>
  );
};

export default DeathRecords;
