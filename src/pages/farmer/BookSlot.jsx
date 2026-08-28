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
  const { t, language } = useLanguage();

  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [center, setCenter] = useState("");
  const [centerSearch, setCenterSearch] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const initial = new Date();
    initial.setDate(1);
    return initial;
  });

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

  const formatDateValue = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const selectedDateObject = date
    ? (() => {
        const [year, month, day] = date.split("-").map(Number);
        return new Date(year, month - 1, day);
      })()
    : null;

  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIndex = calendarMonth.getMonth();
  const calendarMonthName = calendarMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(
    calendarYear,
    calendarMonthIndex + 1,
    0
  ).getDate();
  const firstDayOffset = new Date(
    calendarYear,
    calendarMonthIndex,
    1
  ).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Aaj ki date midnight (00:00:00) par set kar rahe hain taaki comparison sahi ho
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectDate = (day) => {
    const selectedDate = new Date(calendarYear, calendarMonthIndex, day);
    selectedDate.setHours(0, 0, 0, 0);

    // Agar past ki date hai toh return kar jao (select mat hone do)
    if (selectedDate < today) return;

    setDate(formatDateValue(calendarYear, calendarMonthIndex, day));
    setCalendarOpen(false);
  };

  const previousMonth = () => {
    // Optional: Agar chahein ki user past ke months mein bhi na ja sake toh yeh condition laga sakte hain
    const prevMonthDate = new Date(calendarYear, calendarMonthIndex - 1, 1);
    const currentMonthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    
    if (prevMonthDate >= currentMonthFirstDay) {
      setCalendarMonth(prevMonthDate);
    }
  };

  const nextMonth = () => {
    setCalendarMonth(
      new Date(calendarYear, calendarMonthIndex + 1, 1)
    );
  };

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

          <div className="custom-date-picker">
            <button
              type="button"
              className={`date-picker-trigger ${calendarOpen ? "open" : ""}`}
              onClick={() => setCalendarOpen((open) => !open)}
            >
              <span>
                {selectedDateObject
                  ? selectedDateObject.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : (language === "hi" ? "तारीख चुनें" : "Select a date")}
              </span>
              <CalendarDays size5={17} />
            </button>

            {calendarOpen && (
              <div className="date-picker-popover">
                <div className="date-picker-header">
                  <button type="button" onClick={previousMonth} aria-label="Previous month">
                    ←
                  </button>
                  <strong>{calendarMonthName}</strong>
                  <button type="button" onClick={nextMonth} aria-label="Next month">
                    →
                  </button>
                </div>

                <div className="date-picker-weekdays">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="date-picker-grid">
                  {Array.from({ length: firstDayOffset }).map((_, index) => (
                    <span className="date-picker-empty" key={`empty-${index}`} />
                  ))}

                  {calendarDays.map((day) => {
                    const currentDateObj = new Date(calendarYear, calendarMonthIndex, day);
                    currentDateObj.setHours(0, 0, 0, 0);

                    const isPast = currentDateObj < today;
                    const value = formatDateValue(calendarYear, calendarMonthIndex, day);
                    const selected = value === date;

                    return (
                      <button
                        type="button"
                        key={value}
                        disabled={isPast}
                        className={`date-picker-day ${selected ? "selected" : ""} ${isPast ? "disabled-day" : ""}`}
                        onClick={() => selectDate(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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

                <span className="slot-duration"></span>

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