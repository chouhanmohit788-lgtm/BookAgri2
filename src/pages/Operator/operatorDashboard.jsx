import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LogOut,
  Search,
  ShieldCheck,
  Users,
  Wheat,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";

import "./operatorDashboard.css";

function OperatorDashboard({ onBack, onLogout }) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const isHindi = language === "hi";

  const [search, setSearch] = useState("");

  const bookings = [
    {
      kisanCode: "KC10245",
      name: "Ramesh Patel",
      crop: "Wheat",
      quantity: "25 Qtl",
      slot: "10:30 AM",
      token: "27",
      status: "Arrived",
    },
    {
      kisanCode: "KC10418",
      name: "Suresh Verma",
      crop: "Wheat",
      quantity: "18 Qtl",
      slot: "11:00 AM",
      token: "28",
      status: "Booked",
    },
    {
      kisanCode: "KC10632",
      name: "Mohan Singh",
      crop: "Soybean",
      quantity: "20 Qtl",
      slot: "11:30 AM",
      token: "29",
      status: "Procurement",
    },
    {
      kisanCode: "KC10871",
      name: "Rajesh Yadav",
      crop: "Wheat",
      quantity: "30 Qtl",
      slot: "12:00 PM",
      token: "30",
      status: "Completed",
    },
  ];

  const filteredBookings = bookings.filter((booking) =>
    `${booking.kisanCode} ${booking.name} ${booking.crop}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusText = (status) => {
    if (!isHindi) return status;

    const statusMap = {
      Booked: "बुक किया गया",
      Arrived: "पहुंच गया",
      Procurement: "खरीद जारी",
      Completed: "पूरा हुआ",
    };

    return statusMap[status] || status;
  };

  return (
    <main
      className={`proc-dashboard-page ${
        isDark ? "dark-mode" : ""
      }`}
    >
      {/* Header */}
      <header className="proc-dashboard-header">
        <button
          type="button"
          className="proc-dashboard-back"
          onClick={onBack}
        >
          <ArrowLeft size={19} />
        </button>

        <div className="proc-dashboard-brand">
          <div className="proc-dashboard-brand-icon">
            <Wheat size={20} />
          </div>

          <div>
            <strong>FarmBuddy</strong>
            <span>
              {isHindi
                ? "प्रोक्योरमेंट केंद्र"
                : "Procurement Centre"}
            </span>
          </div>
        </div>

        <div className="proc-dashboard-centre">
          <strong>
            {isHindi
              ? "सीहोर प्रोक्योरमेंट केंद्र"
              : "Sehore Procurement Centre"}
          </strong>

          <span>
            {isHindi
              ? "Centre ID: PC1025"
              : "Centre ID: PC1025"}
          </span>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />

        <button
          type="button"
          className="proc-dashboard-logout"
          onClick={onLogout}
        >
          <LogOut size={17} />
          <span>{isHindi ? "लॉगआउट" : "Logout"}</span>
        </button>
      </header>

      <section className="proc-dashboard-content">

        {/* Welcome */}
        <div className="proc-dashboard-welcome">
          <div>
            <p>
              {isHindi
                ? "प्रोक्योरमेंट केंद्र डैशबोर्ड"
                : "Procurement Centre Dashboard"}
            </p>

            <h1>
              {isHindi
                ? "आज की गतिविधि"
                : "Today's Overview"}
            </h1>
          </div>

          <div className="proc-dashboard-date">
            <CalendarDays size={17} />
            <span>
              {isHindi
                ? "27 अगस्त 2026"
                : "27 August 2026"}
            </span>
          </div>
        </div>

        {/* Overview Cards */}
        <section className="proc-overview-grid">

          <div className="proc-stat-card">
            <div className="proc-stat-icon bookings">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "आज की कुल बुकिंग"
                  : "Today's Bookings"}
              </span>
              <strong>42</strong>
            </div>
          </div>

          <div className="proc-stat-card">
            <div className="proc-stat-icon farmers">
              <Users size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "आज आए किसान"
                  : "Farmers Arrived"}
              </span>
              <strong>28</strong>
            </div>
          </div>

          <div className="proc-stat-card">
            <div className="proc-stat-icon pending">
              <Clock3 size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "लंबित खरीद"
                  : "Pending Procurement"}
              </span>
              <strong>8</strong>
            </div>
          </div>

          <div className="proc-stat-card">
            <div className="proc-stat-icon completed">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "पूरी हुई खरीद"
                  : "Completed Procurement"}
              </span>
              <strong>20</strong>
            </div>
          </div>

          <div className="proc-stat-card">
            <div className="proc-stat-icon quantity">
              <Wheat size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "कुल खरीदी गई मात्रा"
                  : "Total Quantity Procured"}
              </span>
              <strong>486 Qtl</strong>
            </div>
          </div>

          <div className="proc-stat-card">
            <div className="proc-stat-icon arrivals">
              <Clock3 size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "अपेक्षित आगमन"
                  : "Expected Arrivals"}
              </span>
              <strong>14</strong>
            </div>
          </div>

        </section>

        {/* Today's Bookings */}
        <section className="proc-bookings-card">

          <div className="proc-bookings-heading">
            <div>
              <h2>
                {isHindi
                  ? "आज की बुकिंग"
                  : "Today's Bookings"}
              </h2>

              <p>
                {isHindi
                  ? "आज आने वाले किसानों की सूची"
                  : "Farmers scheduled to visit today"}
              </p>
            </div>

            <div className="proc-booking-count">
              {filteredBookings.length}{" "}
              {isHindi ? "बुकिंग" : "Bookings"}
            </div>
          </div>

          {/* Search */}
          <div className="proc-booking-search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isHindi
                  ? "किसान नाम या Kisan Code खोजें..."
                  : "Search farmer name or Kisan Code..."
              }
            />
          </div>

          {/* Table */}
          <div className="proc-booking-table-wrap">
            <table className="proc-booking-table">

              <thead>
                <tr>
                  <th>
                    {isHindi
                      ? "किसान कोड"
                      : "Kisan Code"}
                  </th>

                  <th>
                    {isHindi
                      ? "किसान का नाम"
                      : "Farmer Name"}
                  </th>

                  <th>
                    {isHindi ? "फसल" : "Crop"}
                  </th>

                  <th>
                    {isHindi
                      ? "मात्रा"
                      : "Quantity"}
                  </th>

                  <th>
                    {isHindi ? "स्लॉट" : "Slot"}
                  </th>

                  <th>
                    {isHindi ? "टोकन" : "Token"}
                  </th>

                  <th>
                    {isHindi ? "स्थिति" : "Status"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.kisanCode}>

                    <td>
                      <strong className="proc-kisan-code">
                        {booking.kisanCode}
                      </strong>
                    </td>

                    <td>
                      <div className="proc-farmer-cell">
                        <div className="proc-farmer-avatar">
                          {booking.name.charAt(0)}
                        </div>

                        <strong>{booking.name}</strong>
                      </div>
                    </td>

                    <td>{booking.crop}</td>

                    <td>
                      <strong>{booking.quantity}</strong>
                    </td>

                    <td>{booking.slot}</td>

                    <td>
                      <strong className="proc-token">
                        #{booking.token}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`proc-status proc-status-${booking.status.toLowerCase()}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            {filteredBookings.length === 0 && (
              <div className="proc-no-bookings">
                {isHindi
                  ? "कोई बुकिंग नहीं मिली।"
                  : "No bookings found."}
              </div>
            )}
          </div>

        </section>

        {/* Security */}
        <div className="proc-dashboard-security">
          <ShieldCheck size={16} />
          <span>
            {isHindi
              ? "प्रोक्योरमेंट केंद्र का डेटा सुरक्षित है"
              : "Procurement centre data is secure"}
          </span>
        </div>

      </section>
    </main>
  );
}

export default OperatorDashboard;