import React from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Filter,
  MapPin,
  PackageCheck,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from "lucide-react";
import "./ProcurementOverviewMonitoring.css";

const centres = [
  {
    code: "BPC-001",
    name: "Bhopal Mandi Procurement Centre",
    location: "Bhopal",
    status: "Active",
    capacity: 1000,
    totalProcurement: 842,
    today: 128,
  },
  {
    code: "BPC-002",
    name: "Berasia Procurement Centre",
    location: "Berasia, Bhopal",
    status: "Active",
    capacity: 900,
    totalProcurement: 735,
    today: 104,
  },
  {
    code: "BPC-003",
    name: "Phanda Procurement Centre",
    location: "Phanda, Bhopal",
    status: "Active",
    capacity: 850,
    totalProcurement: 618,
    today: 82,
  },
  {
    code: "BPC-004",
    name: "Bairagarh Procurement Centre",
    location: "Bairagarh, Bhopal",
    status: "Inactive",
    capacity: 750,
    totalProcurement: 492,
    today: 61,
  },
  {
    code: "BPC-005",
    name: "Kolar Procurement Centre",
    location: "Kolar Road, Bhopal",
    status: "Active",
    capacity: 800,
    totalProcurement: 381,
    today: 50,
  },
  {
    code: "BPC-006",
    name: "Gandhi Nagar Procurement Centre",
    location: "Gandhi Nagar, Bhopal",
    status: "Active",
    capacity: 700,
    totalProcurement: 276,
    today: 36,
  },
];

const crops = [
  { name: "Wheat", quantity: 1340 },
  { name: "Soybean", quantity: 920 },
  { name: "Gram", quantity: 540 },
  { name: "Lentil", quantity: 268 },
];

const dateRows = [
  { date: "28 Aug 2026", procurement: 425 },
  { date: "27 Aug 2026", procurement: 398 },
  { date: "26 Aug 2026", procurement: 376 },
  { date: "25 Aug 2026", procurement: 351 },
  { date: "24 Aug 2026", procurement: 329 },
];

export default function ProcurementOverviewMonitoring({ onBack }) {
  const [dateFilter, setDateFilter] = React.useState("All Dates");
  const [centreFilter, setCentreFilter] = React.useState("All Centres");
  const [cropFilter, setCropFilter] = React.useState("All Crops");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");

  const activeCount = centres.filter((c) => c.status === "Active").length;
  const inactiveCount = centres.filter((c) => c.status === "Inactive").length;
  const totalCapacity = centres.reduce((sum, c) => sum + c.capacity, 0);
  const totalProcurement = centres.reduce(
    (sum, c) => sum + c.totalProcurement,
    0
  );
  const todayTotal = centres.reduce((sum, c) => sum + c.today, 0);
  const remainingCapacity = totalCapacity - totalProcurement;
  const usedCapacity = Math.round(
    (totalProcurement / totalCapacity) * 100
  );

  const filteredCentres = React.useMemo(() => {
    const q = search.trim().toLowerCase();

    return centres.filter((centre) => {
      const textMatch =
        !q ||
        centre.code.toLowerCase().includes(q) ||
        centre.name.toLowerCase().includes(q) ||
        centre.location.toLowerCase().includes(q);

      const centreMatch =
        centreFilter === "All Centres" || centre.name === centreFilter;

      const statusMatch =
        statusFilter === "All" || centre.status === statusFilter;

      return textMatch && centreMatch && statusMatch;
    });
  }, [search, centreFilter, statusFilter]);

  return (
    <div className="pom-page">
      <header className="pom-header">
        <button className="pom-back-btn" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <div className="pom-title">
          <div className="pom-title-icon">
            <Activity size={22} />
          </div>
          <div>
            <p>ADMIN FEATURE 01</p>
            <h1>Procurement Overview &amp; Monitoring</h1>
            <span>
              Overall procurement status and detailed monitoring for Bhopal district
            </span>
          </div>
        </div>

        <div className="pom-admin">
          <div className="pom-avatar">AD</div>
          <div>
            <strong>Government Admin</strong>
            <span>Bhopal District</span>
          </div>
        </div>
      </header>

      <section className="pom-summary-grid">
        <Summary
          icon={<Building2 />}
          label="Total Procurement Centres"
          value={centres.length}
          note="Assigned Bhopal district"
        />
        <Summary
          icon={<CheckCircle2 />}
          label="Active / Inactive Centres"
          value={`${activeCount} / ${inactiveCount}`}
          note="Current centre status"
        />
        <Summary
          icon={<PackageCheck />}
          label="Total Quantity Procured"
          value={`${totalProcurement.toLocaleString()} Qtl`}
          note="Combined procurement"
        />
        <Summary
          icon={<Scale />}
          label="Total Capacity"
          value={`${totalCapacity.toLocaleString()} Qtl`}
          note={`${remainingCapacity.toLocaleString()} Qtl remaining`}
        />
      </section>

      <section className="pom-capacity-strip">
        <div>
          <p>CAPACITY STATUS</p>
          <h2>Used Capacity vs Remaining Capacity</h2>
        </div>
        <div className="pom-capacity-percent">{usedCapacity}% Used</div>
        <div className="pom-strip-track">
          <div
            className="pom-strip-value"
            style={{ width: `${usedCapacity}%` }}
          />
        </div>
        <div className="pom-strip-foot">
          <span>{totalProcurement.toLocaleString()} Qtl used</span>
          <span>{remainingCapacity.toLocaleString()} Qtl remaining</span>
        </div>
      </section>

      <section className="pom-current-grid">
        <div className="pom-card">
          <div className="pom-card-head">
            <div>
              <p>CURRENT PROCUREMENT</p>
              <h2>Today's Procurement</h2>
            </div>
            <CalendarDays size={19} />
          </div>

          <div className="pom-today-main">
            <strong>{todayTotal} Qtl</strong>
            <span>Total procurement today</span>
          </div>

          <div className="pom-mini-grid">
            <Mini label="Completed" value="2 Centres" />
            <Mini label="Pending" value="4 Centres" />
            <Mini label="Monitoring" value="6 Centres" />
          </div>
        </div>

        <div className="pom-card">
          <div className="pom-card-head">
            <div>
              <p>CENTRE STATUS</p>
              <h2>Operational Status</h2>
            </div>
            <Building2 size={19} />
          </div>

          <div className="pom-status-summary">
            <StatusChip label="Active" value={activeCount} tone="active" />
            <StatusChip label="Inactive" value={inactiveCount} tone="inactive" />
          </div>

          <div className="pom-status-note">
            <ShieldCheck size={14} />
            <span>Current procurement is compared with centre capacity.</span>
          </div>
        </div>
      </section>

      <section className="pom-analysis-grid">
        <div className="pom-card">
          <div className="pom-card-head">
            <div>
              <p>DATE-WISE PROCUREMENT</p>
              <h2>Recent Procurement Trend</h2>
            </div>
            <TrendingUp size={19} />
          </div>

          <div className="pom-trend-list">
            {dateRows.map((row, index) => {
              const max = dateRows[0].procurement;
              const percent = Math.round((row.procurement / max) * 100);

              return (
                <div className="pom-trend-row" key={row.date}>
                  <span>{row.date}</span>
                  <div className="pom-trend-track">
                    <div
                      className="pom-trend-value"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <strong>{row.procurement} Qtl</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pom-card">
          <div className="pom-card-head">
            <div>
              <p>CROP-WISE QUANTITY</p>
              <h2>Procurement by Crop</h2>
            </div>
            <BarChart3 size={19} />
          </div>

          <div className="pom-crops">
            {crops.map((crop) => {
              const max = crops[0].quantity;
              const percent = Math.round((crop.quantity / max) * 100);

              return (
                <div className="pom-crop-row" key={crop.name}>
                  <div className="pom-crop-label">
                    <strong>{crop.name}</strong>
                    <span>{crop.quantity.toLocaleString()} Qtl</span>
                  </div>
                  <div className="pom-crop-track">
                    <div
                      className="pom-crop-value"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pom-filter-card">
        <div className="pom-filter-heading">
          <div>
            <p>REPORTS &amp; ANALYSIS</p>
            <h2>Centre-wise Procurement Report</h2>
            <span>Filter monitoring data by date, centre and crop</span>
          </div>
          <Filter size={18} />
        </div>

        <div className="pom-filters">
          <FilterSelect
            label="Date"
            value={dateFilter}
            options={["All Dates", "Today", "Last 7 Days"]}
            onChange={setDateFilter}
          />

          <FilterSelect
            label="Centre"
            value={centreFilter}
            options={[
              "All Centres",
              ...centres.map((centre) => centre.name),
            ]}
            onChange={setCentreFilter}
          />

          <FilterSelect
            label="Crop"
            value={cropFilter}
            options={["All Crops", ...crops.map((crop) => crop.name)]}
            onChange={setCropFilter}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            options={["All", "Active", "Inactive"]}
            onChange={setStatusFilter}
          />

          <div className="pom-search">
            <Search size={15} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search centre or code"
            />
          </div>
        </div>
      </section>

      <section className="pom-table-card">
        <div className="pom-table-head">
          <span>Centre</span>
          <span>Capacity</span>
          <span>Total Procurement</span>
          <span>Today</span>
          <span>Capacity Utilization</span>
          <span>Status</span>
        </div>

        {filteredCentres.map((centre) => {
          const percent = Math.min(
            Math.round((centre.totalProcurement / centre.capacity) * 100),
            100
          );
          const remaining = Math.max(
            centre.capacity - centre.totalProcurement,
            0
          );
          const low = percent < 55;

          return (
            <div className="pom-table-row" key={centre.code}>
              <div className="pom-centre">
                <strong>{centre.name}</strong>
                <span>
                  <MapPin size={12} />
                  {centre.location} · {centre.code}
                </span>
              </div>

              <strong>{centre.capacity.toLocaleString()} Qtl</strong>

              <strong>{centre.totalProcurement.toLocaleString()} Qtl</strong>

              <span className="pom-today-value">{centre.today} Qtl</span>

              <div className="pom-usage-cell">
                <div className="pom-usage-top">
                  <strong>{percent}%</strong>
                  <span className={low ? "low" : "good"}>
                    {low ? "Low" : "On Track"}
                  </span>
                </div>
                <div className="pom-small-track">
                  <div
                    className="pom-small-value"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <small>{remaining.toLocaleString()} Qtl remaining</small>
              </div>

              <span className={`pom-status ${centre.status.toLowerCase()}`}>
                {centre.status === "Active" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <XCircle size={13} />
                )}
                {centre.status}
              </span>
            </div>
          );
        })}

        {!filteredCentres.length && (
          <div className="pom-empty">
            <Building2 size={24} />
            <strong>No matching procurement data</strong>
            <span>Try changing the filters or search.</span>
          </div>
        )}
      </section>
    </div>
  );
}

function Summary({ icon, label, value, note }) {
  return (
    <div className="pom-summary-card">
      <div className="pom-summary-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="pom-mini">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusChip({ label, value, tone }) {
  return (
    <div className={`pom-status-chip ${tone}`}>
      <i />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="pom-filter-select">
      <label>{label}</label>
      <div className="pom-select-wrap">
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
