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
  const { t, language } = useLanguage();

  const pastBookings = [
    {
      id: "FB-84261372",
      crop: "Wheat",
      quantity: "18",
      center: "Sehore Mandi",
      date: "28/08/2026",
      time: "10:30 AM – 12:00 PM",
      token: "T-082",
      status: "Completed",
      payment: "Paid",
    },
  ];

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
        <div className="history-list">
          {pastBookings.map((item) => (
            <article className="history-card" key={item.id}>
              <div className="history-top">
                <div className="history-crop">
                  <div className="history-icon">
                    <Wheat size={22} />
                  </div>
                  <div>
                    <h2>{item.crop}</h2>
                    <strong>{item.quantity} {t.quintal}</strong>
                  </div>
                </div>

                <span className="history-status">
                  <CheckCircle2 size={15} />
                  {language === "hi" ? "पूर्ण" : item.status}
                </span>
              </div>

              <div className="history-details">
                <div>
                  <MapPin size={18} />
                  <span>
                    <small>{t.bookingCentre}</small>
                    <strong>{item.center}</strong>
                  </span>
                </div>

                <div>
                  <CalendarDays size={18} />
                  <span>
                    <small>{t.date}</small>
                    <strong>{item.date}</strong>
                  </span>
                </div>

                <div>
                  <Clock3 size={18} />
                  <span>
                    <small>{t.time}</small>
                    <strong>{item.time}</strong>
                  </span>
                </div>

                <div>
                  <Ticket size={18} />
                  <span>
                    <small>{t.yourToken}</small>
                    <strong>{item.token}</strong>
                  </span>
                </div>
              </div>

              <div className="history-payment">
                <span>
                  <small>{language === "hi" ? "भुगतान" : "Payment"}</small>
                  <strong>{language === "hi" ? "भुगतान हो गया" : item.payment}</strong>
                </span>
                <span className="history-payment-badge">
                  <CheckCircle2 size={13} />
                  {language === "hi" ? "Paid" : "Paid"}
                </span>
              </div>

              <div className="history-booking-id">
                <span>{t.bookingId}</span>
                <strong>{item.id}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookingHistory;
