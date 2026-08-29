import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Image as ImageIcon,
  MessageSquareWarning,
  Paperclip,
  Upload,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./FarmerComplaints.css";

const complaintTypes = [
  "Procurement Centre related",
  "Weighing / Quantity related",
  "Payment related",
  "Quality related",
  "Other",
];

const complaintTypeHi = {
  "Procurement Centre related": "खरीद केंद्र से संबंधित",
  "Weighing / Quantity related": "वजन / मात्रा से संबंधित",
  "Payment related": "भुगतान से संबंधित",
  "Quality related": "गुणवत्ता से संबंधित",
  "Other": "अन्य",
};

const initialComplaints = [
  {
    id: "FB-1024",
    type: "Weighing / Quantity related",
    centre: "Bhopal Mandi Procurement Centre",
    description: "Recorded quantity is lower than the actual quantity.",
    date: "28 Aug 2026, 10:30 AM",
    status: "In Progress",
    attachment: "weight-receipt.jpg",
    resolution: "",
  },
];

export default function FarmerComplaints({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const [complaints, setComplaints] = useState(initialComplaints);
  const [type, setType] = useState("");
  const [centre, setCentre] = useState("");
  const [kisanCode, setKisanCode] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);
  const [withdrawId, setWithdrawId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const fileRef = useRef(null);

  const isHindi = language === "hi";

  const submitComplaint = (event) => {
    event.preventDefault();

    if (!type || !centre || !kisanCode.trim() || !description.trim()) {
      alert(isHindi ? "कृपया सभी जरूरी जानकारी भरें।" : "Please fill all required fields.");
      return;
    }

    const complaint = {
      id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
      type,
      centre,
      kisanCode,
      description,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Pending",
      attachment: file?.name || "",
      resolution: "",
    };

    setComplaints((current) => [complaint, ...current]);
    setSubmittedComplaint(complaint);
    setType("");
    setCentre("");
    setKisanCode("");
    setDescription("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const withdrawComplaint = () => {
    setComplaints((current) =>
      current.map((item) =>
        item.id === withdrawId ? { ...item, status: "Withdrawn" } : item
      )
    );
    setWithdrawId(null);
  };

  const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

  return (
    <main className={`farmer-complaints ${isDark ? "dark-mode" : ""}`}>
      <header className="fc-header">
        <button type="button" className="fc-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>{isHindi ? "वापस" : "Back"}</span>
        </button>

        <div className="fc-brand">
          <div className="fc-brand-icon"><MessageSquareWarning size={21} /></div>
          <div>
            <strong><span>Farm</span>Buddy</strong>
            <small>{isHindi ? "किसान शिकायतें" : "Farmer Complaints"}</small>
          </div>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="fc-content">
        <div className="fc-hero">
          <div className="fc-hero-icon"><MessageSquareWarning size={27} /></div>
          <div>
            <p>FARMER SUPPORT</p>
            <h1>{isHindi ? "अपनी शिकायत दर्ज करें" : "Raise a Complaint"}</h1>
            <span>
              {isHindi
                ? "खरीद से जुड़ी समस्या की जानकारी और जरूरी proof यहाँ भेजें।"
                : "Report a procurement issue and attach supporting proof."}
            </span>
          </div>
        </div>

        {showForm && (
          <form className="fc-form-card" onSubmit={submitComplaint}>
            <div className="fc-section-title">
              <div>
                <p>{isHindi ? "नई शिकायत" : "NEW COMPLAINT"}</p>
                <h2>{isHindi ? "शिकायत की जानकारी" : "Complaint Details"}</h2>
              </div>
            </div>

            <div className="fc-grid">
              <label>
                <span>{isHindi ? "शिकायत का प्रकार" : "Complaint Type"} *</span>
                <div className="fc-select">
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">{isHindi ? "प्रकार चुनें" : "Select type"}</option>
                    {complaintTypes.map((item) => (
                      <option key={item} value={item}>
                        {isHindi ? complaintTypeHi[item] : item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </label>

              <label>
                <span>{isHindi ? "खरीद केंद्र" : "Procurement Centre"} *</span>
                <input
                  value={centre}
                  onChange={(e) => setCentre(e.target.value)}
                  placeholder={isHindi ? "केंद्र का नाम लिखें" : "Enter centre name"}
                />
              </label>

              <label>
                <span>{isHindi ? "किसान कोड" : "Kisan Code"} *</span>
                <input
                  value={kisanCode}
                  onChange={(e) => setKisanCode(e.target.value)}
                  placeholder={isHindi ? "अपना किसान कोड" : "Enter your Kisan Code"}
                />
              </label>

              <label className="fc-full">
                <span>{isHindi ? "शिकायत का विवरण" : "Complaint Description"} *</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isHindi ? "अपनी समस्या विस्तार से लिखें..." : "Describe your problem..."}
                  rows={4}
                />
              </label>

              <div className="fc-full">
                <span className="fc-label">
                  {isHindi ? "स्क्रीनशॉट / दस्तावेज़ (वैकल्पिक)" : "Screenshot / Document (Optional)"}
                </span>
                <input
                  ref={fileRef}
                  className="fc-file-input"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                  type="button"
                  className="fc-upload"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={17} />
                  <span>
                    {file
                      ? file.name
                      : (isHindi ? "Screenshot या document upload करें" : "Upload screenshot or document")}
                  </span>
                  <Paperclip size={16} />
                </button>
                <small className="fc-help">
                  {isHindi
                    ? "Receipt, weighing proof या problem का screenshot जोड़ सकते हैं।"
                    : "You can attach a receipt, weighing proof or problem screenshot."}
                </small>
              </div>
            </div>

            <button type="submit" className="fc-submit">
              <MessageSquareWarning size={18} />
              {isHindi ? "शिकायत जमा करें" : "Submit Complaint"}
            </button>
          </form>
        )}

        <div className="fc-status-head">
          <div>
            <p>{isHindi ? "मेरी शिकायतें" : "MY COMPLAINTS"}</p>
            <h2>{isHindi ? "शिकायत की स्थिति" : "Complaint Status"}</h2>
          </div>
          <button type="button" className="fc-new-btn" onClick={() => setShowForm((v) => !v)}>
            {showForm ? (isHindi ? "फॉर्म बंद करें" : "Hide Form") : (isHindi ? "नई शिकायत" : "New Complaint")}
          </button>
        </div>

        <div className="fc-list">
          {complaints.map((item) => (
            <article className="fc-complaint" key={item.id}>
              <div className="fc-complaint-top">
                <div>
                  <span className="fc-id">{item.id}</span>
                  <h3>{isHindi ? complaintTypeHi[item.type] : item.type}</h3>
                  <small>{item.centre}</small>
                </div>
                <span className={`fc-status ${statusClass(item.status)}`}>
                  {isHindi
                    ? ({
                        Pending: "लंबित",
                        "In Progress": "प्रगति में",
                        Resolved: "समाधान",
                        Withdrawn: "वापस ली गई",
                      }[item.status] || item.status)
                    : item.status}
                </span>
              </div>

              <div className="fc-meta">
                <span><Clock3 size={14} /> {item.date}</span>
                {item.kisanCode && <span>• {isHindi ? "किसान कोड" : "Kisan Code"}: {item.kisanCode}</span>}
                {item.attachment && <span><Paperclip size={14} /> {item.attachment}</span>}
              </div>

              <p className="fc-description">{item.description}</p>

              <div className="fc-timeline">
                <div className={item.status !== "Withdrawn" ? "done" : ""}>
                  <span>1</span>
                  <strong>{isHindi ? "लंबित" : "Pending"}</strong>
                </div>
                <div className={item.status === "In Progress" || item.status === "Resolved" ? "done" : ""}>
                  <span>2</span>
                  <strong>{isHindi ? "प्रगति में" : "In Progress"}</strong>
                </div>
                <div className={item.status === "Resolved" ? "done" : ""}>
                  <span>3</span>
                  <strong>{isHindi ? "समाधान" : "Resolved"}</strong>
                </div>
              </div>

              {item.status === "Withdrawn" ? (
                <div className="fc-withdrawn">
                  <X size={16} />
                  {isHindi ? "यह शिकायत वापस ले ली गई है।" : "This complaint has been withdrawn."}
                </div>
              ) : (
                <button type="button" className="fc-withdraw" onClick={() => setWithdrawId(item.id)}>
                  {isHindi ? "शिकायत वापस लें" : "Withdraw Complaint"}
                </button>
              )}

              {item.resolution && (
                <div className="fc-resolution">
                  <CheckCircle2 size={16} />
                  <div>
                    <strong>{isHindi ? "एडमिन समाधान" : "Admin Resolution"}</strong>
                    <span>{item.resolution}</span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {submittedComplaint && (
        <div className="fc-overlay">
          <div className="fc-modal">
            <button type="button" className="fc-modal-close" onClick={() => setSubmittedComplaint(null)}>
              <X size={18} />
            </button>
            <div className="fc-success-icon"><CheckCircle2 size={30} /></div>
            <h2>{isHindi ? "शिकायत सफलतापूर्वक जमा हुई" : "Complaint Submitted Successfully"}</h2>
            <p>
              {isHindi
                ? "आपकी समस्या को 48 घंटे या उससे कम समय में ठीक करने का प्रयास किया जाएगा।"
                : "Your problem will be addressed within 48 hours or less."}
            </p>
            <div className="fc-modal-id">{submittedComplaint.id}</div>
            <button type="button" className="fc-modal-primary" onClick={() => setSubmittedComplaint(null)}>
              {isHindi ? "स्थिति देखें" : "View Status"}
            </button>
            <button type="button" className="fc-modal-secondary" onClick={() => setSubmittedComplaint(null)}>
              {isHindi ? "Close" : "Close"}
            </button>
          </div>
        </div>
      )}

      {withdrawId && (
        <div className="fc-overlay">
          <div className="fc-modal fc-withdraw-modal">
            <button type="button" className="fc-modal-close" onClick={() => setWithdrawId(null)}>
              <X size={18} />
            </button>
            <div className="fc-warning-icon"><MessageSquareWarning size={28} /></div>
            <h2>{isHindi ? "शिकायत वापस लें?" : "Withdraw this complaint?"}</h2>
            <p>
              {isHindi
                ? "क्या आप निश्चित हैं कि आप यह शिकायत वापस लेना चाहते हैं?"
                : "Are you sure you want to withdraw this complaint?"}
            </p>
            <div className="fc-modal-actions">
              <button type="button" className="fc-modal-secondary" onClick={() => setWithdrawId(null)}>
                {isHindi ? "रद्द करें" : "Cancel"}
              </button>
              <button type="button" className="fc-modal-danger" onClick={withdrawComplaint}>
                {isHindi ? "वापस लें" : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
