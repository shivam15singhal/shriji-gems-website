import React, { useEffect, useState } from "react";
import "./AdminLeads.css";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminLeads = () => {

  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    closedLeads: 0
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [page]);

  useEffect(() => {
    filterLeads();
  }, [search, statusFilter, leads]);

  /* FETCH LEADS */

  const fetchLeads = async () => {

    const res = await fetch(
  `${API_BASE}/api/admin/leads?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

    setLeads(data.leads || []);
    setLoading(false);
  };

  /* FETCH STATS */

  const fetchStats = async () => {

    const res = await fetch(
      `${API_BASE}/api/admin/stats`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

    setStats(data);
  };

  /* UPDATE STATUS */

  const updateStatus = async (id, status) => {

    await fetch(
      `${API_BASE}/api/admin/leads/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      }
    );

    fetchLeads();
    fetchStats();
  };

  /* DELETE LEAD */

  const deleteLead = async (id) => {

    if (!window.confirm("Delete this lead?")) return;

    await fetch(
      `${API_BASE}/api/admin/leads/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchLeads();
    fetchStats();
  };

  /* FILTER */

  const filterLeads = () => {

    let data = [...leads];

    if (search) {

      data = data.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        (lead.email || "").toLowerCase().includes(search.toLowerCase())
      );

    }

    if (statusFilter !== "All") {
      data = data.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(data);
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-wrapper">

      <h2>✨ Admin Dashboard</h2>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <p>Total Leads</p>
          <h3>{stats.totalLeads}</h3>
        </div>

        <div className="stat-card">
          <p>Today's Leads</p>
          <h3>{stats.todayLeads}</h3>
        </div>

        <div className="stat-card">
          <p>New</p>
          <h3>{stats.newLeads}</h3>
        </div>

        <div className="stat-card">
          <p>Contacted</p>
          <h3>{stats.contactedLeads}</h3>
        </div>

        <div className="stat-card">
          <p>Closed</p>
          <h3>{stats.closedLeads}</h3>
        </div>

      </div>

      {/* SEARCH */}

      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search name, phone, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >

          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Closed</option>

        </select>

      </div>

      {/* TABLE */}

      <div className="admin-card">

        <table className="admin-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Budget</th>
              <th>Date</th>
              <th>Status</th>
              <th>WhatsApp</th>
              <th>Delete</th>
            </tr>

          </thead>

          <tbody>

            {filteredLeads.map((lead) => (

              <tr
                key={lead._id}
                onClick={() => setSelectedLead(lead)}
              >

                <td>{lead.name}</td>

                <td>
                  <a href={`tel:${lead.phone}`} className="phone-link">
                    {lead.phone}
                  </a>
                </td>

                <td>{lead.email}</td>

                <td>{lead.budget}</td>

                <td>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>

                {/* STATUS */}

                <td onClick={(e) => e.stopPropagation()}>

                  <select
                    className={`status-pill ${lead.status}`}
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead._id, e.target.value)
                    }
                  >

                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>

                  </select>

                </td>

                {/* WHATSAPP */}

                <td onClick={(e) => e.stopPropagation()}>

                  <a
                    className="whatsapp-btn"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/91${lead.phone}`}
                  >
                    WhatsApp
                  </a>

                </td>

                {/* DELETE */}

                <td onClick={(e) => e.stopPropagation()}>

                  <button
                    className="delete-btn"
                    onClick={() => deleteLead(lead._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredLeads.length === 0 && (
          <div className="empty-state">No matching leads</div>
        )}

        {/* PAGINATION */}

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

      {/* LEAD DRAWER */}

      {selectedLead && (

        <div className="lead-drawer">

          <div className="drawer-content">

            <button
              className="close-btn"
              onClick={() => setSelectedLead(null)}
            >
              ✕
            </button>

            <h3>{selectedLead.name}</h3>

            <p><b>Phone:</b> {selectedLead.phone}</p>

            <p><b>Email:</b> {selectedLead.email}</p>

            <p><b>Budget:</b> {selectedLead.budget}</p>

            <p><b>Status:</b> {selectedLead.status}</p>

            <p>
              <b>Date:</b>{" "}
              {new Date(selectedLead.createdAt).toLocaleString()}
            </p>

            <a
              className="whatsapp-btn"
              href={`https://wa.me/91${selectedLead.phone}`}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </a>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminLeads;