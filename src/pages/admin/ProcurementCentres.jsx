import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronDown,
  Edit3,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import "./ProcurementCentres.css";

const initialCentres = [
  {
    code: "BPC-001",
    name: "Bhopal Mandi Procurement Centre",
    location: "Bhopal",
    capacity: 1000,
    institution: "Madhya Pradesh State Cooperative Marketing Federation",
    status: "Active",
  },
  {
    code: "BPC-002",
    name: "Berasia Procurement Centre",
    location: "Berasia, Bhopal",
    capacity: 900,
    institution: "MP State Cooperative Marketing Federation",
    status: "Active",
  },
  {
    code: "BPC-003",
    name: "Phanda Procurement Centre",
    location: "Phanda, Bhopal",
    capacity: 850,
    institution: "District Cooperative Marketing Society, Bhopal",
    status: "Active",
  },
  {
    code: "BPC-004",
    name: "Bairagarh Procurement Centre",
    location: "Bairagarh, Bhopal",
    capacity: 750,
    institution: "District Cooperative Marketing Society, Bhopal",
    status: "Inactive",
  },
  {
    code: "BPC-005",
    name: "Kolar Procurement Centre",
    location: "Kolar Road, Bhopal",
    capacity: 800,
    institution: "MP State Cooperative Marketing Federation",
    status: "Active",
  },
  {
    code: "BPC-006",
    name: "Gandhi Nagar Procurement Centre",
    location: "Gandhi Nagar, Bhopal",
    capacity: 700,
    institution: "District Cooperative Marketing Society, Bhopal",
    status: "Active",
  },
  {
    code: "BPC-007",
    name: "Misrod Procurement Centre",
    location: "Misrod, Bhopal",
    capacity: 650,
    institution: "MP State Cooperative Marketing Federation",
    status: "Active",
  },
  {
    code: "BPC-008",
    name: "Ayodhya Bypass Procurement Centre",
    location: "Ayodhya Bypass, Bhopal",
    capacity: 780,
    institution: "District Cooperative Marketing Society, Bhopal",
    status: "Inactive",
  },
];

function emptyCentre() {
  return {
    code: "",
    name: "",
    location: "",
    capacity: "",
    institution: "",
    status: "Active",
  };
}

export default function ProcurementCentres({ onBack }) {
  const [centres, setCentres] = useState(initialCentres);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [form, setForm] = useState(emptyCentre());

  const filteredCentres = useMemo(() => {
    const query = search.trim().toLowerCase();

    return centres.filter((centre) => {
      const matchesSearch =
        !query ||
        centre.code.toLowerCase().includes(query) ||
        centre.name.toLowerCase().includes(query) ||
        centre.location.toLowerCase().includes(query) ||
        centre.institution.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || centre.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [centres, search, statusFilter]);

  const activeCount = centres.filter((c) => c.status === "Active").length;
  const inactiveCount = centres.filter((c) => c.status === "Inactive").length;
  const totalCapacity = centres.reduce(
    (total, centre) => total + Number(centre.capacity || 0),
    0
  );

  const openAddForm = () => {
    setEditingCode(null);
    setForm(emptyCentre());
    setShowForm(true);
  };

  const openEditForm = (centre) => {
    setEditingCode(centre.code);
    setForm({ ...centre });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCode(null);
    setForm(emptyCentre());
  };

  const handleFormChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const code = form.code.trim();
    const name = form.name.trim();
    const location = form.location.trim();
    const institution = form.institution.trim();
    const capacity = Number(form.capacity);

    if (!code || !name || !location || !institution || !capacity) {
      return;
    }

    const cleaned = {
      ...form,
      code,
      name,
      location,
      institution,
      capacity,
    };

    if (editingCode) {
      setCentres((current) =>
        current.map((centre) =>
          centre.code === editingCode ? cleaned : centre
        )
      );
    } else {
      const duplicate = centres.some((centre) => centre.code === code);
      if (duplicate) {
        return;
      }

      setCentres((current) => [cleaned, ...current]);
    }

    closeForm();
  };

  return (
    <div className="procurement-centres-page">
      <header className="pc-header">
        <div className="pc-header-left">
          <button className="pc-back-btn" onClick={onBack}>
            <ArrowLeft size={17} />
            Back to Admin Overview
          </button>

          <div className="pc-title">
            <div className="pc-title-icon">
              <Building2 size={22} />
            </div>
            <div>
              <p>ADMIN FEATURE 02</p>
              <h1>Procurement Centres</h1>
              <span>Manage all registered and approved centres in the district</span>
            </div>
          </div>
        </div>

        <div className="pc-admin">
          <div className="pc-admin-avatar">AD</div>
          <div>
            <strong>Government Admin</strong>
            <span>Bhopal District</span>
          </div>
        </div>
      </header>

      <section className="pc-summary-grid">
        <SummaryCard label="Total Centres" value={centres.length} />
        <SummaryCard label="Active Centres" value={activeCount} type="active" />
        <SummaryCard label="Inactive Centres" value={inactiveCount} type="inactive" />
        <SummaryCard
          label="Total Capacity"
          value={`${totalCapacity.toLocaleString()} Qtl`}
        />
      </section>

      <section className="pc-toolbar-card">
        <div className="pc-toolbar-heading">
          <div>
            <p>ALL CENTRES</p>
            <h2>Procurement Centre List</h2>
            <span>Search and manage centre information</span>
          </div>

          <button className="pc-add-btn" onClick={openAddForm}>
            <Plus size={16} />
            Add New Centre
          </button>
        </div>

        <div className="pc-toolbar">
          <div className="pc-search">
            <Search size={16} />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by centre code, name, location or institution"
            />
          </div>

          <div className="pc-filter">
            <span>Status</span>
            <div className="pc-select-wrap">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </section>

      <section className="pc-table-card">
        <div className="pc-table-head">
          <span>Centre Code</span>
          <span>Centre Name & Location</span>
          <span>Capacity</span>
          <span>Operating Institution</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredCentres.length === 0 ? (
          <div className="pc-empty">
            <Building2 size={24} />
            <strong>No procurement centres found</strong>
            <span>Try changing the search or status filter.</span>
          </div>
        ) : (
          filteredCentres.map((centre) => (
            <div className="pc-table-row" key={centre.code}>
              <div>
                <strong className="pc-code">{centre.code}</strong>
              </div>

              <div className="pc-centre-name">
                <strong>{centre.name}</strong>
                <span>
                  <MapPin size={12} />
                  {centre.location}
                </span>
              </div>

              <strong>{Number(centre.capacity).toLocaleString()} Qtl</strong>

              <span className="pc-institution">{centre.institution}</span>

              <span className={`pc-status ${centre.status.toLowerCase()}`}>
                {centre.status === "Active" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <XCircle size={13} />
                )}
                {centre.status}
              </span>

              <button
                className="pc-edit-btn"
                onClick={() => openEditForm(centre)}
              >
                <Edit3 size={14} />
                Edit
              </button>
            </div>
          ))
        )}
      </section>

      <div className="pc-note">
        <ShieldCheck size={14} />
        <span>Only authorized government administrators can add or update procurement centres.</span>
      </div>

      {showForm && (
        <div className="pc-modal-backdrop" onMouseDown={closeForm}>
          <div
            className="pc-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="pc-modal-header">
              <div>
                <p>{editingCode ? "UPDATE CENTRE" : "ADD CENTRE"}</p>
                <h2>
                  {editingCode
                    ? "Update Procurement Centre"
                    : "Add New Procurement Centre"}
                </h2>
              </div>

              <button className="pc-close-btn" onClick={closeForm}>
                <XCircle size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="pc-form-grid">
                <Field
                  label="Centre Code"
                  value={form.code}
                  disabled={Boolean(editingCode)}
                  placeholder="e.g. HPC-009"
                  onChange={(value) => handleFormChange("code", value)}
                />

                <Field
                  label="Centre Name"
                  value={form.name}
                  placeholder="Enter centre name"
                  onChange={(value) => handleFormChange("name", value)}
                />

                <Field
                  label="Location"
                  value={form.location}
                  placeholder="Enter centre location"
                  onChange={(value) =>
                    handleFormChange("location", value)
                  }
                />

                <Field
                  label="Capacity (Qtl)"
                  type="number"
                  value={form.capacity}
                  placeholder="Enter capacity"
                  onChange={(value) =>
                    handleFormChange("capacity", value)
                  }
                />

                <div className="pc-field pc-field-wide">
                  <label>Operating Institution</label>
                  <input
                    value={form.institution}
                    onChange={(event) =>
                      handleFormChange("institution", event.target.value)
                    }
                    placeholder="Enter operating institution"
                  />
                </div>

                <div className="pc-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      handleFormChange("status", event.target.value)
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pc-modal-actions">
                <button type="button" className="pc-cancel-btn" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="pc-save-btn">
                  <CheckCircle2 size={15} />
                  {editingCode ? "Update Centre" : "Add Centre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, type }) {
  return (
    <div className="pc-summary-card">
      <div className={`pc-summary-icon ${type || ""}`}>
        {type === "inactive" ? <XCircle size={17} /> : <Building2 size={17} />}
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) {
  return (
    <div className="pc-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
