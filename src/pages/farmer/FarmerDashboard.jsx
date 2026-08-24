import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ClipboardList,
  MapPin,
  Ticket,
  UserCircle,
  WalletCards,
  Wheat,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";

import "./FarmerDashboard.css";

function FarmerDashboard() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <main className={`simple-farmer-dashboard ${isDark ? "dark-mode" : ""}`}>

      {/* Header */}
      <header className="simple-header">

        <div className="simple-brand">
          <Wheat size={28} />
          <span>
            Book<span>Agri</span>
          </span>
        </div>

        <div className="simple-header-actions">

          <ThemeButton
            isDark={isDark}
            onToggle={toggleTheme}
          />

          <button className="simple-notification">
            <Bell size={22} />
            <span>3</span>
          </button>

          <div className="simple-profile">
            <div className="simple-avatar">M</div>

            <div>
              <strong>Mohit</strong>
              <small>Farmer</small>
            </div>
          </div>

        </div>

      </header>


      {/* Main Content */}
      <div className="simple-content">

        {/* Welcome */}
        <section className="welcome-section">

          <h1>
            Hello, Mohit! <span>👋</span>
          </h1>

          <p>
            Farmer ID: <strong>FA-2026-001248</strong>
          </p>

        </section>


        {/* Today's Overview */}
        <section className="overview-section">

          <h2>Today's Overview</h2>

          <div className="overview-grid">

            <div className="overview-card green">
              <div className="overview-icon">
                <CalendarDays size={25} />
              </div>

              <strong>1</strong>
              <span>Upcoming Booking</span>
            </div>


            <div className="overview-card yellow">
              <div className="overview-icon">
                <Ticket size={25} />
              </div>

              <strong>27</strong>
              <span>Your Token</span>
            </div>


            <div className="overview-card blue">
              <div className="overview-icon">
                <ClipboardList size={25} />
              </div>

              <strong>5</strong>
              <span>Total Bookings</span>
            </div>


            <div className="overview-card green">
              <div className="overview-icon">
                <CheckCircle2 size={25} />
              </div>

              <strong>3</strong>
              <span>Completed</span>
            </div>

          </div>

        </section>


        {/* Upcoming Booking */}
        <section className="upcoming-section">

          <div className="section-title">

            <h2>Upcoming Booking</h2>

            <button>
              View all →
            </button>

          </div>


          <div className="upcoming-booking">

            


            <div className="booking-info">

              <div className="booking-status">
                Confirmed
              </div>

              <h3>Wheat</h3>

              <strong>25 Quintal</strong>


              <div className="booking-details">

                <span>
                  <CalendarDays size={17} />
                  25 May 2026
                </span>

                <span>
                  <Clock3 size={17} />
                  10:30 AM
                </span>

                <span>
                  <MapPin size={17} />
                  Indore Mandi
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* Main Action */}
        <button className="book-new-slot">
          <CalendarDays size={24} />
          Book New Slot
        </button>


        {/* Quick Access */}
        <section className="quick-section">

          <h2>Quick Access</h2>

          <div className="quick-grid">

            <button className="quick-card green">
              <CalendarDays size={28} />
              <strong>Book Slot</strong>
            </button>

            <button className="quick-card blue">
              <ClipboardList size={28} />
              <strong>My Booking</strong>
            </button>

            <button className="quick-card yellow">
              <Ticket size={28} />
              <strong>Token / Queue</strong>
            </button>

            <button className="quick-card purple">
              <Clock3 size={28} />
              <strong>History</strong>
            </button>
            <button className="quick-card purple">
  <WalletCards size={28} />
  <strong>Payment</strong>
</button>

          </div>

        </section>


        {/* Simple Help Banner */}
        <section className="farmer-tip">

          <Wheat size={35} />

          <div>
            <strong>समय पर बुकिंग करें</strong>
            <p>
              बेहतर सेवा के लिए अपना procurement slot पहले से book करें।
            </p>
          </div>

        </section>

      </div>


      {/* Bottom Navigation */}
      <nav className="bottom-navigation">

  <button className="active">
    <Wheat size={21} />
    <span>Home</span>
  </button>

  <button>
    <CalendarDays size={21} />
    <span>Book Slot</span>
  </button>

  <button>
    <WalletCards size={21} />
    <span>Payment</span>
  </button>

  <button>
    <UserCircle size={21} />
    <span>Profile</span>
  </button>

</nav>

    </main>
  );
}

export default FarmerDashboard;