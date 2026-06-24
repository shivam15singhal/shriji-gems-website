import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
const API = `${API_BASE}/api/admin`;

function AdminGems() {

  const [gems, setGems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

  useEffect(() => {
    loadGems();
  }, []);

  async function loadGems() {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/gems`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setGems(res.data?.gems || []);

    } catch (err) {

      console.error("Failed to load gems", err);

    }

  }

  async function deleteGem(id) {

    if (!window.confirm("Delete this gem?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`${API}/gems/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      loadGems();

    } catch (err) {

      alert("Delete failed");

    }

  }

  const filteredGems = gems.filter((gem) => {

    const matchesSearch = gem.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "low") {

      return (
        matchesSearch &&
        gem.variants?.some(v => v.stock > 0 && v.stock <= 3)
      );

    }

    if (filter === "out") {

      return (
        matchesSearch &&
        gem.variants?.every(v => v.stock === 0)
      );

    }

    return matchesSearch;

  });

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedGems = filteredGems.slice(start, end);

  const totalPages = Math.ceil(filteredGems.length / limit);

  return (

    <AdminLayout>

      <div>

        <h1 style={{ marginBottom: 20 }}>Gem Product Manager</h1>

        {/* ACTION BAR */}

        <div style={{ marginBottom: 20 }}>

          <input
            placeholder="Search gems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              marginRight: 10,
              border: "1px solid #ddd",
              borderRadius: 6
            }}
          />

          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => setFilter("low")}
          >
            Low Stock
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => setFilter("out")}
          >
            Out of Stock
          </button>

          <button
            style={{
              marginLeft: 20,
              padding: "10px 20px",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/admin/gems/new")}
          >
            + Add Gem
          </button>

        </div>

        {/* TABLE */}

        <table
          style={{
            width: "100%",
            background: "white",
            borderRadius: "8px"
          }}
          cellPadding="12"
        >

          <thead style={{ background: "#f3f3f3" }}>
            <tr>
              <th>Gem</th>
              <th>Variants</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedGems.length === 0 ? (

              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No gems found
                </td>
              </tr>

            ) : (

              paginatedGems.map((gem) => (

                <tr key={gem._id}>

                  <td>{gem.name}</td>

                  <td>{gem.variants?.length || 0}</td>

                  <td>

                    <button
                      style={{ marginRight: 10 }}
                      onClick={() => navigate(`/admin/gems/edit/${gem._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px"
                      }}
                      onClick={() => deleteGem(gem._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

        {/* PAGINATION */}

        <div style={{ marginTop: 20 }}>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              style={{
                marginLeft: 5,
                fontWeight: page === i + 1 ? "bold" : "normal"
              }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>

          ))}

          <button
            style={{ marginLeft: 5 }}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdminGems;