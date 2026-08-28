import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Scale,
  Search,
  ShieldCheck,
  UserCircle,
  Wheat,
  XCircle,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";

import "./Procurement.css";

function Procurement({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const farmers = [
    {
      code: "KC10245",
      name: "Ramesh Patel",
      crop: "Wheat",
      expected: "25 Qtl",
      slot: "10:30 AM",
      status: "Arrived",
    },
    {
      code: "KC10418",
      name: "Suresh Verma",
      crop: "Wheat",
      expected: "18 Qtl",
      slot: "11:00 AM",
      status: "Arrived",
    },
    {
      code: "KC10632",
      name: "Mohan Singh",
      crop: "Soybean",
      expected: "20 Qtl",
      slot: "11:30 AM",
      status: "Arrived",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [actualWeight, setActualWeight] = useState("");
  const [quality, setQuality] = useState("");
  const [message, setMessage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [procurementRecords, setProcurementRecords] = useState(farmers);

  const filteredFarmers = procurementRecords.filter((farmer) =>
    `${farmer.code} ${farmer.name} ${farmer.crop}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openProcurement = (farmer) => {
    setSelectedFarmer(farmer);
    setActualWeight("");
    setQuality("");
    setRejectionReason("");
    setMessage("");
  };

  const handleComplete = () => {
    if (!actualWeight || Number(actualWeight) <= 0) {
      setMessage(
        isHindi
          ? "कृपया actual quantity दर्ज करें।"
          : "Please enter the actual quantity."
      );
      return;
    }

    if (!quality) {
      setMessage(
        isHindi
          ? "कृपया quality result चुनें।"
          : "Please select a quality result."
      );
      return;
    }

    if (quality === "rejected" && !rejectionReason.trim()) {
      setMessage(
        isHindi
          ? "कृपया rejection का कारण लिखें।"
          : "Please enter the reason for rejection."
      );
      return;
    }

    const updatedStatus =
      quality === "accepted" ? "Completed" : "Rejected";

    setProcurementRecords((currentRecords) =>
      currentRecords.map((farmer) =>
        farmer.code === selectedFarmer.code
          ? {
              ...farmer,
              status: updatedStatus,
              actualWeight: `${actualWeight} Qtl`,
              quality,
              rejectionReason:
                quality === "rejected"
                  ? rejectionReason.trim()
                  : "",
            }
          : farmer
      )
    );

    setSelectedFarmer((current) => ({
      ...current,
      status: updatedStatus,
      actualWeight: `${actualWeight} Qtl`,
      quality,
      rejectionReason:
        quality === "rejected" ? rejectionReason.trim() : "",
    }));

    setMessage(
      quality === "accepted"
        ? isHindi
          ? "Procurement Accepted — record successfully update हो गया।"
          : "Procurement Accepted — record updated successfully."
        : isHindi
          ? "Procurement Rejected — कारण के साथ record successfully update हो गया।"
          : "Procurement Rejected — record updated successfully with the reason."
    );
  };

  return (
    <main className={`procurement-page ${isDark ? "dark-mode" : ""}`}>
      <header className="procurement-header">
        <button
          type="button"
          className="procurement-back"
          onClick={onBack}
        >
          <ArrowLeft size={19} />
        </button>

        <div className="procurement-brand">
          <div className="procurement-brand-icon">
            <Wheat size={20} />
          </div>
          <div>
            <strong>FarmBuddy</strong>
            <span>
              {isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}
            </span>
          </div>
        </div>

        <div className="procurement-centre">
          <strong>
            {isHindi
              ? "सीहोर प्रोक्योरमेंट केंद्र"
              : "Sehore Procurement Centre"}
          </strong>
          <span>Centre ID: PC1025</span>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="procurement-content">
        <div className="procurement-heading">
          <div>
            <p>{isHindi ? "केंद्र प्रबंधन" : "Centre Management"}</p>
            <h1>{isHindi ? "खरीद" : "Procurement"}</h1>
            <span>
              {isHindi
                ? "आज आए किसानों की फसल की खरीद पूरी करें"
                : "Complete procurement for farmers who have arrived today"}
            </span>
          </div>

          <div className="procurement-secure">
            <ShieldCheck size={16} />
            <span>{isHindi ? "सुरक्षित रिकॉर्ड" : "Secure Record"}</span>
          </div>
        </div>

        <div className="procurement-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isHindi
                ? "Kisan Code या किसान का नाम खोजें..."
                : "Search Kisan Code or farmer name..."
            }
          />
        </div>

        <section className="procurement-list-card">
          <div className="procurement-list-heading">
            <div>
              <h2>{isHindi ? "आज की खरीद" : "Today's Procurement"}</h2>
              <p>
                {isHindi
                  ? "किसान चुनकर procurement transaction शुरू करें"
                  : "Select a farmer to start the procurement transaction"}
              </p>
            </div>

            <span>{filteredFarmers.length} {isHindi ? "किसान" : "Farmers"}</span>
          </div>

          <div className="procurement-table-wrap">
            <table className="procurement-table">
              <thead>
                <tr>
                  <th>{isHindi ? "किसान कोड" : "Kisan Code"}</th>
                  <th>{isHindi ? "किसान" : "Farmer"}</th>
                  <th>{isHindi ? "फसल" : "Crop"}</th>
                  <th>{isHindi ? "अपेक्षित मात्रा" : "Expected Quantity"}</th>
                  <th>{isHindi ? "स्लॉट" : "Slot"}</th>
                  <th>{isHindi ? "स्थिति" : "Status"}</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer.code}>
                    <td>
                      <strong className="procurement-code">{farmer.code}</strong>
                    </td>
                    <td>
                      <div className="procurement-farmer">
                        <div className="procurement-avatar">
                          {farmer.name.charAt(0)}
                        </div>
                        <strong>{farmer.name}</strong>
                      </div>
                    </td>
                    <td>{farmer.crop}</td>
                    <td><strong>{farmer.expected}</strong></td>
                    <td>{farmer.slot}</td>
                    <td>
                      <span
                        className={`procurement-arrived procurement-status-${farmer.status.toLowerCase()}`}
                      >
                        {farmer.status === "Rejected" ? (
                          <XCircle size={12} />
                        ) : farmer.status === "Completed" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <BadgeCheck size={12} />
                        )}
                        {isHindi
                          ? farmer.status === "Arrived"
                            ? "पहुंच गया"
                            : farmer.status === "Completed"
                              ? "खरीद पूरी"
                              : farmer.status === "Rejected"
                                ? "रिजेक्ट"
                                : farmer.status
                          : farmer.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="start-procurement-button"
                        onClick={() => openProcurement(farmer)}
                        disabled={
                          farmer.status === "Completed" ||
                          farmer.status === "Rejected"
                        }
                      >
                        <ClipboardCheck size={15} />
                        {farmer.status === "Completed" || farmer.status === "Rejected"
                          ? isHindi
                            ? "Complete"
                            : "Done"
                          : isHindi
                            ? "खरीद शुरू करें"
                            : "Start"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFarmers.length === 0 && (
              <div className="procurement-empty">
                <Search size={24} />
                <strong>
                  {isHindi ? "कोई किसान नहीं मिला" : "No farmer found"}
                </strong>
              </div>
            )}
          </div>
        </section>

        <div className="procurement-note">
          <ShieldCheck size={17} />
          <span>
            {isHindi
              ? "नया farmer registration यहाँ नहीं होगा। Existing Kisan Code की booking से procurement शुरू होगी।"
              : "New farmer registration is not done here. Procurement starts from an existing Kisan Code booking."}
          </span>
        </div>
      </section>

      {selectedFarmer && (
        <div
          className="procurement-overlay"
          onClick={() => setSelectedFarmer(null)}
        >
          <section
            className="procurement-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="procurement-modal-heading">
              <div>
                <p>{isHindi ? "Procurement Transaction" : "Procurement Transaction"}</p>
                <h2>{selectedFarmer.name}</h2>
              </div>

              <button
                type="button"
                className="procurement-close"
                onClick={() => setSelectedFarmer(null)}
              >
                ×
              </button>
            </div>

            <div className="procurement-verification">
              <UserCircle size={22} />
              <div>
                <strong>{selectedFarmer.code}</strong>
                <span>
                  {isHindi ? "Booking verified / Farmer arrived" : "Booking verified / Farmer arrived"}
                </span>
              </div>
              <CheckCircle2 size={18} />
            </div>

            <div className="procurement-detail-grid">
              <div>
                <span>{isHindi ? "फसल" : "Crop"}</span>
                <strong>{selectedFarmer.crop}</strong>
              </div>
              <div>
                <span>{isHindi ? "अपेक्षित मात्रा" : "Expected Quantity"}</span>
                <strong>{selectedFarmer.expected}</strong>
              </div>
            </div>

            <label className="procurement-field">
              <span>
                <Scale size={15} />
                {isHindi ? "Actual Weight / Quantity (Qtl)" : "Actual Weight / Quantity (Qtl)"}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                placeholder="e.g. 24.80"
              />
            </label>

            <div className="quality-section">
              <div className="quality-title">
                <Wheat size={16} />
                <span>{isHindi ? "Quality Result" : "Quality Result"}</span>
              </div>

              <div className="quality-options">
                <button
                  type="button"
                  className={`quality-button accepted ${quality === "accepted" ? "selected" : ""}`}
                  onClick={() => setQuality("accepted")}
                >
                  <CheckCircle2 size={17} />
                  <span>
                    <strong>{isHindi ? "Accepted" : "Accepted"}</strong>
                    <small>{isHindi ? "फसल सही है" : "Crop quality is acceptable"}</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`quality-button rejected ${quality === "rejected" ? "selected" : ""}`}
                  onClick={() => setQuality("rejected")}
                >
                  <XCircle size={17} />
                  <span>
                    <strong>{isHindi ? "Rejected" : "Rejected"}</strong>
                    <small>{isHindi ? "फसल खराब है" : "Crop quality is poor"}</small>
                  </span>
                </button>
              </div>

              {quality === "rejected" && (
                <label className="rejection-reason-field">
                  <span>
                    <XCircle size={15} />
                    {isHindi ? "Rejection का कारण" : "Reason for Rejection"}
                  </span>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder={
                      isHindi
                        ? "उदाहरण: फसल खराब / quality standard पूरा नहीं हुआ..."
                        : "e.g. Crop damaged / quality standard not met..."
                    }
                    rows={3}
                  />
                </label>
              )}
            </div>

            {message && (
              <div
                className={`procurement-message ${
                  quality === "rejected" ? "rejected-message" : ""
                }`}
              >
                {quality === "rejected" ? <XCircle size={17} /> : <CheckCircle2 size={17} />}
                <span>{message}</span>
              </div>
            )}

            {(selectedFarmer.status === "Completed" ||
              selectedFarmer.status === "Rejected") && (
              <div className="procurement-updated-record">
                <div>
                  <span>{isHindi ? "Updated Status" : "Updated Status"}</span>
                  <strong>
                    {selectedFarmer.status === "Completed"
                      ? "Accepted / Completed"
                      : "Rejected"}
                  </strong>
                </div>

                <div>
                  <span>{isHindi ? "Actual Quantity" : "Actual Quantity"}</span>
                  <strong>{selectedFarmer.actualWeight}</strong>
                </div>

                {selectedFarmer.status === "Rejected" && (
                  <div className="procurement-reason-record">
                    <span>{isHindi ? "Rejection Reason" : "Rejection Reason"}</span>
                    <strong>{selectedFarmer.rejectionReason}</strong>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="complete-procurement-button"
              onClick={handleComplete}
            >
              <ClipboardCheck size={17} />
              {selectedFarmer.status === "Completed" ||
              selectedFarmer.status === "Rejected"
                ? isHindi
                  ? "Update हो गया"
                  : "Updated"
                : isHindi
                  ? "Procurement Complete करें"
                  : "Complete Procurement"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Procurement;
