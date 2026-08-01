import React, { useEffect, useState } from "react";
import "./AdminLeads.css";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminProductInquiries = () => {

  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
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

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const token = localStorage.getItem("token");

 useEffect(() => {
  fetchInquiries();
  fetchStats();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);

  useEffect(() => {
  filterInquiries();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, statusFilter, inquiries]);

  /* FETCH INQUIRIES */

  const fetchInquiries = async () => {

    const res = await fetch(
  `${API_BASE}/api/admin/product-inquiries?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

    setInquiries(data.inquiries || []);
    setLoading(false);
  };

  /* FETCH STATS */

  const fetchStats = async () => {

    const res = await fetch(
      `${API_BASE}/api/admin/product-inquiries/stats`,
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
      `${API_BASE}/api/admin/product-inquiries/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      }
    );

    fetchInquiries();
    fetchStats();
  };

  /* DELETE INQUIRY */

  const deleteInquiry = async (id) => {

    if (!window.confirm("Delete this inquiry?")) return;

    await fetch(
      `${API_BASE}/api/admin/product-inquiries/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchInquiries();
    fetchStats();
  };

  /* FILTER */

  const filterInquiries = () => {

    let data = [...inquiries];

    if (search) {

    data = data.filter(
  (inquiry) =>
    inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
    inquiry.phone.includes(search) ||
    (inquiry.email || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (inquiry.gemName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
);

    }

    if (statusFilter !== "All") {
  data = data.filter(
    (inquiry) => inquiry.status === statusFilter
  );
}

    setFilteredInquiries(data);
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-wrapper">

      <h2>✨ product inquirires</h2>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <p>Total Inquiries</p>
          <h3>{stats.totalLeads}</h3>
        </div>

        <div className="stat-card">
          <p>Today's inq</p>
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
          placeholder="Search customer, gemstone, phone..."
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
              <th>Customer</th>
<th>Gemstone</th>
<th>Quality</th>
<th>Carat</th>
<th>Type</th>
<th>Phone</th>
<th>Status</th>
<th>WhatsApp</th>
<th>Delete</th>
            </tr>

          </thead>

          <tbody>

            {filteredInquiries.map((inquiry) => (

              <tr
  key={inquiry._id}
  onClick={() => setSelectedInquiry(inquiry)}
>
  <td>{inquiry.name}</td>

  <td>{inquiry.gemName}</td>

  <td>{inquiry.quality}</td>

  <td>{inquiry.carat} ct</td>

  <td>{inquiry.buyType}</td>

  <td>
    <a href={`tel:${inquiry.phone}`} className="phone-link">
      {inquiry.phone}
    </a>
  </td>

                {/* STATUS */}

                <td onClick={(e) => e.stopPropagation()}>

                  <select
                    className={`status-pill ${inquiry.status}`}
                    value={inquiry.status}
                    onChange={(e) =>
                      updateStatus(inquiry._id, e.target.value)
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
                    href={`https://wa.me/91${inquiry.phone}`}
                  >
                    WhatsApp
                  </a>

                </td>

                {/* DELETE */}

                <td onClick={(e) => e.stopPropagation()}>

                  <button
                    className="delete-btn"
                    onClick={() => deleteInquiry(inquiry._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredInquiries.length === 0 && (
          <div className="empty-state">No matching inquiries</div>
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

      {selectedInquiry && (

        <div className="lead-drawer">

          <div className="drawer-content">

            <button
              className="close-btn"
              onClick={() => setSelectedInquiry(null)}
            >
              ✕
            </button>

            <h3>{selectedInquiry.name}</h3>

<p><b>Gemstone:</b> {selectedInquiry.gemName}</p>

<p><b>Quality:</b> {selectedInquiry.quality}</p>

<p><b>Carat:</b> {selectedInquiry.carat} ct</p>

<p><b>Type:</b> {selectedInquiry.buyType}</p>

<p><b>Phone:</b> {selectedInquiry.phone}</p>

<p><b>Email:</b> {selectedInquiry.email}</p>

<p><b>Message:</b> {selectedInquiry.message || "No message"}</p>

<p><b>Status:</b> {selectedInquiry.status}</p>

<p>
  <b>Date:</b>{" "}
  {new Date(selectedInquiry.createdAt).toLocaleString()}
</p>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminProductInquiries;