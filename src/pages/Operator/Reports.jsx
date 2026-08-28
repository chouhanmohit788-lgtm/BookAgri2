import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Download,
  FileCheck2,
  Printer,
  ReceiptText,
  ShieldCheck,
  Wheat,
  XCircle,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";

import "./Reports.css";

function Receipt({ onBack }) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const isHindi = language === "hi";

  const [selected, setSelected] = useState("PR-2026-004821");
  const [savedMessage, setSavedMessage] = useState("");

  const records = [
    {
      id: "PR-2026-004821",
      farmer: "Ramesh Patel",
      code: "KC10245",
      crop: "Wheat",
      expected: "25 Qtl",
      actual: "24.80 Qtl",
      status: "Accepted",
      reason: "",
      date: "28 August 2026",
    },
    {
      id: "PR-2026-004818",
      farmer: "Suresh Verma",
      code: "KC10418",
      crop: "Wheat",
      expected: "18 Qtl",
      actual: "17.60 Qtl",
      status: "Accepted",
      reason: "",
      date: "28 August 2026",
    },
    {
      id: "PR-2026-004815",
      farmer: "Mohan Singh",
      code: "KC10632",
      crop: "Soybean",
      expected: "20 Qtl",
      actual: "20 Qtl",
      status: "Rejected",
      reason: "Crop damaged / quality standard not met",
      date: "28 August 2026",
    },
  ];

  const record =
    records.find((item) => item.id === selected) || records[0];

  const isRejected = record.status === "Rejected";

  return (
    <main className={`receipt-page ${isDark ? "dark-mode" : ""}`}>
      <header className="receipt-header">
        <button type="button" className="receipt-back" onClick={onBack}>
          <ArrowLeft size={19} />
        </button>

        <div className="receipt-brand">
          <div className="receipt-brand-icon">
            <Wheat size={20} />
          </div>

          <div>
            <strong>FarmBuddy</strong>
            <span>
              {isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}
            </span>
          </div>
        </div>

        <div className="receipt-centre">
          <strong>
            {isHindi
              ? "सीहोर प्रोक्योरमेंट केंद्र"
              : "Sehore Procurement Centre"}
          </strong>
          <span>Centre ID: PC1025</span>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="receipt-content">
        <div className="receipt-heading">
          <p>{isHindi ? "केंद्र प्रबंधन" : "Centre Management"}</p>

          <h1>
            {isHindi
              ? "रसीद और खरीद रिकॉर्ड"
              : "Receipt & Procurement Record"}
          </h1>

          <span>
            {isHindi
              ? "पूरी हुई procurement का रिकॉर्ड देखें"
              : "View completed procurement records"}
          </span>
        </div>

        <div className="receipt-layout">
          <section className="receipt-list-card">
            <div className="receipt-list-title">
              <ReceiptText size={17} />
              <strong>Procurement Records</strong>
            </div>

            {records.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`receipt-record ${
                  selected === item.id ? "active" : ""
                }`}
                onClick={() => setSelected(item.id)}
              >
                <div>
                  <strong>{item.farmer}</strong>
                  <span>
                    {item.code} · {item.crop}
                  </span>
                </div>

                {item.status === "Accepted" ? (
                  <BadgeCheck size={16} />
                ) : (
                  <XCircle size={16} />
                )}
              </button>
            ))}
          </section>

          <section className="receipt-paper">
            <div className="receipt-paper-top">
              <div>
                <div className="receipt-logo">
                  <Wheat size={18} />
                </div>
                <strong>FarmBuddy</strong>
              </div>

              <span>Procurement Record</span>
            </div>

            <div
              className={`receipt-result ${
                isRejected ? "rejected" : "accepted"
              }`}
            >
              {isRejected ? <XCircle size={20} /> : <CheckCircle2 size={20} />}

              <div>
                <strong>
                  {isRejected
                    ? "Procurement Rejected"
                    : "Procurement Completed"}
                </strong>

                <span>Record successfully updated</span>
              </div>
            </div>

            <div className="receipt-id">
              <span>Record / Receipt ID</span>
              <strong>{record.id}</strong>
            </div>

            <div className="receipt-details">
              <div>
                <span>Farmer</span>
                <strong>{record.farmer}</strong>
              </div>

              <div>
                <span>Kisan Code</span>
                <strong>{record.code}</strong>
              </div>

              <div>
                <span>Crop</span>
                <strong>{record.crop}</strong>
              </div>

              <div>
                <span>Expected Quantity</span>
                <strong>{record.expected}</strong>
              </div>

              <div>
                <span>Actual Quantity</span>
                <strong>{isRejected ? "-" : record.actual}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{record.date}</strong>
              </div>
            </div>

            <div className={`receipt-quality ${isRejected ? "rejected" : "accepted"}`}>
              {isRejected ? <XCircle size={18} /> : <ShieldCheck size={18} />}

              <div>
                <span>Quality Result</span>
                <strong>{record.status}</strong>
              </div>
            </div>

            {isRejected && (
              <div className="receipt-reason">
                <span>Rejection Reason</span>
                <strong>{record.reason}</strong>
              </div>
            )}

            <div className="receipt-actions">
              <button type="button">
                <Printer size={15} />
                Print
              </button>

              <button
                type="button"
                onClick={() => {
                  setSavedMessage("Record saved successfully");
                  setTimeout(() => setSavedMessage(""), 2500);
                }}
              >
                <Download size={15} />
                Save Record
              </button>
            </div>

            {savedMessage && (
              <div className="receipt-saved-message">
                <CheckCircle2 size={14} />
                <span>{savedMessage}</span>
              </div>
            )}

            <div className="receipt-footer">
              <FileCheck2 size={14} />
              <span>This is a demo procurement record for prototype use.</span>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Receipt;
