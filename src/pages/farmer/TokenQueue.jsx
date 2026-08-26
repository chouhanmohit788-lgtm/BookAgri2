import {
  ArrowLeft,
  Clock3,
  MapPin,
  Users,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./TokenQueue.css";

function TokenQueue({ booking, onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const tokenNumber = booking?.token || "FB-024";
  const queuePosition = booking?.queuePosition || 7;

  return (
    <main className={`token-page ${isDark ? "dark-mode" : ""}`}>
      <header className="token-header">
        <button type="button" className="token-back" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{t.tokenQueueTitle}</h1>
          <p>{t.tokenQueueSubtitle}</p>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="token-content">
        {!booking ? (
          <div className="token-empty">
            <Ticket size={42} />
            <h2>{t.noActiveBooking}</h2>
            <p>{t.bookSlotFirstToken}</p>
          </div>
        ) : (
          <>
            <div className="token-main-card">
              <div className="token-status">
                <CheckCircle2 size={18} />
                Booking Confirmed
              </div>

              <div className="token-number-label">{t.yourToken}</div>
              <div className="token-number">{tokenNumber}</div>

              <div className="queue-position">
                <Users size={21} />
                <div>
                  <small>{t.currentQueuePosition}</small>
                  <strong>#{queuePosition}</strong>
                </div>
              </div>
            </div>

            <div className="token-details">
              <div>
                <MapPin size={19} />
                <span>
                  <small>{t.bookingCentre}</small>
                  <strong>{booking.center}</strong>
                </span>
              </div>

              <div>
                <Clock3 size={19} />
                <span>
                  <small>{t.slot}</small>
                  <strong>{booking.date} · {booking.time}</strong>
                </span>
              </div>
            </div>

            <div className="queue-note">
              {t.reachCentreNote}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default TokenQueue;
