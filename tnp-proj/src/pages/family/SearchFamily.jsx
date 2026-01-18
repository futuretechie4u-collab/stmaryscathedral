import React, { useEffect, useState } from "react";
import "../../css/searchfamily.css";
import { useNavigate } from "react-router-dom";
import { generateTablePdf } from "../../utils/pdfExport";

const SearchFamily = () => {
  const [families, setFamilies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch("https://stmaryscathedral.onrender.com/api/families")
      .then((res) => res.json())
      .then((data) => setFamilies(data))
      .catch((err) =>
        console.error("Error fetching families:", err)
      );
  }, []);

  /* ================= FILTER ================= */
  const filteredFamilies = families.filter((fam) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase().trim();

    // 1️⃣ Family name
    const familyMatch =
      fam.name?.toLowerCase().includes(term);

    // 2️⃣ Head of family
    const hofMatch =
      fam.hof?.toLowerCase().includes(term);

    // 3️⃣ Ward / unit name
    const unitMatch =
      fam.family_unit?.toLowerCase().includes(term);

    // 4️⃣ Ward number (CORE REQUIREMENT)
    const wardNumberMatch =
      fam.ward_number?.toLowerCase() === term ||
      `ward ${fam.ward_number}` === term ||
      `block ${fam.ward_number}` === term;

    return (
      familyMatch ||
      hofMatch ||
      unitMatch ||
      wardNumberMatch
    );
  });

  return (
    <>
      {/* ================= SEARCH INPUT ================= */}
      <div className="container-input4">
        <input
          type="text"
          placeholder="SEARCH BY FAMILY / WARD NUMBER / WARD NAME"
          className="input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="member-table-container1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2>FAMILIES ({filteredFamilies.length})</h2>

          <button
            type="button"
            className="submit-btn"
            onClick={() => {
              const columns = [
                { key: "slNo", header: "Sl No" },
                { key: "familyNumber", header: "Family No" },
                { key: "familyName", header: "Family Name" },
                { key: "hof", header: "HoF" },
                { key: "ward", header: "Ward Name" },
                { key: "wardNo", header: "Ward No" },
              ];

              const rows = filteredFamilies.map(
                (fam, index) => ({
                  slNo: index + 1,
                  familyNumber: fam.family_number,
                  familyName: fam.name,
                  hof: fam.hof,
                  ward: fam.family_unit,
                  wardNo: fam.ward_number,
                })
              );

              generateTablePdf({
                title: "Family List",
                columns,
                rows,
                fileName: "families.pdf",
              });
            }}
          >
            Download PDF
          </button>
        </div>

        <div className="table-wrapper1">
          <table className="member-table">
            <thead>
              <tr>
                <th>FAMILY NO</th>
                <th>FAMILY NAME</th>
                <th>HoF</th>
                <th>WARD NAME</th>
                <th>WARD NO</th>
              </tr>
            </thead>

            <tbody>
              {filteredFamilies.length > 0 ? (
                filteredFamilies.map((fam) => (
                  <tr
                    key={fam._id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate("/SearchedFam", {
                        state: fam,
                      })
                    }
                  >
                    <td>{fam.family_number}</td>
                    <td>{fam.name}</td>
                    <td>{fam.hof}</td>
                    <td>{fam.family_unit}</td>
                    <td>{fam.ward_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    No families found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SearchFamily;
