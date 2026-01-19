import React from 'react';
import "../css/memberdetails.css";
import { useNavigate } from "react-router-dom";

const DeathRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="card-containermember">
      <div className="card" onClick={() => navigate("/AddDeathRecord")}>
        <div className="card-details">
          <p className="text-title">ADD A DEATH RECORD</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/ViewDeathRecords")}>
        <div className="card-details">
          <p className="text-title">VIEW DEATH RECORDS</p>
        </div>
      </div>
    </div>
  );
};

export default DeathRecords;
