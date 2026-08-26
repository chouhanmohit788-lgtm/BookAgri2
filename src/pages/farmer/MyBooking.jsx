import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Wheat,
  ClipboardList,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./MyBooking.css";

function MyBooking({ booking, onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <main className={`my-booking-page ${isDark ? "dark-mode" : ""}`}>
      <header className="my-booking-header">
        <button
          type="button"
          className="my-booking-back"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{t.myBooking}</h1>
          <p>{t.currentBooking}</p>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      <section className="my-booking-content">
        {!booking ? (
          <div className="my-booking-empty">
            <ClipboardList size={42} />
            <h2>{t.noBookingYet}</h2>
            <p>{t.bookProcurementSlot}</p>
          </div>
        ) : (
          <div className="my-booking-card">
            <div className="my-booking-status">
              <CheckCircle2 size={20} />
              <span>{booking.status === "Confirmed" ? t.confirmed : booking.status}</span>
            </div>

            <div className="my-booking-title">
              <div className="my-booking-crop-icon">
                <Wheat size={25} />
              </div>

              <div>
                <h2>{booking.crop}</h2>
                <strong>{booking.quantity} {t.quintal}</strong>
              </div>
            </div>

            <div className="my-booking-details">
              <div>
                <CalendarDays size={19} />
                <span>
                  <small>{t.date}</small>
                  <strong>{booking.date}</strong>
                </span>
              </div>

              <div>
                <Clock3 size={19} />
                <span>
                  <small>{t.time}</small>
                  <strong>{booking.time}</strong>
                </span>
              </div>

              <div>
                <MapPin size={19} />
                <span>
                  <small>{t.bookingCentre}</small>
                  <strong>{booking.center}</strong>
                </span>
              </div>
            </div>

            <div className="my-booking-id">
              <span>{t.bookingId}</span>
              <strong>FB-{Date.now().toString().slice(-8)}</strong>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyBooking;
