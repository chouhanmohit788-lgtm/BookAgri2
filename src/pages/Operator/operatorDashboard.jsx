import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Package,
  Search,
  ShieldCheck,
  UserCircle,
  Users,
  Wheat,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

import "./operatorDashboard.css";

function OperatorDashboard({ onBack, onLogout, onFarmers, onProcurement, onStockDispatch, onReports, onProfile, onTodayBookings, onQuantityProcured, onCompletedProcurement, onExpectedArrivals, onTransactionHistory }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();

  const isHindi = language === "hi";

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Booking",
      message: "Ramesh Patel has booked a procurement slot.",
      time: "10 min ago",
      type: "booking",
    },
    {
      id: 2,
      title: "Procurement Update",
      message: "Mohan Singh's procurement is ready for processing.",
      time: "25 min ago",
      type: "procurement",
    },
    {
      id: 3,
      title: "Dispatch Update",
      message: "850 Qtl stock is ready for dispatch.",
      time: "1 hr ago",
      type: "dispatch",
    },
  ];

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
    {
      kisanCode: "KC11024",
      name: "Anil Sharma",
      crop: "Soybean",
      quantity: "22 Qtl",
      slot: "12:30 PM",
      token: "31",
      status: "Arrived",
    },
    {
      kisanCode: "KC11209",
      name: "Deepak Meena",
      crop: "Wheat",
      quantity: "28 Qtl",
      slot: "01:00 PM",
      token: "32",
      status: "Booked",
    },
    {
      kisanCode: "KC11456",
      name: "Vijay Solanki",
      crop: "Maize",
      quantity: "24 Qtl",
      slot: "01:30 PM",
      token: "33",
      status: "Procurement",
    },
    {
      kisanCode: "KC11673",
      name: "Sunil Chouhan",
      crop: "Wheat",
      quantity: "19 Qtl",
      slot: "02:00 PM",
      token: "34",
      status: "Arrived",
    },
    {
      kisanCode: "KC11842",
      name: "Arjun Verma",
      crop: "Soybean",
      quantity: "26 Qtl",
      slot: "02:30 PM",
      token: "35",
      status: "Booked",
    },
    {
      kisanCode: "KC12018",
      name: "Manoj Patel",
      crop: "Wheat",
      quantity: "21 Qtl",
      slot: "03:00 PM",
      token: "36",
      status: "Completed",
    },
  ]


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

        <div className="proc-notification-wrapper">
          <button
            type="button"
            className="proc-notification-button"
            onClick={() => setShowNotifications((value) => !value)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="proc-notification-badge">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div className="proc-notification-panel">
              <div className="proc-notification-heading">
                <div>
                  <strong>
                    {isHindi ? "सूचनाएं" : "Notifications"}
                  </strong>
                  <span>
                    {isHindi
                      ? "हाल की अपडेट"
                      : "Recent updates"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                >
                  ×
                </button>
              </div>

              <div className="proc-notification-list">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className="proc-notification-item"
                    onClick={() => {
                      setShowNotifications(false);
                      if (notification.type === "booking") onFarmers();
                      if (notification.type === "procurement") onProcurement();
                      if (notification.type === "dispatch") onStockDispatch();
                    }}
                  >
                    <div className="proc-notification-icon">
                      <Bell size={14} />
                    </div>

                    <div>
                      <strong>{notification.title}</strong>
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="proc-dashboard-profile"
          onClick={onProfile}
          aria-label={isHindi ? "प्रोफाइल खोलें" : "Open profile"}
        >
          <UserCircle size={18} />
          <span>{isHindi ? "प्रोफाइल" : "Profile"}</span>
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

          <button
            type="button"
            className="proc-stat-card proc-today-bookings-card"
            onClick={onTodayBookings}
          >
            <div className="proc-stat-icon bookings">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "आज की कुल बुकिंग"
                  : "Today's Bookings"}
              </span>
              <strong>10</strong>
            </div>
                    </button>

          <button
            type="button"
            className="proc-stat-card proc-farmers-card"
            onClick={onFarmers}
          >
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
          </button>

          <button
            type="button"
            className="proc-stat-card proc-pending-card"
            onClick={onProcurement}
          >
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
          </button>

          <button
            type="button"
            className="proc-stat-card proc-completed-card"
            onClick={onCompletedProcurement}
          >
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
          </button>

          <button type="button" className="proc-stat-card proc-quantity-card" onClick={onQuantityProcured}>
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
          </button>

          <button
            type="button"
            className="proc-stat-card proc-expected-arrivals-card"
            onClick={onExpectedArrivals}
          >
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
          </button>

          {/* Stock & Dispatch */}
          <button
            type="button"
            className="proc-stat-card proc-stock-card"
            onClick={onStockDispatch}
          >
            <div className="proc-stat-icon stock">
              <Package size={20} />
            </div>

            <div>
              <span>
                {isHindi
                  ? "स्टॉक और डिस्पैच"
                  : "Stock & Dispatch"}
              </span>
              <strong>850 Qtl</strong>
            </div>
          </button>

          {/* Reports */}
          <button
            type="button"
            className="proc-stat-card proc-reports-card"
            onClick={onReports}
          >
            <div className="proc-stat-icon reports">
              <BarChart3 size={20} />
            </div>

            <div>
              <span>
                {isHindi ? "रिपोर्ट्स" : "Reports"}
              </span>
              <strong>Daily Report</strong>
            </div>
          </button>

          {/* Transaction History */}
          <button
            type="button"
            className="proc-stat-card proc-transaction-history-card"
            onClick={onTransactionHistory}
          >
            <div className="proc-stat-icon transaction-history">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>
                {isHindi ? "लेन-देन इतिहास" : "Transaction History"}
              </span>
              <strong>Procurement Records</strong>
            </div>
          </button>

        </section>


        {/* Analytics */}
        <section className="proc-analytics-grid">
          <div className="proc-chart-card">
            <div className="proc-chart-heading">
              <div>
                <span className="proc-chart-kicker">
                  {isHindi ? "बुकिंग ट्रेंड" : "BOOKING TREND"}
                </span>
                <h3>
                  {isHindi ? "आज की बुकिंग ट्रेंड" : "Today's Bookings Trend"}
                </h3>
                <p>
                  {isHindi
                    ? "समय के अनुसार बुकिंग"
                    : "Bookings throughout the day"}
                </p>
              </div>
              <span className="proc-chart-total">10 Total</span>
            </div>

            <div className="proc-line-chart" aria-label="Today's bookings trend">
              <div className="proc-y-labels">
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>0</span>
              </div>

              <div className="proc-line-area">
                <div className="proc-chart-grid-lines">
                  <i></i><i></i><i></i><i></i><i></i>
                </div>

                <svg viewBox="0 0 600 210" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bookingArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopOpacity="0.24" />
                      <stop offset="100%" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    className="proc-line-fill"
                    d="M25 155 L135 105 L245 55 L355 105 L465 105 L575 155 L575 190 L25 190 Z"
                  />
                  <polyline
                    className="proc-line-path"
                    points="25,155 135,105 245,55 355,105 465,105 575,155"
                  />

                  <circle cx="25" cy="155" r="5" />
                  <circle cx="135" cy="105" r="5" />
                  <circle cx="245" cy="55" r="5" />
                  <circle cx="355" cy="105" r="5" />
                  <circle cx="465" cy="105" r="5" />
                  <circle cx="575" cy="155" r="5" />
                </svg>

                <div className="proc-line-values">
                  <b style={{ left: "4.2%" }}>1</b>
                  <b style={{ left: "22.5%" }}>2</b>
                  <b style={{ left: "40.8%" }}>3</b>
                  <b style={{ left: "59.2%" }}>2</b>
                  <b style={{ left: "77.5%" }}>2</b>
                  <b style={{ left: "95.8%" }}>1</b>
                </div>

                <div className="proc-x-labels">
                  <span>8 AM</span>
                  <span>10 AM</span>
                  <span>12 PM</span>
                  <span>2 PM</span>
                  <span>4 PM</span>
                  <span>6 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="proc-chart-card">
            <div className="proc-chart-heading">
              <div>
                <span className="proc-chart-kicker">
                  {isHindi ? "फसल के अनुसार खरीद" : "PROCUREMENT BY CROP"}
                </span>
                <h3>
                  {isHindi ? "फसल के अनुसार प्रोक्योरमेंट" : "Procurement by Crop"}
                </h3>
                <p>
                  {isHindi
                    ? "कुल 486 क्विंटल का वितरण"
                    : "Distribution of today's 486 Qtl"}
                </p>
              </div>
              <span className="proc-chart-total">486 Qtl</span>
            </div>

            <div className="proc-crop-chart">
              <div className="proc-donut" aria-label="Procurement by crop">
                <div className="proc-donut-inner">
                  <strong>486</strong>
                  <span>Qtl</span>
                </div>
              </div>

              <div className="proc-crop-legend">
                <div>
                  <i className="crop-dot wheat"></i>
                  <span>Wheat</span>
                  <strong>326 Qtl <small>67%</small></strong>
                </div>
                <div>
                  <i className="crop-dot soybean"></i>
                  <span>Soybean</span>
                  <strong>110 Qtl <small>23%</small></strong>
                </div>
                <div>
                  <i className="crop-dot maize"></i>
                  <span>Maize</span>
                  <strong>50 Qtl <small>10%</small></strong>
                </div>
              </div>
            </div>
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