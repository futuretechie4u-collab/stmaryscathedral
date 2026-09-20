import React from 'react';
import "../css/memberdetails.css";
import { useNavigate } from "react-router-dom";

const MemberDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="card-containermember">
      <div className="card" onClick={() => navigate("/AddMember")}>
        <div className="card-details">
          <span className="card-icon">➕</span>
          <p className="text-title">Add Members</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/ViewMembers")}>
        <div className="card-details">
          <span className="card-icon">👥</span>
          <p className="text-title">View Members</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/EditMember")}>
        <div className="card-details">
          <span className="card-icon">✏️</span>
          <p className="text-title">Edit Members</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
