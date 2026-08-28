import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./TodayBookings.css";

function TodayBookings({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
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
    {
      kisanCode: "KC11024",
      name: "Anil Sharma",
      crop: "Soybean",
      quantity: "22 Qtl",
      slot: "12:30 PM",
      token: "31",
      status: "Arrived",
    },
    {
      kisanCode: "KC11209",
      name: "Deepak Meena",
      crop: "Wheat",
      quantity: "28 Qtl",
      slot: "01:00 PM",
      token: "32",
      status: "Booked",
    },
    {
      kisanCode: "KC11456",
      name: "Vijay Solanki",
      crop: "Maize",
      quantity: "24 Qtl",
      slot: "01:30 PM",
      token: "33",
      status: "Procurement",
    },
    {
      kisanCode: "KC11673",
      name: "Sunil Chouhan",
      crop: "Wheat",
      quantity: "19 Qtl",
      slot: "02:00 PM",
      token: "34",
      status: "Arrived",
    },
    {
      kisanCode: "KC11842",
      name: "Arjun Verma",
      crop: "Soybean",
      quantity: "26 Qtl",
      slot: "02:30 PM",
      token: "35",
      status: "Booked",
    },
    {
      kisanCode: "KC12018",
      name: "Manoj Patel",
      crop: "Wheat",
      quantity: "21 Qtl",
      slot: "03:00 PM",
      token: "36",
      status: "Completed",
    },
  
  ];

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter((booking) =>
      `${booking.kisanCode} ${booking.name} ${booking.crop}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const getStatusText = (status) => {
    if (!isHindi) return status;
    const statusMap = {
      Booked: "बुक किया गया",
      Arrived: "पहुंच गया",
      Procurement: "खरीद जारी",
      Completed: "पूरा हुआ",
    };
    return statusMap[status] || status;
  };

  return (
    <main className={`today-bookings-page ${isDark ? "dark-mode" : ""}`}>
      <header className="today-bookings-header">
        <button
          type="button"
          className="today-bookings-back"
          onClick={onBack}
        >
          <ArrowLeft size={19} />
        </button>

        <div className="today-bookings-brand">
          <CalendarDays size={20} />
          <div>
            <strong>FarmBuddy</strong>
            <span>{isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}</span>
          </div>
        </div>
      </header>

      <section className="today-bookings-content">
        <div className="today-bookings-heading">
          <div>
            <p>{isHindi ? "आज की बुकिंग" : "TODAY'S BOOKINGS"}</p>
            <h1>{isHindi ? "10 किसानों की बुकिंग" : "10 Farmer Bookings"}</h1>
            <span>
              {isHindi
                ? "आज के लिए निर्धारित सभी किसानों की बुकिंग"
                : "All farmer bookings scheduled for today"}
            </span>
          </div>

          <div className="today-bookings-count">
            {filteredBookings.length} {isHindi ? "बुकिंग" : "Bookings"}
          </div>
        </div>

        <div className="today-bookings-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isHindi
                ? "किसान नाम, Kisan Code या फसल खोजें..."
                : "Search farmer name, Kisan Code or crop..."
            }
          />
        </div>

        <div className="today-bookings-card">
          <div className="today-bookings-table-wrap">
            <table className="today-bookings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{isHindi ? "किसान कोड" : "Kisan Code"}</th>
                  <th>{isHindi ? "किसान का नाम" : "Farmer Name"}</th>
                  <th>{isHindi ? "फसल" : "Crop"}</th>
                  <th>{isHindi ? "मात्रा" : "Quantity"}</th>
                  <th>{isHindi ? "स्लॉट" : "Slot"}</th>
                  <th>{isHindi ? "टोकन" : "Token"}</th>
                  <th>{isHindi ? "स्थिति" : "Status"}</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.kisanCode}>
                    <td>{index + 1}</td>
                    <td><strong className="today-bookings-code">{booking.kisanCode}</strong></td>
                    <td><strong>{booking.name}</strong></td>
                    <td>{booking.crop}</td>
                    <td><strong>{booking.quantity}</strong></td>
                    <td>{booking.slot}</td>
                    <td><strong className="today-bookings-token">#{booking.token}</strong></td>
                    <td>
                      <span className={`today-bookings-status status-${booking.status.toLowerCase()}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="today-bookings-empty">
                {isHindi ? "कोई बुकिंग नहीं मिली।" : "No bookings found."}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default TodayBookings;
