import React from 'react';
import "../css/memberdetails.css";
import { useNavigate } from "react-router-dom";

const MemberDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="card-containermember">
      <div className="card" onClick={() => navigate("/AddMember")}>
        <div className="card-details">
          <p className="text-title">ADD MEMBERS</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/ViewMembers")}>
        <div className="card-details">
          <p className="text-title">VIEW MEMBERS</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/EditMember")}>
        <div className="card-details">
          <p className="text-title">EDIT MEMBERS</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
