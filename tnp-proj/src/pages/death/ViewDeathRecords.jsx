import React, { useEffect, useState } from "react";
import "../../css/viewdeath.css";
import { generateTablePdf, generateDeathCertificatePdf } from "../../utils/pdfExport";

const ViewDeathRecords = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/deaths`);
      if (!res.ok) throw new Error("Failed to fetch death records");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching records: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 Search logic */
  const filteredRecords = records.filter((rec) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();

    return (
      (rec.name || "").toLowerCase().includes(s) ||
      (rec.house_name || "").toLowerCase().includes(s) ||
      (rec.family_no || "").toString().includes(s) ||
      (rec.address_place || "").toLowerCase().includes(s) ||
      (rec.father_husband_name || "").toLowerCase().includes(s) ||
      (rec.mother_wife_name || "").toLowerCase().includes(s) ||
      (rec.cause_of_death || "").toLowerCase().includes(s) ||
      (rec.conducted_by || "").toLowerCase().includes(s) ||
      (rec.isParishioner === false && "non parishioner".includes(s)) ||
      (rec.isParishioner !== false && "parishioner".includes(s))
    );
  });

  return (
    <div className="death-container">
      {/* 🔍 Search */}
      <div className="container-input2">
        <input
          type="text"
          placeholder="🔍 Search by name, family no, parishioner, cause..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
          background: "white",
          padding: "20px 30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Death Records ({filteredRecords.length})</h2>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={fetchRecords}
            className="submit-btn"
            style={{ background: "linear-gradient(135deg,#ff6a00,#ee0979)" }}
          >
            🔄 Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              const columns = [
                { key: "slNo", header: "Sl No" },
                { key: "status", header: "Status" },
                { key: "familyNo", header: "Family No" },
                { key: "name", header: "Name" },
                { key: "houseName", header: "House Name" },
                { key: "addressPlace", header: "Address/Place" },
                { key: "fatherHusbandName", header: "Father/Husband Name" },
                { key: "motherWifeName", header: "Mother/Wife Name" },
                { key: "deathDate", header: "Death Date" },
                { key: "burialDate", header: "Burial Date" },
                { key: "age", header: "Age" },
                { key: "conductedBy", header: "Conducted by" },
                { key: "causeOfDeath", header: "Cause of Death" },
                { key: "cellNo", header: "Cell No" },
                { key: "remarks", header: "Remarks" },
              ];

              const rows = filteredRecords.map((rec, index) => ({
                slNo: index + 1,
                status:
                  rec.isParishioner === false
                    ? "Non-Parishioner"
                    : "Parishioner",
                familyNo: rec.family_no || "-",
                name: rec.name,
                houseName: rec.house_name || "-",
                addressPlace: rec.address_place || "-",
                fatherHusbandName: rec.father_husband_name || "-",
                motherWifeName: rec.mother_wife_name || "-",
                deathDate: rec.death_date
                  ? new Date(rec.death_date).toLocaleDateString("en-IN")
                  : "-",
                burialDate: rec.burial_date
                  ? new Date(rec.burial_date).toLocaleDateString("en-IN")
                  : "-",
                age: rec.age || "-",
                conductedBy: rec.conducted_by || "-",
                causeOfDeath: rec.cause_of_death || "-",
                cellNo: rec.cell_no || "-",
                remarks: rec.remarks || "-",
              }));

              generateTablePdf({
                title: "Death Records",
                columns,
                rows,
                fileName: "death_records.pdf",
              });
            }}
            className="submit-btn"
            style={{ background: "#8b5e3c" }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-box">Loading death records...</div>
      ) : (
        <div className="table-wrapper1">
          <table className="death-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Status</th>
                <th>Family No</th>
                <th>Name</th>
                <th>House Name</th>
                <th>Address/Place</th>
                <th>Father/Husband</th>
                <th>Mother/Wife</th>
                <th>Death Date</th>
                <th>Burial Date</th>
                <th>Age</th>
                <th>Conducted by</th>
                <th>Cause</th>
                <th>Cell No</th>
                <th>Remarks</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec._id}>
                    <td>{rec.sl_no}</td>
                    <td>
                      <strong
                        style={{
                          color:
                            rec.isParishioner === false
                              ? "#c0392b"
                              : "#27ae60",
                        }}
                      >
                        {rec.isParishioner === false
                          ? "Non-Parishioner"
                          : "Parishioner"}
                      </strong>
                    </td>
                    <td>{rec.family_no || "-"}</td>
                    <td>{rec.name}</td>
                    <td>{rec.house_name || "-"}</td>
                    <td>{rec.address_place || "-"}</td>
                    <td>{rec.father_husband_name || "-"}</td>
                    <td>{rec.mother_wife_name || "-"}</td>
                    <td>
                      {rec.death_date
                        ? new Date(rec.death_date).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                    <td>
                      {rec.burial_date
                        ? new Date(rec.burial_date).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                    <td>{rec.age || "-"}</td>
                    <td>{rec.conducted_by || "-"}</td>
                    <td>{rec.cause_of_death || "-"}</td>
                    <td>{rec.cell_no || "-"}</td>
                    <td>{rec.remarks || "-"}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => generateDeathCertificatePdf(rec)}
                        className="submit-btn"
                      >
                        Certificate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="16" style={{ textAlign: "center", padding: "40px" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {search && filteredRecords.length > 0 && (
        <div className="search-info">
          ✅ Found {filteredRecords.length} record
          {filteredRecords.length !== 1 ? "s" : ""} matching "{search}"
        </div>
      )}
    </div>
  );
};

export default ViewDeathRecords;
