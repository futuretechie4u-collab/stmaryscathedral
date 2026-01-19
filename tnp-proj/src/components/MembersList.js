// src/components/MembersList.jsx
import React, { useEffect } from "react";
import api from "../api";

function MembersList({ members, setMembers }) {
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await api.get("/members");
      setMembers(res.data);
    };
    fetchMembers();
  }, [setMembers]);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map((m) => (
          <li key={m._id}>
            {m.name} — {m.age} years — {m.family} — {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MembersList;
