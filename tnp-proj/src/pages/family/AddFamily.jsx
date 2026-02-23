import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/addfamily.css";
const AddFamily = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    family_number: "",
    name: "",
    hof: "",
    count: "",
    location: "",
    village: "",
    contact_number: "",
    family_unit: "",
    ward_number: ""
  });

  const [blocks, setBlocks] = useState([]);
  const [units, setUnits] = useState([]);

  // FETCH BLOCKS
  useEffect(() => {
    axios.get("https://stmaryscathedral.onrender.com/api/families/blocks/list")
      .then(res => {
        console.log("Blocks:", res.data);
        setBlocks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // FETCH UNITS
  useEffect(() => {
    axios.get("https://stmaryscathedral.onrender.com/api/families/units/list")
      .then(res => {
        console.log("Units:", res.data);
        setUnits(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://stmaryscathedral.onrender.com/api/families",
        form
      );

      alert("Family added successfully");

      navigate("/ExistingFamilymem", {
        state: {
          family_number: form.family_number
        }
      });

    } catch (err) {

      alert(err.response?.data?.error || err.message);

    }
  };

  return (
    <div className="container">

      <form className="register-form" onSubmit={handleSubmit}>

        {/* BLOCK DROPDOWN */}
        <div className="input-group">
          <select
            name="ward_number"
            value={form.ward_number}
            onChange={handleChange}
            required
          >
            <option value="">Select Block Number</option>

            {blocks.map((block, index) => (
              <option key={index} value={block}>
                {block}
              </option>
            ))}

          </select>
          <label>Block Number</label>
        </div>


        {/* UNIT DROPDOWN */}
        <div className="input-group">
          <select
            name="family_unit"
            value={form.family_unit}
            onChange={handleChange}
            required
          >
            <option value="">Select Unit Number</option>

            {units.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}

          </select>
          <label>Unit Number</label>
        </div>


        {/* FAMILY NUMBER */}
        <div className="input-group">
          <input
            type="text"
            name="family_number"
            value={form.family_number}
            onChange={handleChange}
            required
          />
          <label>Family Number</label>
        </div>


        {/* FAMILY NAME */}
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Family Name</label>
        </div>


        {/* HEAD OF FAMILY */}
        <div className="input-group">
          <input
            type="text"
            name="hof"
            value={form.hof}
            onChange={handleChange}
            required
          />
          <label>Head of Family</label>
        </div>


        {/* MEMBER COUNT */}
        <div className="input-group">
          <input
            type="number"
            name="count"
            value={form.count}
            onChange={handleChange}
          />
          <label>Member Count</label>
        </div>


        {/* LOCATION */}
        <div className="input-group">
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <label>Location</label>
        </div>


        {/* VILLAGE */}
        <div className="input-group">
          <input
            type="text"
            name="village"
            value={form.village}
            onChange={handleChange}
          />
          <label>Village</label>
        </div>


        {/* CONTACT NUMBER */}
        <div className="input-group">
          <input
            type="text"
            name="contact_number"
            value={form.contact_number}
            onChange={handleChange}
          />
          <label>Contact Number</label>
        </div>


        {/* FAMILY UNIT NAME TEXT FIELD (optional separate field) */}
        <div className="input-group">
          <input
            type="text"
            name="family_unit_name"
            value={form.family_unit_name || ""}
            onChange={handleChange}
          />
          <label>Kudumb Unit Name</label>
        </div>


        <button type="submit" className="submit-btn">
          Submit
        </button>

      </form>

    </div>
  );
};

export default AddFamily;