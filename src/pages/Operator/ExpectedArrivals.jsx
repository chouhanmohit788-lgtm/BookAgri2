import { CalendarClock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./ExpectedArrivals.css";

function ExpectedArrivals({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const isHindi = language === "hi";
  const [search, setSearch] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const farmers = [
    { token: 40, kisanCode: "MP24001", name: "Ramesh Patel", crop: "Wheat", quantity: "40 Qtl", slot: "09:00–10:00", status: "Expected" },
    { token: 41, kisanCode: "MP24002", name: "Suresh Verma", crop: "Soybean", quantity: "35 Qtl", slot: "09:00–10:00", status: "Expected" },
    { token: 42, kisanCode: "MP24003", name: "Mohan Singh", crop: "Wheat", quantity: "50 Qtl", slot: "10:00–11:00", status: "Expected" },
    { token: 43, kisanCode: "MP24004", name: "Dinesh Yadav", crop: "Maize", quantity: "30 Qtl", slot: "10:00–11:00", status: "Expected" },
    { token: 44, kisanCode: "MP24005", name: "Rajesh Patel", crop: "Wheat", quantity: "45 Qtl", slot: "11:00–12:00", status: "Expected" },
    { token: 45, kisanCode: "MP24006", name: "Anil Verma", crop: "Soybean", quantity: "40 Qtl", slot: "11:00–12:00", status: "Arrived" },
    { token: 46, kisanCode: "MP24007", name: "Mukesh Singh", crop: "Wheat", quantity: "55 Qtl", slot: "12:00–01:00", status: "Arrived" },
    { token: 47, kisanCode: "MP24008", name: "Raju Prajapati", crop: "Maize", quantity: "25 Qtl", slot: "12:00–01:00", status: "Arrived" },
    { token: 48, kisanCode: "MP24009", name: "Shyam Patel", crop: "Wheat", quantity: "60 Qtl", slot: "01:00–02:00", status: "Late" },
    { token: 49, kisanCode: "MP24010", name: "Kailash Verma", crop: "Soybean", quantity: "35 Qtl", slot: "01:00–02:00", status: "Late" },
    { token: 50, kisanCode: "MP24011", name: "Pankaj Singh", crop: "Wheat", quantity: "50 Qtl", slot: "02:00–03:00", status: "Late" },
    { token: 51, kisanCode: "MP24012", name: "Deepak Patel", crop: "Maize", quantity: "30 Qtl", slot: "02:00–03:00", status: "Late" },
    { token: 52, kisanCode: "MP24013", name: "Harish Verma", crop: "Wheat", quantity: "60 Qtl", slot: "03:00–04:00", status: "Late" },
    { token: 53, kisanCode: "MP24014", name: "Gopal Singh", crop: "Soybean", quantity: "65 Qtl", slot: "03:00–04:00", status: "Late" },
  ];

  const filteredFarmers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return farmers;

    return farmers.filter((farmer) =>
      `${farmer.token} ${farmer.kisanCode} ${farmer.name} ${farmer.crop}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const totalQuantity = 620;

  return (
    <main className={`expected-page ${isDark ? "dark-mode" : ""}`}>
      <header className="expected-header">
        <button type="button" className="expected-back" onClick={onBack}>
          <span aria-hidden="true" className="expected-back-arrow">←</span>
        </button>

        <div className="expected-brand">
          <CalendarClock size={21} />
          <div>
            <strong>FarmBuddy</strong>
            <span>{isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}</span>
          </div>
        </div>
      </header>

      <section className="expected-content">
        <div className="expected-heading">
          <div>
            <p>{isHindi ? "आने वाले किसान" : "EXPECTED ARRIVALS"}</p>
            <h1>{isHindi ? "आज आने वाले किसान" : "Expected Arrivals"}</h1>
            <span>
              {isHindi
                ? "आज के स्लॉट के अनुसार आने वाले किसानों की जानकारी"
                : "Farmers expected to arrive in today's scheduled slots"}
            </span>
          </div>

          <div className="expected-summary">
            <div>
              <strong>14</strong>
              <span>{isHindi ? "किसान" : "Farmers"}</span>
            </div>
            <div>
              <strong>{totalQuantity}</strong>
              <span>Qtl</span>
            </div>
          </div>
        </div>

        <div className="expected-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isHindi
                ? "नाम, Kisan Code या Token खोजें..."
                : "Search farmer, Kisan Code or Token..."
            }
          />
        </div>

        <div className="expected-card">
          <div className="expected-table-wrap">
            <table className="expected-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>{isHindi ? "किसान कोड" : "Kisan Code"}</th>
                  <th>{isHindi ? "किसान का नाम" : "Farmer Name"}</th>
                  <th>{isHindi ? "फसल" : "Crop"}</th>
                  <th>{isHindi ? "अपेक्षित मात्रा" : "Expected Qty"}</th>
                  <th>{isHindi ? "आने का स्लॉट" : "Arrival Slot"}</th>
                  <th>{isHindi ? "स्थिति" : "Status"}</th>
                </tr>
              </thead>

              <tbody>
                {filteredFarmers.map((farmer, index) => (
                  <tr key={farmer.token} className="expected-row" onClick={() => setSelectedFarmer(farmer)}>
                    <td><strong className="expected-token">#{farmer.token}</strong></td>
                    <td><strong className="expected-code">{farmer.kisanCode}</strong></td>
                    <td><strong>{farmer.name}</strong></td>
                    <td>{farmer.crop}</td>
                    <td><strong>{farmer.quantity}</strong></td>
                    <td>{farmer.slot}</td>
                    <td><span className={`expected-status ${farmer.status.toLowerCase()}`}>{farmer.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFarmers.length === 0 && (
              <div className="expected-empty">
                {isHindi ? "कोई किसान नहीं मिला।" : "No expected arrival found."}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedFarmer && (
        <div className="farmer-modal-backdrop" onClick={() => setSelectedFarmer(null)}>
          <div className="farmer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="farmer-modal-header">
              <div>
                <p>{isHindi ? "किसान विवरण" : "FARMER DETAILS"}</p>
                <h2>{selectedFarmer.name}</h2>
                <span>{selectedFarmer.kisanCode}</span>
              </div>
              <button
                type="button"
                className="farmer-modal-close"
                onClick={() => setSelectedFarmer(null)}
              >
                ×
              </button>
            </div>

            <div className="farmer-detail-grid">
              <div><span>Token</span><strong>#{selectedFarmer.token}</strong></div>
              <div><span>Crop</span><strong>{selectedFarmer.crop}</strong></div>
              <div><span>Quantity</span><strong>{selectedFarmer.quantity}</strong></div>
              <div><span>Slot</span><strong>{selectedFarmer.slot}</strong></div>
              <div>
                <span>{isHindi ? "Current Status" : "Current Status"}</span>
                <strong className={`detail-status ${selectedFarmer.status.toLowerCase()}`}>
                  {selectedFarmer.status}
                </strong>
              </div>
            </div>

            <div className="farmer-actions">
              <button
                type="button"
                className="action-arrived"
                onClick={() => {
                  selectedFarmer.status = "Arrived";
                  setSelectedFarmer({ ...selectedFarmer });
                }}
              >
                {isHindi ? "✓ Arrived" : "✓ Mark as Arrived"}
              </button>

              <button
                type="button"
                className="action-late"
                onClick={() => {
                  selectedFarmer.status = "Late";
                  setSelectedFarmer({ ...selectedFarmer });
                }}
              >
                {isHindi ? "Late" : "Mark as Late"}
              </button>

              <button
                type="button"
                className="action-complete"
                onClick={() => {
                  selectedFarmer.status = "Completed";
                  setSelectedFarmer({ ...selectedFarmer });
                }}
              >
                {isHindi ? "खरीद पूरी करें" : "Mark Procurement Completed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ExpectedArrivals;
