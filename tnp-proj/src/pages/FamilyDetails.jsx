import React from 'react';
import "../css/familydetails.css";
import { useNavigate, useParams } from "react-router-dom";

const FamilyDetails = () => {
  const navigate = useNavigate();
  useParams();

  return (
    <div className="card-container1">

      <div className="card" onClick={() => navigate("/AddFamily")}>
        <div className="card-details">
          <span className="card-icon">➕</span>
          <p className="text-title">Add Family</p>
        </div>
      </div>

      <div className="card" onClick={() => navigate("/SearchFamily")}>
        <div className="card-details">
          <span className="card-icon">🔍</span>
          <p className="text-title">Search Family</p>
        </div>
      </div>

    </div>
  );
};

export default FamilyDetails;
