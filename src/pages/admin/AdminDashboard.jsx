import {
  Activity,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  PackageCheck,
  Scale,
} from "lucide-react";
import "./AdminDashboard.css";

const centreData = [
  ["Bhopal Mandi Procurement Centre", "Bhopal", "Active", "842"],
  ["Berasia Procurement Centre", "Berasia, Bhopal", "Active", "735"],
  ["Phanda Procurement Centre", "Phanda, Bhopal", "Active", "618"],
  ["Bairagarh Procurement Centre", "Bairagarh, Bhopal", "Inactive", "492"],
];

export default function AdminDashboard({ onNavigate, onLogout }) {
  const go = (page) => onNavigate && onNavigate(page);

  return (
    <div className="admin-dashboard">
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-brand">
            <div className="admin-logo"><ShieldCheck size={21} /></div>
            <div>
              <strong><span>Farm</span>Buddy</strong>
              <small>Admin Portal</small>
            </div>
          </div>

          <div className="admin-heading">
            <p>GOVERNMENT ADMINISTRATION</p>
            <h1>Admin Dashboard</h1>
            <span>Monitor and manage procurement operations</span>
          </div>

          <div className="admin-user">
            <div>
              <span>District</span>
              <strong>Bhopal</strong>
            </div>
            <div className="admin-avatar">AD</div>
            <div>
              <strong>Government Admin</strong>
              <span>Authorized Access</span>
            </div>
            <button className="admin-logout-top" onClick={onLogout}>Logout</button>
          </div>
        </header>

        {/* Four overview boxes */}
        <section className="admin-stat-grid">
          <StatCard icon={<Building2 />} label="Total Procurement Centres" value="24" note="Across assigned district" />
          <StatCard icon={<CheckCircle2 />} label="Active Centres" value="21" note="Currently operational" />
          <StatCard icon={<PackageCheck />} label="Total Procurement" value="3,068 Qtl" note="Current district procurement" />
          <StatCard icon={<Scale />} label="Overall Capacity" value="5,000 Qtl" note="1,932 Qtl remaining" />
        </section>

        {/* Five main admin features */}
        <section className="admin-feature-section">
          <div className="feature-section-heading">
            <div>
              <p>ADMIN FEATURES</p>
              <h2>Manage</h2>
            </div>
            <span>Select a feature to continue</span>
          </div>

          <div className="admin-feature-grid">
            <FeatureCard
              number="01"
              icon={<Activity />}
              title="Procurement Overview & Monitoring"
              text="Overall procurement, daily activity, centre-wise procurement and capacity/status."
              onClick={() => go("procurementOverview")}
            />
            <FeatureCard
              number="02"
              icon={<Building2 />}
              title="Procurement Centres"
              text="Centre list, add/manage, code, location, institution and capacity."
              onClick={() => go("centres")}
            />
            <FeatureCard
              number="03"
              icon={<AlertCircle />}
              title="Farmer Complaints"
              text="Farmer, Kisan Code, centre, date, complaint details and status."
              onClick={() => go("complaints")}
            />
          </div>
        </section>

        {/* Today's Activity */}
        <section className="admin-card today-activity-card">
          <CardHeader
            label="DAILY ACTIVITY"
            title="Today's Activity"
            icon={<Activity size={18} />}
          />
          <div className="today-metrics">
            <Metric value="842" label="Farmers Served Today" />
            <Metric value="425 Qtl" label="Quantity Procured Today" />
            <Metric value="18" label="Active Centres Today" />
            <Metric value="7" label="Pending Procurement" />
            <Metric value="31" label="Completed Procurement" />
            <Metric value="42 min" label="Average Waiting Time" />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, note }) {
  return <div className="admin-stat-card"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}

function CardHeader({ label, title, icon }) {
  return <div className="admin-card-heading"><div><p>{label}</p><h2>{title}</h2></div>{icon}</div>;
}

function Metric({ value, label }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}

function StatusRow({ label, value, type }) {
  return <div className="status-row"><span><i className={`status-dot ${type}`} />{label}</span><strong>{value}</strong></div>;
}

function FeatureCard({ number, icon, title, text, onClick }) {
  return (
    <button className="admin-feature-card" onClick={onClick}>
      <div className="feature-number">{number}</div>
      <div className="feature-icon">{icon}</div>
      <div className="feature-content">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <ChevronRight className="feature-arrow" size={17} />
    </button>
  );
}
