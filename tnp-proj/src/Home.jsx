import React from 'react';
import './css/home.css';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaHome, FaHeart, FaBook, FaRing, FaMoneyCheckAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Family Details', icon: <FaHome />, path: '/FamilyDetails' },
    { label: 'Member Details', icon: <FaUsers />, path: '/MemberDetails' },
    { label: 'Baptism', icon: <FaHeart />, path: '/Baptism' },
    { label: 'Death Records', icon: <FaBook />, path: '/death-records' },
    { label: 'Marriage', icon: <FaRing />, path: '/Marriage' },
    { label: 'Subscription', icon: <FaMoneyCheckAlt />, path: '/subscription' }
  ];

  return (
    <div className="card-container">
      {items.map(({ label, icon, path }, index) => (
        <div
          className="card"
          key={index}
          onClick={() => path && navigate(path)}
          style={{ cursor: path ? 'pointer' : 'default' }}
          aria-label={label}
        >
          <div className="card-details">
            <p className="text-title">
              <span className="icon">{icon}</span>
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
