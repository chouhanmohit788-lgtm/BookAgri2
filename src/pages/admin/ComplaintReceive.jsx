import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Filter,
  MessageSquareText,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import "./ComplaintReceive.css";

const initialComplaints = [
  {
    id: "FC-1001",
    farmerName: "Rakesh Patel",
    kisanCode: "KSN-BPL-1042",
    centre: "Bhopal Mandi Procurement Centre",
    type: "Procurement Centre related",
    description:
      "Farmer reported a long waiting time and requested clarification about the procurement queue.",
    date: "28 Aug 2026",
    time: "10:15 AM",
    status: "Pending",
    action: "",
  },
  {
    id: "FC-1002",
    farmerName: "Sunita Verma",
    kisanCode: "KSN-BPL-1178",
    centre: "Berasia Procurement Centre",
    type: "Weighing / Quantity related",
    description:
      "Farmer reported a mismatch between the expected and recorded quantity after weighing.",
    date: "28 Aug 2026",
    time: "09:40 AM",
    status: "In Progress",
    action: "Weighing record is being checked with the centre operator.",
  },
  {
    id: "FC-1003",
    farmerName: "Mohan Singh",
    kisanCode: "KSN-BPL-1235",
    centre: "Phanda Procurement Centre",
    type: "Payment related",
    description:
      "Payment for the completed procurement transaction has not yet been reflected.",
    date: "27 Aug 2026",
    time: "04:20 PM",
    status: "Resolved",
    action: "Payment status verified and issue marked resolved.",
  },
  {
    id: "FC-1004",
    farmerName: "Kavita Sharma",
    kisanCode: "KSN-BPL-1321",
    centre: "Bairagarh Procurement Centre",
    type: "Quality related",
    description:
      "Farmer requested clarification regarding the quality assessment of the procured crop.",
    date: "27 Aug 2026",
    time: "01:05 PM",
    status: "Pending",
    action: "",
  },
  {
    id: "FC-1005",
    farmerName: "Dinesh Yadav",
    kisanCode: "KSN-BPL-1410",
    centre: "Kolar Procurement Centre",
    type: "Other",
    description:
      "Farmer requested help regarding the procurement process and token-related information.",
    date: "26 Aug 2026",
    time: "11:30 AM",
    status: "In Progress",
    action: "Centre details requested for verification.",
  },
];

const complaintTypes = [
  "All Types",
  "Procurement Centre related",
  "Weighing / Quantity related",
  "Payment related",
  "Quality related",
  "Other",
];

const statuses = ["All Status", "Pending", "In Progress", "Resolved"];

export default function FarmerComplaints({ onBack }) {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionText, setActionText] = useState("");

  const counts = {
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !query ||
        complaint.id.toLowerCase().includes(query) ||
        complaint.farmerName.toLowerCase().includes(query) ||
        complaint.kisanCode.toLowerCase().includes(query) ||
        complaint.centre.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All Types" || complaint.type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" || complaint.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [complaints, search, typeFilter, statusFilter]);

  const openComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setActionText(complaint.action || "");
  };

  const closeComplaint = () => {
    setSelectedComplaint(null);
    setActionText("");
  };

  const updateStatus = (nextStatus) => {
    if (!selectedComplaint) return;

    const updated = {
      ...selectedComplaint,
      status: nextStatus,
      action: actionText.trim(),
    };

    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === selectedComplaint.id ? updated : complaint
      )
    );

    setSelectedComplaint(updated);
  };

  return (
    <div className="farmer-complaints-page">
      <header className="fc-header">
        <button className="fc-back-btn" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <div className="fc-title">
          <div className="fc-title-icon">
            <MessageSquareText size={22} />
          </div>
          <div>
            <p>ADMIN FEATURE 03</p>
            <h1>Farmer Complaints</h1>
            <span>Review, track and resolve farmer complaints</span>
          </div>
        </div>

        <div className="fc-admin">
          <div className="fc-admin-avatar">AD</div>
          <div>
            <strong>Government Admin</strong>
            <span>Bhopal District</span>
          </div>
        </div>
      </header>

      <section className="fc-summary-grid">
        <Summary
          icon={<AlertCircle />}
          label="New / Pending Complaints"
          value={counts.pending}
          tone="pending"
        />
        <Summary
          icon={<Clock3 />}
          label="In Progress"
          value={counts.inProgress}
          tone="progress"
        />
        <Summary
          icon={<CheckCircle2 />}
          label="Resolved"
          value={counts.resolved}
          tone="resolved"
        />
        <Summary
          icon={<MessageSquareText />}
          label="Total Complaints"
          value={complaints.length}
          tone="total"
        />
      </section>

      <section className="fc-toolbar-card">
        <div className="fc-toolbar-heading">
          <div>
            <p>COMPLAINT MANAGEMENT</p>
            <h2>Complaint Register</h2>
            <span>Search and filter complaints received from farmers</span>
          </div>
          <Filter size={18} />
        </div>

        <div className="fc-toolbar">
          <div className="fc-search">
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search farmer, Kisan Code, centre or complaint ID"
            />
          </div>

          <SelectFilter
            label="Complaint Type"
            value={typeFilter}
            options={complaintTypes}
            onChange={setTypeFilter}
          />

          <SelectFilter
            label="Status"
            value={statusFilter}
            options={statuses}
            onChange={setStatusFilter}
          />
        </div>
      </section>

      <section className="fc-table-card">
        <div className="fc-table-head">
          <span>Farmer</span>
          <span>Procurement Centre</span>
          <span>Complaint Type</span>
          <span>Date & Time</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredComplaints.map((complaint) => (
          <div className="fc-table-row" key={complaint.id}>
            <div className="fc-farmer-cell">
              <div className="fc-farmer-icon">
                <UserRound size={14} />
              </div>
              <div>
                <strong>{complaint.farmerName}</strong>
                <span>{complaint.kisanCode}</span>
                <small>{complaint.id}</small>
              </div>
            </div>

            <div className="fc-centre-cell">
              <strong>{complaint.centre}</strong>
            </div>

            <span className="fc-type">{complaint.type}</span>

            <div className="fc-datetime">
              <strong>{complaint.date}</strong>
              <span>{complaint.time}</span>
            </div>

            <Status status={complaint.status} />

            <button
              className="fc-view-btn"
              onClick={() => openComplaint(complaint)}
            >
              <Eye size={14} />
              Review
            </button>
          </div>
        ))}

        {!filteredComplaints.length && (
          <div className="fc-empty">
            <MessageSquareText size={25} />
            <strong>No complaints found</strong>
            <span>Try changing the search or filters.</span>
          </div>
        )}
      </section>

      <div className="fc-note">
        <ShieldCheck size={14} />
        <span>Complaint history and admin actions should remain recorded for audit purposes.</span>
      </div>

      {selectedComplaint && (
        <div className="fc-modal-backdrop" onMouseDown={closeComplaint}>
          <div
            className="fc-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="fc-modal-header">
              <div>
                <p>COMPLAINT DETAILS</p>
                <h2>{selectedComplaint.id}</h2>
                <span>{selectedComplaint.date} · {selectedComplaint.time}</span>
              </div>
              <button className="fc-close-btn" onClick={closeComplaint}>
                <X size={18} />
              </button>
            </div>

            <div className="fc-detail-grid">
              <Detail label="Farmer Name" value={selectedComplaint.farmerName} />
              <Detail label="Kisan Code" value={selectedComplaint.kisanCode} />
              <Detail label="Related Procurement Centre" value={selectedComplaint.centre} wide />
              <Detail label="Complaint Type" value={selectedComplaint.type} wide />
            </div>

            <div className="fc-description">
              <label>Complaint Description</label>
              <p>{selectedComplaint.description}</p>
            </div>

            <div className="fc-current-status">
              <label>Current Status</label>
              <Status status={selectedComplaint.status} />
            </div>

            <div className="fc-action-field">
              <label>Admin Action / Resolution</label>
              <textarea
                value={actionText}
                onChange={(event) => setActionText(event.target.value)}
                placeholder="Enter action taken or resolution details"
                rows={4}
              />
            </div>

            <div className="fc-modal-actions">
              <button className="fc-close-action" onClick={closeComplaint}>
                Close
              </button>

              <button
                className="fc-status-btn progress-btn"
                onClick={() => updateStatus("In Progress")}
              >
                Mark In Progress
              </button>

              <button
                className="fc-status-btn resolve-btn"
                onClick={() => updateStatus("Resolved")}
              >
                <CheckCircle2 size={14} />
                Resolve Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Summary({ icon, label, value, tone }) {
  return (
    <div className="fc-summary-card">
      <div className={`fc-summary-icon ${tone}`}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SelectFilter({ label, value, options, onChange }) {
  return (
    <div className="fc-filter">
      <label>{label}</label>
      <div className="fc-select-wrap">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={13} />
      </div>
    </div>
  );
}

function Status({ status }) {
  const className = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`fc-status ${className}`}>
      <i />
      {status}
    </span>
  );
}

function Detail({ label, value, wide }) {
  return (
    <div className={`fc-detail ${wide ? "wide" : ""}`}>
      <label>{label}</label>
      <strong>{value}</strong>
    </div>
  );
}
