import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./CompletedProcurement.css";

function CompletedProcurement({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const isHindi = language === "hi";
  const [search, setSearch] = useState("");

  // Same 10 farmer records already present on the dashboard.
  const farmers = [
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

  const filteredFarmers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return farmers;

    return farmers.filter((farmer) =>
      `${farmer.kisanCode} ${farmer.name} ${farmer.crop} ${farmer.token}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <main className={`completed-procurement-page ${isDark ? "dark-mode" : ""}`}>
      <header className="completed-procurement-header">
        <button type="button" className="completed-back" onClick={onBack}>
          <ArrowLeft size={19} />
        </button>

        <div className="completed-brand">
          <CheckCircle2 size={21} />
          <div>
            <strong>FarmBuddy</strong>
            <span>{isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}</span>
          </div>
        </div>
      </header>

      <section className="completed-content">
        <div className="completed-heading">
          <div>
            <p>{isHindi ? "पूरी हुई खरीद" : "COMPLETED PROCUREMENT"}</p>
            <h1>{isHindi ? "10 किसानों की पूरी हुई खरीद" : "10 Completed Farmer Procurements"}</h1>
            <span>
              {isHindi
                ? "पूरी हुई खरीद की किसान-वार जानकारी"
                : "Farmer-wise details of completed procurement"}
            </span>
          </div>
          <div className="completed-count">
            {filteredFarmers.length} {isHindi ? "रिकॉर्ड" : "Records"}
          </div>
        </div>

        <div className="completed-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isHindi
                ? "किसान नाम, Kisan Code, फसल या Token खोजें..."
                : "Search farmer name, Kisan Code, crop or Token..."
            }
          />
        </div>

        <div className="completed-card">
          <div className="completed-table-wrap">
            <table className="completed-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{isHindi ? "किसान कोड" : "Kisan Code"}</th>
                  <th>{isHindi ? "किसान का नाम" : "Farmer Name"}</th>
                  <th>{isHindi ? "फसल" : "Crop"}</th>
                  <th>{isHindi ? "खरीदी मात्रा" : "Quantity Procured"}</th>
                  <th>{isHindi ? "स्लॉट" : "Slot"}</th>
                  <th>{isHindi ? "टोकन" : "Token"}</th>
                  <th>{isHindi ? "खरीद स्थिति" : "Procurement Status"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.map((farmer, index) => (
                  <tr key={farmer.kisanCode}>
                    <td>{index + 1}</td>
                    <td><strong className="completed-code">{farmer.kisanCode}</strong></td>
                    <td><strong>{farmer.name}</strong></td>
                    <td>{farmer.crop}</td>
                    <td><strong>{farmer.quantity}</strong></td>
                    <td>{farmer.slot}</td>
                    <td><strong className="completed-token">#{farmer.token}</strong></td>
                    <td>
                      <span className="completed-status">
                        <CheckCircle2 size={13} />
                        {isHindi ? "पूरी हुई" : "Completed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFarmers.length === 0 && (
              <div className="completed-empty">
                {isHindi ? "कोई रिकॉर्ड नहीं मिला।" : "No completed procurement found."}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CompletedProcurement;
