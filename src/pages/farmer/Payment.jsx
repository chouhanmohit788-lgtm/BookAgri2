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

  // Payment page intentionally shows the same completed booking
  // that is displayed in Booking History.
  const historyBooking = {
    crop: "Wheat",
    quantity: 18,
    center: "Sehore Mandi",
    date: "28/08/2026",
    time: "10:30 AM – 12:00 PM",
    token: "T-082",
    paymentAmount: "₹45,000",
  };

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
                Payment Successful
              </div>

              <div className="payment-icon">
                <WalletCards size={30} />
              </div>

              <h2>Payment Successful</h2>
              <p>Payment for your completed procurement booking has been received.</p>
            </div>

            <div className="payment-details-card">
              <h3>{t.bookingDetailsTitle}</h3>

              <div className="payment-detail-row">
                <Wheat size={18} />
                <span>
                  <small>{t.selectCrop}</small>
                  <strong>{historyBooking.crop}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <Wheat size={18} />
                <span>
                  <small>Quantity</small>
                  <strong>{historyBooking.quantity} {t.quintal}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <MapPin size={18} />
                <span>
                  <small>{t.bookingCentre}</small>
                  <strong>{historyBooking.center}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <CalendarDays size={18} />
                <span>
                  <small>{t.date}</small>
                  <strong>{historyBooking.date}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <Clock3 size={18} />
                <span>
                  <small>{t.time}</small>
                  <strong>{historyBooking.time}</strong>
                </span>
              </div>

              <div className="payment-detail-row">
                <WalletCards size={18} />
                <span>
                  <small>Your Token</small>
                  <strong>{historyBooking.token}</strong>
                </span>
              </div>
            </div>

            <div className="payment-amount-card">
              <span>Payment Amount</span>
              <strong>{historyBooking.paymentAmount}</strong>
            </div>

            <div className="payment-note">
              1 payment completed • Amount {historyBooking.paymentAmount}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Payment;
