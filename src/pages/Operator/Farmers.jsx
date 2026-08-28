import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  MapPin,
  Search,
  ShieldCheck,
  Smartphone,
  Wheat,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";

import "./Farmers.css";

function Farmers({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [search, setSearch] = useState("");

  const farmers = [
    {
      code: "KC10245",
      name: "Ramesh Patel",
      mobile: "XXXXXX7314",
      village: "Khajuri",
      crop: "Wheat",
      quantity: "25 Qtl",
      status: "Verified",
    },
    {
      code: "KC10418",
      name: "Suresh Verma",
      mobile: "XXXXXX2841",
      village: "Bilkisganj",
      crop: "Wheat",
      quantity: "18 Qtl",
      status: "Verified",
    },
    {
      code: "KC10632",
      name: "Mohan Singh",
      mobile: "XXXXXX6158",
      village: "Ashta",
      crop: "Soybean",
      quantity: "20 Qtl",
      status: "Verified",
    },
    {
      code: "KC10871",
      name: "Rajesh Yadav",
      mobile: "XXXXXX9426",
      village: "Sehore",
      crop: "Wheat",
      quantity: "30 Qtl",
      status: "Pending",
    },
    {
      code: "KC10954",
      name: "Dinesh Kushwah",
      mobile: "XXXXXX3782",
      village: "Doraha",
      crop: "Wheat",
      quantity: "22 Qtl",
      status: "Verified",
    },
  ];

  const filteredFarmers = farmers.filter((farmer) =>
    `${farmer.code} ${farmer.name} ${farmer.village} ${farmer.crop}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className={`farmers-page ${isDark ? "dark-mode" : ""}`}>
      <header className="farmers-header">
        <button
          type="button"
          className="farmers-back"
          onClick={onBack}
          aria-label={isHindi ? "वापस जाएँ" : "Go back"}
        >
          <ArrowLeft size={19} />
        </button>

        <div className="farmers-brand">
          <div className="farmers-brand-icon">
            <Wheat size={20} />
          </div>
          <div>
            <strong>FarmBuddy</strong>
            <span>
              {isHindi ? "ऑपरेटर / यूज़र" : "Operator / User"}
            </span>
          </div>
        </div>

        <div className="farmers-centre">
          <strong>
            {isHindi
              ? "सीहोर प्रोक्योरमेंट केंद्र"
              : "Sehore Procurement Centre"}
          </strong>
          <span>Centre ID: PC1025</span>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="farmers-content">
        <div className="farmers-page-heading">
          <div>
            <p>
              {isHindi ? "केंद्र प्रबंधन" : "Centre Management"}
            </p>
            <h1>{isHindi ? "किसान" : "Farmers"}</h1>
            <span>
              {isHindi
                ? "अपने केंद्र से जुड़े किसानों की सूची"
                : "Farmers registered with your procurement centre"}
            </span>
          </div>

          <div className="farmers-summary">
            <UsersIcon />
            <strong>{farmers.length}</strong>
            <span>{isHindi ? "किसान" : "Farmers"}</span>
          </div>
        </div>

        <div className="farmers-search">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isHindi
                ? "Kisan Code, नाम, गांव या फसल खोजें..."
                : "Search Kisan Code, name, village or crop..."
            }
          />
        </div>

        <section className="farmers-list-card">
          <div className="farmers-list-heading">
            <div>
              <h2>
                {isHindi ? "किसान सूची" : "Farmer List"}
              </h2>
              <p>
                {isHindi
                  ? "किसान की जानकारी देखने के लिए किसी किसान को चुनें"
                  : "Select a farmer to view their information"}
              </p>
            </div>

            <div className="farmers-count">
              {filteredFarmers.length}{" "}
              {isHindi ? "दिख रहे हैं" : "Showing"}
            </div>
          </div>

          <div className="farmers-table-wrap">
            <table className="farmers-table">
              <thead>
                <tr>
                  <th>{isHindi ? "किसान कोड" : "Kisan Code"}</th>
                  <th>{isHindi ? "किसान का नाम" : "Farmer Name"}</th>
                  <th>{isHindi ? "मोबाइल" : "Mobile"}</th>
                  <th>{isHindi ? "गांव" : "Village"}</th>
                  <th>{isHindi ? "फसल" : "Crop"}</th>
                  <th>{isHindi ? "मात्रा" : "Quantity"}</th>
                  <th>{isHindi ? "स्थिति" : "Status"}</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer.code}>
                    <td>
                      <strong className="farmer-code">
                        {farmer.code}
                      </strong>
                    </td>

                    <td>
                      <div className="farmer-name-cell">
                        <div className="farmer-avatar">
                          {farmer.name.charAt(0)}
                        </div>
                        <strong>{farmer.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="farmer-info">
                        <Smartphone size={13} />
                        {farmer.mobile}
                      </span>
                    </td>

                    <td>
                      <span className="farmer-info">
                        <MapPin size={13} />
                        {farmer.village}
                      </span>
                    </td>

                    <td>{farmer.crop}</td>
                    <td><strong>{farmer.quantity}</strong></td>

                    <td>
                      <span
                        className={`farmer-status farmer-status-${farmer.status.toLowerCase()}`}
                      >
                        <BadgeCheck size={12} />
                        {isHindi
                          ? farmer.status === "Verified"
                            ? "सत्यापित"
                            : "लंबित"
                          : farmer.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="farmer-view-button"
                        title={
                          isHindi
                            ? "किसान विवरण"
                            : "Farmer details"
                        }
                      >
                        <ChevronRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFarmers.length === 0 && (
              <div className="farmers-empty">
                <Search size={25} />
                <strong>
                  {isHindi
                    ? "कोई किसान नहीं मिला"
                    : "No farmer found"}
                </strong>
                <span>
                  {isHindi
                    ? "दूसरा Kisan Code या नाम खोजें।"
                    : "Try another Kisan Code or farmer name."}
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="farmers-info-note">
          <ShieldCheck size={17} />
          <div>
            <strong>
              {isHindi
                ? "Kisan Code आधारित रिकॉर्ड"
                : "Kisan Code based records"}
            </strong>
            <span>
              {isHindi
                ? "यहाँ नया किसान registration नहीं होगा। मौजूदा Kisan Code वाले किसानों की जानकारी दिखाई जाएगी।"
                : "New farmer registration is not done here. This section shows existing farmers with a valid Kisan Code."}
            </span>
          </div>
        </div>

        <div className="farmers-footer-note">
          <CalendarDays size={15} />
          <span>
            {isHindi
              ? "किसान की booking और procurement history अगले module में जोड़ी जाएगी।"
              : "Booking and procurement history will be available in the next module."}
          </span>
        </div>
      </section>
    </main>
  );
}

function UsersIcon() {
  return (
    <span className="farmers-summary-icon">
      <Wheat size={17} />
    </span>
  );
}

export default Farmers;
