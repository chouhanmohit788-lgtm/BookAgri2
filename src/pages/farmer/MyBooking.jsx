import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Wheat,
  ClipboardList,
  TicketCheck,
  Building2,
  PackageCheck,
  CreditCard,
  CircleDot,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./MyBooking.css";

function MyBooking({ booking, onBack, onBookingUpdated }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
  const [localBooking, setLocalBooking] = useState(booking || null);
  const [modal, setModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState(
    booking?.status || "Confirmed"
  );
  const [tokenNumber, setTokenNumber] = useState(
    booking?.tokenNumber || createTokenNumber(booking)
  );

  function createTokenNumber(sourceBooking) {
    if (sourceBooking?.tokenNumber) return sourceBooking.tokenNumber;

    const seed =
      sourceBooking?.id ??
      sourceBooking?.bookingId ??
      sourceBooking?.dateValue ??
      sourceBooking?.date ??
      "104";

    const digits = String(seed).replace(/\D/g, "").slice(-3).padStart(3, "0");
    return `T-${digits}`;
  }

  useEffect(() => {
    setLocalBooking(booking || null);
    setBookingStatus(booking?.status || "Confirmed");
    setTokenNumber(booking?.tokenNumber || createTokenNumber(booking));
  }, [booking]);

  const availableSlots = useMemo(
    () => ({
      Morning: ["09:00 AM", "10:30 AM", "12:00 PM"],
      Afternoon: ["02:00 PM", "03:30 PM", "05:00 PM"],
    }),
    []
  );

  const dates = useMemo(() => {
    const base = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date(base);
      d.setDate(base.getDate() + index);
      const iso = d.toISOString().split("T")[0];
      return {
        value: iso,
        label: d.toLocaleDateString(
          language === "hi" ? "hi-IN" : "en-IN",
          { day: "2-digit", month: "short", year: "numeric" }
        ),
      };
    });
  }, [language]);

  const openReschedule = () => {
    const firstDate = dates[0]?.value || "";
    setSelectedDate(localBooking?.dateValue || firstDate);
    setSelectedTime("");
    setModal("reschedule");
  };

  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime || !localBooking) return;

    const nextBooking = {
      ...localBooking,
      date: dates.find((item) => item.value === selectedDate)?.label || selectedDate,
      dateValue: selectedDate,
      time: selectedTime,
      status: "Confirmed",
      tokenNumber,
      trackingStatus: "confirmed",
    };

    setLocalBooking(nextBooking);
    setBookingStatus("Confirmed");
    setModal(null);

    if (onBookingUpdated) {
      onBookingUpdated(nextBooking);
    }
  };

  const confirmCancel = () => {
    if (!localBooking) return;

    const cancelledBooking = {
      ...localBooking,
      status: "Cancelled",
    };

    setLocalBooking(null);
    setBookingStatus("Cancelled");
    setModal(null);

    if (onBookingUpdated) {
      onBookingUpdated(null);
    }
  };

  const trackingSteps = [
    {
      key: "confirmed",
      title: language === "hi" ? "बुकिंग कन्फर्म" : "Booking Confirmed",
      detail:
        language === "hi"
          ? "आपकी बुकिंग सफलतापूर्वक कन्फर्म है"
          : "Your procurement booking is confirmed",
      icon: CheckCircle2,
      meta: localBooking?.confirmedAt || "",
    },
    {
      key: "token",
      title: language === "hi" ? "टोकन असाइन" : "Token Assigned",
      detail: language === "hi" ? `टोकन नंबर ${tokenNumber}` : `Token Number ${tokenNumber}`,
      icon: TicketCheck,
      meta: `Token: ${tokenNumber}`,
    },
    {
      key: "arrival",
      title: language === "hi" ? "आने का समय" : "Arrival Time",
      detail: `${localBooking?.date || "—"} • ${localBooking?.time || "—"}`,
      icon: Clock3,
      meta: language === "hi" ? "निर्धारित समय" : "Scheduled arrival",
    },
    {
      key: "centre",
      title: language === "hi" ? "प्रोक्योरमेंट सेंटर पहुँचे" : "Reached Procurement Centre",
      detail: localBooking?.center || "—",
      icon: Building2,
      meta: language === "hi" ? "आगमन के बाद" : "After arrival",
    },
    {
      key: "procurement",
      title: language === "hi" ? "प्रोक्योरमेंट शुरू" : "Procurement Started",
      detail:
        language === "hi"
          ? "क्वालिटी और वजन की जाँच"
          : "Quality and quantity verification",
      icon: PackageCheck,
      meta: language === "hi" ? "प्रतीक्षा में" : "Waiting",
    },
    {
      key: "payment",
      title: language === "hi" ? "पेमेंट प्रोसेसिंग" : "Payment Processing",
      detail:
        language === "hi"
          ? "भुगतान प्रक्रिया शुरू होने की प्रतीक्षा"
          : "Waiting for payment processing",
      icon: CreditCard,
      meta: language === "hi" ? "प्रतीक्षा में" : "Waiting",
    },
    {
      key: "completed",
      title: language === "hi" ? "बुकिंग पूर्ण" : "Booking Completed",
      detail:
        language === "hi"
          ? "सभी चरण पूरे होने के बाद"
          : "After all booking steps are completed",
      icon: CircleDot,
      meta: language === "hi" ? "प्रतीक्षा में" : "Waiting",
    },
  ];

  const activeTrackingKey = localBooking?.trackingStatus || "confirmed";
  const activeTrackingIndex = Math.max(
    0,
    trackingSteps.findIndex((step) => step.key === activeTrackingKey)
  );

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
        {!localBooking ? (
          <div className="my-booking-empty">
            <ClipboardList size={42} />
            <h2>{t.noBookingYet}</h2>
            <p>{t.bookProcurementSlot}</p>
          </div>
        ) : (
          <div className="my-booking-card">
            <div className="my-booking-status-row">
              <div className="my-booking-status">
                <CheckCircle2 size={20} />
                <span>
                  {bookingStatus === "Confirmed" ? t.confirmed : bookingStatus}
                </span>
              </div>

              {bookingStatus === "Confirmed" && (
                <div className="my-booking-actions">
                  <button
                    type="button"
                    className="my-booking-cancel"
                    onClick={() => setModal("cancel")}
                  >
                    {language === "hi" ? "बुकिंग रद्द करें" : "Cancel Booking"}
                  </button>

                  <button
                    type="button"
                    className="my-booking-reschedule"
                    onClick={openReschedule}
                  >
                    {language === "hi" ? "पुनर्निर्धारित करें" : "Reschedule"}
                  </button>
                </div>
              )}
            </div>

            <div className="my-booking-title">
              <div className="my-booking-crop-icon">
                <Wheat size={25} />
              </div>

              <div>
                <h2>{localBooking.crop}</h2>
                <strong>{localBooking.quantity} {t.quintal}</strong>
              </div>
            </div>

            <div className="my-booking-details">
              <div>
                <CalendarDays size={19} />
                <span>
                  <small>{t.date}</small>
                  <strong>{localBooking.date}</strong>
                </span>
              </div>

              <div>
                <Clock3 size={19} />
                <span>
                  <small>{t.time}</small>
                  <strong>{localBooking.time}</strong>
                </span>
              </div>

              <div>
                <MapPin size={19} />
                <span>
                  <small>{t.bookingCentre}</small>
                  <strong>{localBooking.center}</strong>
                </span>
              </div>
            </div>

            <div className="booking-tracking">
              <div className="booking-tracking-header">
                <div>
                  <span className="booking-tracking-kicker">BOOKING TRACKING</span>
                  <h3>
                    {language === "hi"
                      ? "आपकी बुकिंग की स्थिति"
                      : "Your Booking Journey"}
                  </h3>
                </div>

                <div className="booking-tracking-token">
                  <small>Token</small>
                  <strong>{tokenNumber}</strong>
                </div>
              </div>

              <div className="booking-tracking-list">
                {trackingSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isDone = index < activeTrackingIndex;
                  const isActive = index === activeTrackingIndex;

                  return (
                    <div
                      key={step.key}
                      className={`tracking-step ${isDone ? "done" : ""} ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <div className="tracking-rail">
                        <div className="tracking-icon">
                          <StepIcon size={16} />
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <span className="tracking-line" />
                        )}
                      </div>

                      <div className="tracking-content">
                        <div className="tracking-step-top">
                          <strong>{step.title}</strong>
                          <span
                            className={`tracking-state ${
                              isDone || isActive ? "live" : ""
                            }`}
                          >
                            {isDone
                              ? language === "hi"
                                ? "पूरा"
                                : "Done"
                              : isActive
                              ? language === "hi"
                                ? "वर्तमान"
                                : "Current"
                              : language === "hi"
                              ? "आगे"
                              : "Next"}
                          </span>
                        </div>

                        <p>{step.detail}</p>
                        <small>
                          {step.meta ||
                            (isActive
                              ? language === "hi"
                                ? "अभी सक्रिय"
                                : "Active now"
                              : language === "hi"
                              ? "अपडेट का इंतज़ार"
                              : "Waiting for update")}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="my-booking-id">
              <span>{t.bookingId}</span>
              <strong>FB-{Date.now().toString().slice(-8)}</strong>
            </div>
          </div>
        )}
      </section>

      {modal === "cancel" && (
        <div className="booking-modal-backdrop">
          <div className="booking-modal" role="dialog" aria-modal="true">
            <div className="booking-modal-icon warning">!</div>
            <h3>
              {language === "hi"
                ? "बुकिंग रद्द करें?"
                : "Cancel Booking?"}
            </h3>
            <p>
              {language === "hi"
                ? "क्या आप वाकई अपनी यह बुकिंग रद्द करना चाहते हैं?"
                : "Are you sure you want to cancel this booking?"}
            </p>

            <div className="booking-modal-actions">
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() => setModal(null)}
              >
                {language === "hi" ? "नहीं" : "No"}
              </button>

              <button
                type="button"
                className="booking-modal-danger"
                onClick={confirmCancel}
              >
                {language === "hi" ? "हाँ, रद्द करें" : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "reschedule" && (
        <div className="booking-modal-backdrop">
          <div className="booking-modal booking-reschedule-modal" role="dialog" aria-modal="true">
            <div className="booking-modal-icon schedule">📅</div>
            <h3>
              {language === "hi"
                ? "बुकिंग पुनर्निर्धारित करें"
                : "Reschedule Booking"}
            </h3>

            <label className="booking-modal-label">
              {language === "hi" ? "तारीख चुनें" : "Select Date"}
            </label>

            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime("");
              }}
              className="booking-modal-select"
            >
              <option value="">
                {language === "hi" ? "तारीख चुनें" : "Select a date"}
              </option>
              {dates.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <label className="booking-modal-label">
              {language === "hi"
                ? "उपलब्ध समय स्लॉट"
                : "Available Time Slots"}
            </label>

            <div className="booking-time-grid">
              {Object.entries(availableSlots).flatMap(([period, slots]) =>
                slots.map((slot) => (
                  <button
                    type="button"
                    key={`${period}-${slot}`}
                    className={`booking-time-option ${
                      selectedTime === slot ? "active" : ""
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <span>{slot}</span>
                    <small>
                      {language === "hi"
                        ? period === "Morning"
                          ? "सुबह"
                          : "दोपहर"
                        : period}
                    </small>
                  </button>
                ))
              )}
            </div>

            {selectedDate && !selectedTime && (
              <p className="booking-modal-note">
                {language === "hi"
                  ? "इस तारीख पर उपलब्ध स्लॉट में से कोई समय चुनें। यदि उपयुक्त समय न मिले, दूसरी तारीख चुनें।"
                  : "Choose an available time for this date. If no suitable time is available, choose another date."}
              </p>
            )}

            <div className="booking-modal-actions">
              <button
                type="button"
                className="booking-modal-secondary"
                onClick={() => setModal(null)}
              >
                {language === "hi" ? "रद्द करें" : "Close"}
              </button>

              <button
                type="button"
                className="booking-modal-primary"
                disabled={!selectedDate || !selectedTime}
                onClick={confirmReschedule}
              >
                {language === "hi"
                  ? "बुकिंग अपडेट करें"
                  : "Update Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyBooking;
