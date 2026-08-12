import React from "react";
import "../css/memberdetails.css";
import { useNavigate } from "react-router-dom";

const FamilyDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="card-container1">
      <div className="card" onClick={() => navigate("/NewBaptism")}>
        <div className="card-details">
          <span className="card-icon">💧</span>
          <p className="text-title">New Baptism</p>
        </div>
      </div>

      <div className="card" onClick={() => navigate("/SearchBap")}>
        <div className="card-details">
          <span className="card-icon">📜</span>
          <p className="text-title">View Records</p>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetails;
