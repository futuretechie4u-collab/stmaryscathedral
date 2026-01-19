// src/components/AddMember.jsx
import React, { useState } from "react";
import api from "../api";

function AddMember({ onMemberAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [family, setFamily] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/members", {
        name,
        age,
        family,
        role,
      });

      if (onMemberAdded) {
        onMemberAdded(res.data); // update list in parent
      }

      // clear form
      setName("");
      setAge("");
      setFamily("");
      setRole("");
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add New Member</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Family"
        value={family}
        onChange={(e) => setFamily(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button type="submit">Add Member</button>
    </form>
  );
}

export default AddMember;
