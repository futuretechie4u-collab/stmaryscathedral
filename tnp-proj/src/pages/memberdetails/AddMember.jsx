import React from 'react'
import { useNavigate } from "react-router-dom"
import "../../css/memberdetails.css"

const AddMember = () => {
  const navigate = useNavigate();
  return (
    <div className="card-container1">
      <div className="card" onClick={() => navigate("/ExistingFamilymem")}>
        <div className="card-details">
          <span className="card-icon">🏠</span>
          <p className="text-title">Existing Family</p>
        </div>
      </div>
      <div className="card" onClick={() => navigate("/AddFamily")}>
        <div className="card-details">
          <span className="card-icon">✨</span>
          <p className="text-title">New Family</p>
        </div>
      </div>
    </div>
  )
}

export default AddMember
