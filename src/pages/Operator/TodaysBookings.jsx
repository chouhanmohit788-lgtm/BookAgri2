import { ArrowLeft, Search, UserRound } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import "./TodaysBookings.css";

function TodaysBookings({ onBack }) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const isHindi = language === "hi";

  const [search, setSearch] = useState("");

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
  ];

  const filteredBookings = bookings.filter((booking) =>
    `${booking.kisanCode} ${booking.name} ${booking.crop}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusText = (status) => {
    if (!isHindi) return status;

    const translations = {
      Booked: "बुक किया गया",
      Arrived: "पहुंच गया",
      Procurement: "खरीद जारी",
      Completed: "पूरा हुआ",
    };

    return translations[status] || status;
  };

  return (
    <main className={`bookings-page ${isDark ? "dark-mode" : ""}`}>
      <header className="bookings-header">
        <button
          type="button"
          className="bookings-back"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="bookings-heading">
          <h1>
            {isHindi ? "आज की बुकिंग" : "Today's Bookings"}
          </h1>

          <p>
            {isHindi
              ? "आज आने वाले किसानों की बुकिंग देखें"
              : "View today's farmer bookings"}
          </p>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      <section className="bookings-content">

        <div className="bookings-summary">
          <div>
            <span>{isHindi ? "कुल बुकिंग" : "Total Bookings"}</span>
            <strong>{bookings.length}</strong>
          </div>

          <div>
            <span>{isHindi ? "आज आए" : "Farmers Arrived"}</span>
            <strong>
              {bookings.filter((item) => item.status === "Arrived").length}
            </strong>
          </div>

          <div>
            <span>{isHindi ? "पूरी हुई" : "Completed"}</span>
            <strong>
              {bookings.filter((item) => item.status === "Completed").length}
            </strong>
          </div>
        </div>

        <div className="bookings-toolbar">
          <div className="bookings-search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isHindi
                  ? "किसान कोड या नाम खोजें..."
                  : "Search Kisan Code or farmer name..."
              }
            />
          </div>
        </div>

        <section className="bookings-card">
          <div className="bookings-card-title">
            <div>
              <UserRound size={19} />
              <h2>
                {isHindi
                  ? "किसानों की सूची"
                  : "Farmer Booking List"}
              </h2>
            </div>

            <span>
              {filteredBookings.length}{" "}
              {isHindi ? "बुकिंग" : "Bookings"}
            </span>
          </div>

          <div className="booking-list">
            {filteredBookings.length === 0 ? (
              <div className="booking-empty">
                {isHindi
                  ? "कोई बुकिंग नहीं मिली।"
                  : "No bookings found."}
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  className="booking-row"
                  key={booking.kisanCode}
                >
                  <div className="booking-farmer">
                    <div className="farmer-avatar">
                      {booking.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{booking.name}</strong>
                      <span>{booking.kisanCode}</span>
                    </div>
                  </div>

                  <div className="booking-detail">
                    <span>{isHindi ? "फसल" : "Crop"}</span>
                    <strong>{booking.crop}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>{isHindi ? "मात्रा" : "Quantity"}</span>
                    <strong>{booking.quantity}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>{isHindi ? "स्लॉट" : "Slot"}</span>
                    <strong>{booking.slot}</strong>
                  </div>

                  <div className="booking-token">
                    <span>{isHindi ? "टोकन" : "Token"}</span>
                    <strong>#{booking.token}</strong>
                  </div>

                  <div
                    className={`booking-status status-${booking.status.toLowerCase()}`}
                  >
                    {getStatusText(booking.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </section>
    </main>
  );
}

export default TodaysBookings;