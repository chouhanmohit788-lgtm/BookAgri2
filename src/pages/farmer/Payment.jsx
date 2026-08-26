import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Wheat,
  WalletCards,
  Clock3,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./Payment.css";

function Payment({ booking, onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <main className={`payment-page ${isDark ? "dark-mode" : ""}`}>
      <header className="payment-header">
        <button
          type="button"
          className="payment-back"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{t.paymentTitle}</h1>
          <p>{t.paymentSubtitle}</p>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      <section className="payment-content">
        {!booking ? (
          <div className="payment-empty">
            <WalletCards size={44} />
            <h2>{t.noActivePayment}</h2>
            <p>{t.completeBookingPayment}</p>
          </div>
        ) : (
          <>
            <div className="payment-status-card">
              <div className="payment-status">
                <CheckCircle2 size={18} />
                {t.paymentPending}
              </div>

              <div className="payment-icon">
                <WalletCards size={30} />
              </div>

              <h2>{t.procurementPayment}</h2>
              <p>
                {t.paymentPendingNote}
              </p>
            </div>

            <div className="payment-details-card">
              <h3>{t.bookingDetailsTitle}</h3>

              <div className="payment-detail-row">
                <Wheat size={18} />
                <span>
                  <small>{t.selectCrop}</small>
                  <strong>{booking.crop}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <Wheat size={18} />
                <span>
                  <small>Quantity</small>
                  <strong>{booking.quantity} {t.quintal}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <MapPin size={18} />
                <span>
                  <small>{t.bookingCentre}</small>
                  <strong>{booking.center}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <CalendarDays size={18} />
                <span>
                  <small>{t.date}</small>
                  <strong>{booking.date}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <Clock3 size={18} />
                <span>
                  <small>{t.time}</small>
                  <strong>{booking.time}</strong>
                </span>
              </div>
            </div>

            <div className="payment-note">
              {t.paymentPrototypeNote}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Payment;
