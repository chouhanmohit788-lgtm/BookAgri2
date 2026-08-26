import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Wheat,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import "./BookSlot.css";

function BookSlot({ onBack, onBookingConfirmed }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [center, setCenter] = useState("");
  const [centerSearch, setCenterSearch] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const procurementCentres = [
    "Bhopal Mandi",
    "Berasia Procurement Centre",
    "Sehore Procurement Centre",
    "Ashta Procurement Centre",
    "Ichhawar Procurement Centre",
    "Nasrullaganj Procurement Centre",
    "Indore Mandi",
    "Depalpur Procurement Centre",
    "Mhow Procurement Centre",
    "Sanwer Procurement Centre",
    "Dewas Mandi",
    "Sonkatch Procurement Centre",
    "Bagli Procurement Centre",
    "Ujjain Mandi",
    "Nagda Procurement Centre",
    "Badnawar Procurement Centre",
    "Dhar Mandi",
    "Manawar Procurement Centre",
    "Khargone Mandi",
    "Kasrawad Procurement Centre",
    "Barwaha Procurement Centre",
    "Khandwa Mandi",
    "Burhanpur Mandi",
    "Harda Procurement Centre",
    "Timarni Procurement Centre",
    "Betul Mandi",
    "Multai Procurement Centre",
    "Chhindwara Mandi",
    "Pandhurna Procurement Centre",
    "Seoni Procurement Centre",
    "Jabalpur Mandi",
    "Katni Procurement Centre",
    "Narsinghpur Procurement Centre",
    "Sagar Mandi",
    "Bina Procurement Centre",
    "Damoh Mandi",
    "Panna Procurement Centre",
    "Satna Mandi",
    "Rewa Mandi",
    "Sidhi Procurement Centre",
    "Singrauli Procurement Centre",
    "Shahdol Procurement Centre",
    "Anuppur Procurement Centre",
    "Mandla Procurement Centre",
    "Balaghat Mandi",
    "Gwalior Mandi",
    "Morena Mandi",
    "Bhind Procurement Centre",
    "Shivpuri Mandi",
    "Guna Mandi",
    "Ashoknagar Procurement Centre",
    "Vidisha Mandi",
    "Raisen Mandi",
    "Rajgarh Procurement Centre",
    "Shajapur Mandi",
    "Mandsaur Mandi",
    "Neemuch Mandi",
    "Ratlam Mandi",
    "Jhabua Procurement Centre",
    "Alirajpur Procurement Centre",
  ];

  const filteredCentres = procurementCentres.filter((name) =>
    name.toLowerCase().includes(centerSearch.toLowerCase().trim())
  );

  const timeSlots = [
  {
    time: "9:00 AM – 11:00 AM",
    period: "Morning",
    available: true,
  },
  {
    time: "11:00 AM – 1:00 PM",
    period: "Morning",
    available: true,
  },
  {
    time: "2:00 PM – 04:00 PM",
    period: "Afternoon",
    available: false,
  },
  {
    time: "4:00 PM – 5:30 PM",
    period: "Afternoon",
    available: true,
  },
];

  const handleBooking = () => {
    if (!crop || !quantity || !center || !date || !selectedTime) {
      alert(t.pleaseFillAllDetails);
      return;
    }

    alert(
      `${t.slotBookedSuccessfully}\n\n${t.selectCrop}: ${crop}\n${t.quantity}: ${quantity} ${t.quintal}\n${t.procurementCentre}: ${center}\n${t.date}: ${date}\n${t.time}: ${selectedTime}`
    );

    if (onBookingConfirmed) {
      onBookingConfirmed({
        crop,
        quantity,
        center,
        date,
        time: selectedTime,
        status: "Confirmed",
        token: `FB-${String(Math.floor(1 + Math.random() * 999)).padStart(3, "0")}`,
        queuePosition: Math.floor(3 + Math.random() * 16),
      });
    }
  };

  return (
    <main className={`book-slot-page ${isDark ? "dark-mode" : ""}`}>

      {/* Header */}
      <header className="book-slot-header">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={21} />
        </button>

        <div>
          <h1>{t.bookSlot}</h1>
          <p>{t.scheduleProcurement}</p>
        </div>
      </header>

      {/* Content */}
      <section className="book-slot-content">

        {/* Crop */}
        <div className="booking-card">
          <div className="booking-label">
            <Wheat size={19} />
            <span>{t.selectCrop}</span>
          </div>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          >
            <option value="">{t.selectYourCrop}</option>
            <option value="Wheat">{t.wheat}</option>
            <option value="Soybean">{t.soybean}</option>
            <option value="Maize">{t.maize}</option>
            <option value="Mustard">{t.mustard}</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="booking-card">
          <div className="booking-label">
            <Wheat size={19} />
            <span>{t.quantity}</span>
          </div>

          <div className="quantity-input">
            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <span>{t.quintal}</span>
          </div>
        </div>

        {/* Center */}
        <div className="booking-card">
          <div className="booking-label">
            <MapPin size={19} />
            <span>{t.procurementCentre}</span>
          </div>

          <input
            type="text"
            className="centre-search"
            placeholder={t.searchProcurementCentre}
            value={centerSearch}
            onChange={(e) => setCenterSearch(e.target.value)}
          />

          <select
            value={center}
            onChange={(e) => setCenter(e.target.value)}
          >
            <option value="">{t.selectProcurementCentre}</option>

            {filteredCentres.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="booking-card">
          <div className="booking-label">
            <CalendarDays size={19} />
            <span>{t.selectDate}</span>
          </div>

          <input
            className="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time */}
        <div className="booking-card">
          <div className="booking-label">
            <Clock3 size={19} />
            <span>{t.availableTimeSlots}</span>
          </div>

          <div className="time-grid">
  {timeSlots.map((slot) => (
    <button
      key={slot.time}
      type="button"
      disabled={!slot.available}
      className={`time-slot ${
        selectedTime === slot.time ? "selected" : ""
      } ${!slot.available ? "disabled" : ""}`}
      onClick={() => setSelectedTime(slot.time)}
    >
      <span className="slot-period">
        {slot.period === "Morning" ? t.morning : t.afternoon}
      </span>

      <strong className="slot-time">
        {slot.time}
      </strong>

      <span className="slot-duration">
        
      </span>

      <span className="slot-status">
        {slot.available ? `✓ ${t.available}` : `✕ ${t.full}`}
      </span>
    </button>
  ))}
</div>
        </div>

        {/* Summary */}
        {selectedTime && (
          <div className="booking-summary">
            <CheckCircle2 size={21} />

            <div>
              <strong>{t.slotSelected}</strong>
              <span>
                {date || t.selectDate} • {selectedTime}
              </span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <button
          type="button"
          className="confirm-booking-button"
          onClick={handleBooking}
        >
          <CalendarDays size={20} />
          {t.confirmBooking}
        </button>

      </section>
    </main>
  );
}

export default BookSlot;