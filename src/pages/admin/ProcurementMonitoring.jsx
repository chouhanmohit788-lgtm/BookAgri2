import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import "./ProcurementMonitoring.css";

const initialCentres = [
  {
    code: "BPC-001",
    name: "Bhopal Mandi Procurement Centre",
    location: "Bhopal",
    capacity: 1000,
    procured: 842,
    today: 128,
    status: "Completed",
  },
  {
    code: "BPC-002",
    name: "Berasia Procurement Centre",
    location: "Berasia, Bhopal",
    capacity: 900,
    procured: 735,
    today: 104,
    status: "Completed",
  },
  {
    code: "BPC-003",
    name: "Phanda Procurement Centre",
    location: "Phanda, Bhopal",
    capacity: 850,
    procured: 618,
    today: 82,
    status: "Pending",
  },
  {
    code: "BPC-004",
    name: "Bairagarh Procurement Centre",
    location: "Bairagarh, Bhopal",
    capacity: 750,
    procured: 492,
    today: 61,
    status: "Pending",
  },
  {
    code: "BPC-005",
    name: "Kolar Procurement Centre",
    location: "Kolar Road, Bhopal",
    capacity: 800,
    procured: 381,
    today: 50,
    status: "Pending",
  },
  {
    code: "BPC-006",
    name: "Gandhi Nagar Procurement Centre",
    location: "Gandhi Nagar, Bhopal",
    capacity: 700,
    procured: 276,
    today: 36,
    status: "Pending",
  },
];

const cropData = [
  { crop: "Wheat", quantity: 1340 },
  { crop: "Soybean", quantity: 920 },
  { crop: "Gram", quantity: 540 },
  { crop: "Lentil", quantity: 268 },
];

export default function ProcurementMonitoring({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCentres = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialCentres.filter((centre) => {
      const matchesSearch =
        !query ||
        centre.code.toLowerCase().includes(query) ||
        centre.name.toLowerCase().includes(query) ||
        centre.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || centre.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalCapacity = initialCentres.reduce(
    (sum, centre) => sum + centre.capacity,
    0
  );
  const totalProcured = initialCentres.reduce(
    (sum, centre) => sum + centre.procured,
    0
  );
  const todayTotal = initialCentres.reduce(
    (sum, centre) => sum + centre.today,
    0
  );
  const remainingCapacity = totalCapacity - totalProcured;
  const overallUsed = Math.round((totalProcured / totalCapacity) * 100);
  const completedCount = initialCentres.filter(
    (centre) => centre.status === "Completed"
  ).length;
  const pendingCount = initialCentres.filter(
    (centre) => centre.status === "Pending"
  ).length;

  return (
    <div className="procurement-monitoring-page">
      <header className="pm-header">
        <button className="pm-back-btn" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <div className="pm-title">
          <div className="pm-title-icon">
            <Activity size={22} />
          </div>
          <div>
            <p>ADMIN FEATURE 03</p>
            <h1>Procurement Monitoring</h1>
            <span>
              Monitor centre-wise procurement, quantity, daily activity and capacity
            </span>
          </div>
        </div>

        <div className="pm-admin">
          <div className="pm-avatar">AD</div>
          <div>
            <strong>Government Admin</strong>
            <span>Bhopal District</span>
          </div>
        </div>
      </header>

      <section className="pm-summary-grid">
        <SummaryCard
          icon={<PackageIcon />}
          label="Total Quantity Procured"
          value={`${totalProcured.toLocaleString()} Qtl`}
          note="Across monitored centres"
        />
        <SummaryCard
          icon={<Clock3 />}
          label="Today's Procurement"
          value={`${todayTotal} Qtl`}
          note="Current day"
        />
        <SummaryCard
          icon={<CheckCircle2 />}
          label="Pending / Completed"
          value={`${pendingCount} / ${completedCount}`}
          note="Centre status"
        />
        <SummaryCard
          icon={<BarChart3 />}
          label="Overall Capacity Used"
          value={`${overallUsed}%`}
          note={`${remainingCapacity.toLocaleString()} Qtl remaining`}
        />
      </section>

      <section className="pm-capacity-grid">
        <div className="pm-card">
          <div className="pm-card-header">
            <div>
              <p>CAPACITY MONITORING</p>
              <h2>Overall Capacity vs Actual Procurement</h2>
            </div>
            <ScaleIcon />
          </div>

          <div className="pm-capacity-numbers">
            <div>
              <span>Total Capacity</span>
              <strong>{totalCapacity.toLocaleString()} Qtl</strong>
            </div>
            <div>
              <span>Actual Procurement</span>
              <strong>{totalProcured.toLocaleString()} Qtl</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>{remainingCapacity.toLocaleString()} Qtl</strong>
            </div>
          </div>

          <div className="pm-progress">
            <div className="pm-progress-label">
              <span>Overall utilization</span>
              <strong>{overallUsed}%</strong>
            </div>
            <div className="pm-progress-track">
              <div
                className="pm-progress-value"
                style={{ width: `${overallUsed}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pm-card">
          <div className="pm-card-header">
            <div>
              <p>PROCUREMENT BY CROP</p>
              <h2>Crop-wise Quantity</h2>
            </div>
            <TrendingUp size={19} />
          </div>

          <div className="pm-crop-list">
            {cropData.map((crop) => {
              const max = cropData[0].quantity;
              const percent = Math.round((crop.quantity / max) * 100);

              return (
                <div className="pm-crop-row" key={crop.crop}>
                  <div className="pm-crop-name">
                    <strong>{crop.crop}</strong>
                    <span>{crop.quantity.toLocaleString()} Qtl</span>
                  </div>
                  <div className="pm-crop-track">
                    <div
                      className="pm-crop-value"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pm-toolbar-card">
        <div className="pm-toolbar-heading">
          <div>
            <p>CENTRE-WISE MONITORING</p>
            <h2>Procurement Performance</h2>
            <span>Compare actual procurement with centre capacity</span>
          </div>
        </div>

        <div className="pm-toolbar">
          <div className="pm-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by centre code, name or location"
            />
          </div>

          <div className="pm-filter">
            <label>Status</label>
            <div className="pm-select-wrap">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </section>

      <section className="pm-table-card">
        <div className="pm-table-head">
          <span>Centre</span>
          <span>Capacity</span>
          <span>Total Procured</span>
          <span>Today</span>
          <span>Capacity Used</span>
          <span>Status</span>
        </div>

        {filteredCentres.map((centre) => {
          const percent = Math.min(
            Math.round((centre.procured / centre.capacity) * 100),
            100
          );
          const isLow = percent < 55;

          return (
            <div className="pm-table-row" key={centre.code}>
              <div className="pm-centre-cell">
                <strong>{centre.name}</strong>
                <span>
                  <MapPin size={12} />
                  {centre.location} · {centre.code}
                </span>
              </div>

              <strong>{centre.capacity.toLocaleString()} Qtl</strong>

              <strong>{centre.procured.toLocaleString()} Qtl</strong>

              <span className="pm-today">
                <Activity size={12} />
                {centre.today} Qtl
              </span>

              <div className="pm-usage-cell">
                <div className="pm-usage-top">
                  <strong>{percent}%</strong>
                  {isLow ? (
                    <span className="pm-usage-note low">
                      <TrendingDown size={11} />
                      Low
                    </span>
                  ) : (
                    <span className="pm-usage-note good">
                      <TrendingUp size={11} />
                      On Track
                    </span>
                  )}
                </div>
                <div className="pm-small-track">
                  <div
                    className="pm-small-value"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <span className={`pm-status ${centre.status.toLowerCase()}`}>
                {centre.status === "Completed" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <Clock3 size={13} />
                )}
                {centre.status}
              </span>
            </div>
          );
        })}

        {filteredCentres.length === 0 && (
          <div className="pm-empty">
            <Building2 size={24} />
            <strong>No procurement data found</strong>
            <span>Try another search or status filter.</span>
          </div>
        )}
      </section>

      <div className="pm-alert">
        <ShieldCheck size={14} />
        <span>
          Monitoring helps identify centres with low procurement against available capacity.
        </span>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, note }) {
  return (
    <div className="pm-summary-card">
      <div className="pm-summary-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function PackageIcon() {
  return <Building2 size={17} />;
}

function ScaleIcon() {
  return <Scale size={19} />;
}

