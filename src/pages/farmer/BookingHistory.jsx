import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Ticket,
  Wheat,
  History,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./BookingHistory.css";

function BookingHistory({ booking, onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <main className={`history-page ${isDark ? "dark-mode" : ""}`}>
      <header className="history-header">
        <button type="button" className="history-back" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{t.bookingHistoryTitle}</h1>
          <p>{t.bookingHistorySubtitle}</p>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="history-content">
        {!booking ? (
          <div className="history-empty">
            <History size={44} />
            <h2>{t.noBookingHistory}</h2>
            <p>{t.pastBookingsNote}</p>
          </div>
        ) : (
          <div className="history-list">
            <article className="history-card">
              <div className="history-top">
                <div className="history-crop">
                  <div className="history-icon">
                    <Wheat size={22} />
                  </div>
                  <div>
                    <h2>{booking.crop}</h2>
                    <strong>{booking.quantity} {t.quintal}</strong>
                  </div>
                </div>

                <span className="history-status">
                  <CheckCircle2 size={15} />
                  {booking.status === "Confirmed" ? t.confirmed : booking.status}
                </span>
              </div>

              <div className="history-details">
                <div>
                  <MapPin size={18} />
                  <span>
                    <small>{t.bookingCentre}</small>
                    <strong>{booking.center}</strong>
                  </span>
                </div>

                <div>
                  <CalendarDays size={18} />
                  <span>
                    <small>{t.date}</small>
                    <strong>{booking.date}</strong>
                  </span>
                </div>

                <div>
                  <Clock3 size={18} />
                  <span>
                    <small>{t.time}</small>
                    <strong>{booking.time}</strong>
                  </span>
                </div>

                <div>
                  <Ticket size={18} />
                  <span>
                    <small>{t.yourToken}</small>
                    <strong>{booking.token || "—"}</strong>
                  </span>
                </div>
              </div>
            </article>

            <p className="history-demo-note">
              {t.prototypeHistoryNote}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default BookingHistory;
