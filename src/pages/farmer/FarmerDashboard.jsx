import { useState } from "react";

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
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";

import "./FarmerDashboard.css";

function FarmerDashboard({ onProfile, onPayment, onHistory, onBookSlot, booking, onMyBooking, onTokenQueue, onWeather }) {
  const { isDark, toggleTheme } = useTheme();
  const { language, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <main className={`simple-farmer-dashboard ${isDark ? "dark-mode" : ""}`}>

      {/* Header */}
      <header className="simple-header">

        <div className="simple-brand">
          <Wheat size={28} />
          <span>
  <span style={{ color: "#07552f" }}>Farm</span>
  <span style={{ color: "#45c35b" }}>Buddy</span>
</span>
        </div>

        <div className="simple-header-actions">

          <ThemeButton
            isDark={isDark}
            onToggle={toggleTheme}
          />

          <div className="notification-wrapper">
            <button
              type="button"
              className={`simple-notification ${
                showNotifications ? "notification-active" : ""
              }`}
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label={language === "hi" ? "सूचनाएँ खोलें" : "Open notifications"}
            >
              <Bell size={22} />
              <span>3</span>
            </button>

            {showNotifications && (
              <div className="notification-panel">
                <div className="notification-panel-header">
                  <div>
                    <h3>{language === "hi" ? "सूचनाएँ" : "Notifications"}</h3>
                    <span>
                      {language === "hi"
                        ? "आपकी हाल की अपडेट"
                        : "Your latest updates"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="notification-close"
                    onClick={() => setShowNotifications(false)}
                    aria-label={language === "hi" ? "बंद करें" : "Close"}
                  >
                    ×
                  </button>
                </div>

                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-dot" />
                    <div>
                      <strong>
                        {language === "hi"
                          ? "बुकिंग की पुष्टि हो गई"
                          : "Booking confirmed"}
                      </strong>
                      <p>
                        {language === "hi"
                          ? "आपका गेहूँ प्रोक्योरमेंट स्लॉट सफलतापूर्वक बुक है।"
                          : "Your wheat procurement slot has been booked successfully."}
                      </p>
                      <small>
                        {language === "hi" ? "10 मिनट पहले" : "10 minutes ago"}
                      </small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-dot" />
                    <div>
                      <strong>
                        {language === "hi" ? "टोकन अपडेट" : "Token update"}
                      </strong>
                      <p>
                        {language === "hi"
                          ? "आपका वर्तमान टोकन नंबर 27 है।"
                          : "Your current token number is 27."}
                      </p>
                      <small>
                        {language === "hi" ? "25 मिनट पहले" : "25 minutes ago"}
                      </small>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-dot" />
                    <div>
                      <strong>
                        {language === "hi"
                          ? "भुगतान स्थिति अपडेट"
                          : "Payment status update"}
                      </strong>
                      <p>
                        {language === "hi"
                          ? "आपका भुगतान प्रोक्योरमेंट पूरा होने के बाद अपडेट होगा।"
                          : "Your payment will update after procurement is completed."}
                      </p>
                      <small>{language === "hi" ? "आज" : "Today"}</small>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="notification-view-all"
                  onClick={() => setShowNotifications(false)}
                >
                  {language === "hi" ? "बंद करें" : "Close"}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="simple-profile simple-profile-button"
            onClick={onProfile}
          >
            <div className="simple-avatar">M</div>

            <div>
              <strong>Ramesh Patel</strong>
              <small>{t.farmer}</small>
            </div>
          </button>

        </div>

      </header>


      {/* Main Content */}
      <div className="simple-content">

        {/* Welcome */}
        <section className="welcome-section">

          <h1>
            {t.hello}, Ramesh! <span>👋</span>
          </h1>

          <p>
            {t.farmerIdKisanCode}: <strong>FA-2026-001248</strong>
          </p>

        </section>


        {/*  Overview */}
        <section className="overview-section">

          <h2>{t.todayOverview}</h2>

          <div className="overview-grid">

            <div className="overview-card green">
              <div className="overview-icon">
                <CalendarDays size={25} />
              </div>

              <strong>{booking ? 1 : 0}</strong>
              <span>{t.upcomingBooking}</span>
            </div>


            <div className="overview-card yellow">
              <div className="overview-icon">
                <Ticket size={25} />
              </div>

              <strong>27</strong>
              <span>{t.yourToken}</span>
            </div>


            <div className="overview-card blue">
              <div className="overview-icon">
                <ClipboardList size={25} />
              </div>

              <strong>{booking ? 1 : 0}</strong>
              <span>{t.totalBookings}</span>
            </div>


            <div className="overview-card green">
              <div className="overview-icon">
                <CheckCircle2 size={25} />
              </div>

              <strong>3</strong>
              <span>{t.completed}</span>
            </div>

          </div>

        </section>


        {/* Upcoming Booking */}
        <section className="upcoming-section">

          <div className="section-title">

            <h2>{t.upcomingBooking}</h2>

            <button type="button" onClick={onMyBooking}>
              View all →
            </button>

          </div>


          <div className="upcoming-booking">
            <div className="booking-info">
              <div className="booking-status">
                {booking ? t.confirmed : t.noBookingYet}
              </div>
              <h3>{booking?.crop || t.wheat}</h3>
              <strong>{booking?.quantity || "25"} {t.quintal}</strong>
              <div className="booking-details">
                <span><CalendarDays size={17} />{booking?.date || "25 May 2026"}</span>
                <span><Clock3 size={17} />{booking?.time || "10:30 AM"}</span>
                <span><MapPin size={17} />{booking?.center || (language === "hi" ? "इंदौर मंडी" : "Indore Mandi")}</span>
              </div>
            </div>
          </div>

        </section>


        {/* Main Action */}
        <button
  type="button"
  className="book-new-slot"
  onClick={onBookSlot}
>
  <CalendarDays size={24} />
  {t.bookNewSlot}
</button>


        {/* Quick Access */}
        <section className="quick-section">

          <h2>{t.quickAccess}</h2>

          <div className="quick-grid">

            <button
  type="button"
  className="quick-card green"
  onClick={onBookSlot}
>
  <CalendarDays size={28} />
  <strong>{t.bookSlot}</strong>
</button>

            <button
              type="button"
              className="quick-card blue"
              onClick={onMyBooking}
            >
              <ClipboardList size={28} />
              <strong>{t.myBooking}</strong>
            </button>

            <button
              type="button"
              className="quick-card yellow"
              onClick={onTokenQueue}
            >
              <Ticket size={28} />
              <strong>{t.tokenQueue}</strong>
            </button>

            <button
              type="button"
              className="quick-card purple"
              onClick={onHistory}
            >
              <Clock3 size={28} />
              <strong>{t.history}</strong>
            </button>
            <button
              type="button"
              className="quick-card purple"
              onClick={onPayment}
            >
              <WalletCards size={28} />
              <strong>{t.payment}</strong>
            </button>

            <button
              type="button"
              className="quick-card blue"
              onClick={onWeather}
            >
              <span className="weather-quick-icon">☁️</span>
              <strong>
                {language === "hi" ? "मौसम" : "Weather"}
              </strong>
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
    <span>{t.home}</span>
  </button>

  <button
  type="button"
  onClick={onBookSlot}
>
  <CalendarDays size={21} />
  <span>{t.bookSlot}</span>
</button>

  <button
    type="button"
    onClick={onPayment}
  >
    <WalletCards size={21} />
    <span>{t.payment}</span>
  </button>

  <button
    type="button"
    onClick={onProfile}
  >
    <UserCircle size={21} />
    <span>{t.profile}</span>
  </button>

</nav>

    </main>
  );
}

export default FarmerDashboard;