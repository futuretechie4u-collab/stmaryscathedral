import React, { useState, useEffect } from 'react';
import "../../css/viewmarriage.css";
import { generateTablePdf, generateMarriageCertificatePdf } from "../../utils/pdfExport";

const ViewMarriage = () => {
  const [marriages, setMarriages] = useState([]);
  const [filteredMarriages, setFilteredMarriages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMarriage, setSelectedMarriage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ totalMarriages: 0, marriagesThisYear: 0 });

  useEffect(() => {
    fetchMarriages();
    fetchStats();
  }, []);

  const fetchMarriages = async () => {
    try {
      setLoading(true);
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/marriages`);
      const data = await res.json();
      setMarriages(data);
      setFilteredMarriages(data);
    } catch (err) {
      console.error("Error fetching marriages:", err);
      alert("❌ Error loading marriages");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/marriages/stats/overview`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  /* SEARCH + YEAR FILTER */
  useEffect(() => {
    let filtered = marriages;
    if (searchQuery.trim()) {
      filtered = filtered.filter((m) =>
        m.spouse1_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.spouse2_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.marriage_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterYear) {
      filtered = filtered.filter((m) =>
        new Date(m.date).getFullYear().toString() === filterYear
      );
    }
    setFilteredMarriages(filtered);
  }, [searchQuery, filterYear, marriages]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  const getYears = () => {
    const years = marriages.map((m) => new Date(m.date).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  };

  /* VIEW */
  const handleView = (marriage) => {
    setSelectedMarriage(marriage);
    setEditMode(false);
    setShowModal(true);
  };

  /* OPEN EDIT MODAL */
  const handleEdit = (marriage) => {
    setSelectedMarriage(marriage);
    setEditData({
      marriage_id: marriage.marriage_id || "",
      date: marriage.date ? marriage.date.split("T")[0] : "",
      place: marriage.place || "",
      officiant_number: marriage.officiant_number || "",
      spouse1: marriage.spouse1_name || "",
      spouse2: marriage.spouse2_name || "",
      isGroomParishioner: marriage.spouse1_isParishioner !== false,
      isBrideParishioner: marriage.spouse2_isParishioner !== false,
      remarks: marriage.remarks || "",
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  /* SAVE */
  const handleSave = async () => {
    setSaving(true);
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/marriages/${selectedMarriage._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error();
      alert("✅ Marriage updated successfully!");
      closeModal();
      fetchMarriages();
    } catch {
      alert("❌ Error updating marriage");
    } finally {
      setSaving(false);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this marriage record?")) return;
    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/marriages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      alert("✅ Marriage deleted successfully!");
      fetchMarriages();
      fetchStats();
    } catch {
      alert("❌ Error deleting marriage");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedMarriage(null);
    setEditData({});
  };

  return (
    <div className="view-marriage-container">

      {/* SEARCH */}
      <div className="marriage-search">
        <input
          type="text"
          placeholder="🔍 Search by name or marriage ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
      </div>

      {/* HEADER */}
      <div className="marriage-header">
        <h2>Marriage Records ({filteredMarriages.length})</h2>

        {/* Stats */}
        <div className="marriage-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalMarriages}</div>
            <div className="stat-label">Total Marriages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.marriagesThisYear}</div>
            <div className="stat-label">This Year</div>
          </div>
        </div>

        {/* Buttons + year filter */}
        <div className="marriage-header-buttons">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="marriage-year-select"
          >
            <option value="">All Years</option>
            {getYears().map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <button
            onClick={() => { setSearchQuery(""); setFilterYear(""); }}
            className="submit-btn"
          >
            Clear Filters
          </button>

          <button onClick={fetchMarriages} className="submit-btn">
            🔄 Refresh
          </button>

          <button
            type="button"
            className="submit-btn"
            style={{ background: "#8b5e3c" }}
            onClick={() => {
              const columns = [
                { key: "marriageId", header: "Marriage ID" },
                { key: "groom", header: "Groom" },
                { key: "groomStatus", header: "Groom Status" },
                { key: "bride", header: "Bride" },
                { key: "brideStatus", header: "Bride Status" },
                { key: "date", header: "Date" },
                { key: "place", header: "Place" },
              ];
              const rows = filteredMarriages.map((m) => ({
                marriageId: m.marriage_id,
                groom: m.spouse1_name,
                groomStatus: m.spouse1_isParishioner !== false ? "Parishioner" : "Non-Parishioner",
                bride: m.spouse2_name,
                brideStatus: m.spouse2_isParishioner !== false ? "Parishioner" : "Non-Parishioner",
                date: formatDate(m.date),
                place: m.place || "N/A",
              }));
              generateTablePdf({ title: "Marriage Records", columns, rows, fileName: "marriage_records.pdf" });
            }}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="loading-box">Loading marriage records...</div>
      ) : (
        <div className="table-wrapper1">
          <table className="view-marriage-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Marriage ID</th>
                <th>Groom</th>
                <th>Bride</th>
                <th>Date</th>
                <th>Place</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarriages.length > 0 ? (
                filteredMarriages.map((marriage, index) => (
                  <tr key={marriage._id}>
                    <td>{index + 1}</td>
                    <td>{marriage.marriage_id}</td>
                    <td>
                      {marriage.spouse1_name}
                      <small>{marriage.spouse1_isParishioner !== false ? "Parishioner" : "Non-Parishioner"}</small>
                    </td>
                    <td>
                      {marriage.spouse2_name}
                      <small>{marriage.spouse2_isParishioner !== false ? "Parishioner" : "Non-Parishioner"}</small>
                    </td>
                    <td>{formatDate(marriage.date)}</td>
                    <td>{marriage.place || "N/A"}</td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleView(marriage)}
                        className="submit-btn"
                        style={{ background: "#4caf50" }}
                      >
                        👁️ View
                      </button>
                      <button
                        onClick={() => handleEdit(marriage)}
                        className="submit-btn"
                        style={{ background: "#f39c12" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(marriage._id)}
                        className="submit-btn"
                        style={{ background: "#e74c3c" }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => generateMarriageCertificatePdf(marriage)}
                        className="submit-btn"
                      >
                        Certificate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    {searchQuery || filterYear
                      ? "No marriages found matching your criteria"
                      : "No marriage records available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL — VIEW / EDIT */}
      {showModal && selectedMarriage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h3>{editMode ? "✏️ Edit Marriage Record" : "👁️ View Marriage Record"}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              {editMode ? (
                /* ── EDIT ── */
                <>
                  <div className="modal-section-title">Couple Information</div>
                  <div className="modal-grid">
                    <div className="modal-field">
                      <label>Groom Name</label>
                      <input name="spouse1" value={editData.spouse1} onChange={handleEditChange} />
                    </div>
                    <div className="modal-field">
                      <label>Groom Status</label>
                      <select
                        name="isGroomParishioner"
                        value={editData.isGroomParishioner}
                        onChange={(e) => setEditData((p) => ({ ...p, isGroomParishioner: e.target.value === "true" }))}
                      >
                        <option value="true">Parishioner</option>
                        <option value="false">Non-Parishioner</option>
                      </select>
                    </div>
                    <div className="modal-field">
                      <label>Bride Name</label>
                      <input name="spouse2" value={editData.spouse2} onChange={handleEditChange} />
                    </div>
                    <div className="modal-field">
                      <label>Bride Status</label>
                      <select
                        name="isBrideParishioner"
                        value={editData.isBrideParishioner}
                        onChange={(e) => setEditData((p) => ({ ...p, isBrideParishioner: e.target.value === "true" }))}
                      >
                        <option value="true">Parishioner</option>
                        <option value="false">Non-Parishioner</option>
                      </select>
                    </div>
                  </div>

                  <div className="modal-section-title">Marriage Details</div>
                  <div className="modal-grid">
                    <div className="modal-field">
                      <label>Marriage ID</label>
                      <input name="marriage_id" value={editData.marriage_id} onChange={handleEditChange} />
                    </div>
                    <div className="modal-field">
                      <label>Date</label>
                      <input type="date" name="date" value={editData.date} onChange={handleEditChange} />
                    </div>
                    <div className="modal-field">
                      <label>Place</label>
                      <input name="place" value={editData.place} onChange={handleEditChange} />
                    </div>
                    <div className="modal-field">
                      <label>Officiant Number</label>
                      <input name="officiant_number" value={editData.officiant_number} onChange={handleEditChange} />
                    </div>
                  </div>

                  <div className="modal-section-title">Other</div>
                  <div className="modal-grid">
                    <div className="modal-field modal-field-full">
                      <label>Remarks</label>
                      <textarea name="remarks" value={editData.remarks} onChange={handleEditChange} rows={3} />
                    </div>
                  </div>
                </>
              ) : (
                /* ── VIEW ── */
                <>
                  <div className="modal-section-title">Marriage Information</div>
                  <div className="modal-info-row"><strong>Marriage ID:</strong> {selectedMarriage.marriage_id}</div>
                  <div className="modal-info-row"><strong>Date:</strong> {formatDate(selectedMarriage.date)}</div>
                  <div className="modal-info-row"><strong>Place:</strong> {selectedMarriage.place || "N/A"}</div>
                  <div className="modal-info-row"><strong>Officiant Number:</strong> {selectedMarriage.officiant_number || "N/A"}</div>

                  <div className="modal-section-title">Couple Information</div>
                  <div className="modal-couple-grid">
                    <div className="spouse-card">
                      <h4>Groom</h4>
                      <p><strong>Name:</strong> {selectedMarriage.spouse1_name}</p>
                      <p><strong>Status:</strong> {selectedMarriage.spouse1_isParishioner !== false ? "Parishioner" : "Non-Parishioner"}</p>
                      {selectedMarriage.spouse1_id?.phone && <p><strong>Phone:</strong> {selectedMarriage.spouse1_id.phone}</p>}
                      {selectedMarriage.spouse1_id?.family_number && <p><strong>Family:</strong> {selectedMarriage.spouse1_id.family_number}</p>}
                    </div>
                    <div className="spouse-card">
                      <h4>Bride</h4>
                      <p><strong>Name:</strong> {selectedMarriage.spouse2_name}</p>
                      <p><strong>Status:</strong> {selectedMarriage.spouse2_isParishioner !== false ? "Parishioner" : "Non-Parishioner"}</p>
                      {selectedMarriage.spouse2_id?.phone && <p><strong>Phone:</strong> {selectedMarriage.spouse2_id.phone}</p>}
                      {selectedMarriage.spouse2_id?.family_number && <p><strong>Family:</strong> {selectedMarriage.spouse2_id.family_number}</p>}
                    </div>
                  </div>

                  <div className="modal-section-title">Record Info</div>
                  <div className="modal-info-row"><strong>Created:</strong> {formatDate(selectedMarriage.createdAt)}</div>
                  <div className="modal-info-row"><strong>Last Updated:</strong> {formatDate(selectedMarriage.updatedAt)}</div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="submit-btn" style={{ background: "#aaa" }} onClick={closeModal}>
                Cancel
              </button>
              {editMode && (
                <button className="submit-btn" style={{ background: "#4caf50" }} onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
              )}
              {!editMode && (
                <button className="submit-btn" style={{ background: "#f39c12" }} onClick={() => setEditMode(true)}>
                  ✏️ Edit
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ViewMarriage;