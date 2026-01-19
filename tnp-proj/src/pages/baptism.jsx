import React from "react";
import "../css/familydetails.css";
import { useNavigate } from "react-router-dom";

const FamilyDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="card-container1">
      <div className="card" onClick={() => navigate("/NewBaptism")}>
        <div className="card-details">
          <p className="text-title">NEW BAPTISM</p>
        </div>
      </div>

      <div className="card" onClick={() => navigate("/SearchBap")}>
        <div className="card-details">
          <p className="text-title">BAPTISM RECORDS</p>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetails;
