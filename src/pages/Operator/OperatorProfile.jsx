import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { 
  Building2, 
  UserCircle2, 
  MapPin, 
  ShieldCheck, 
  Globe2, 
  Moon, 
  Sun, 
  Phone 
} from "lucide-react";

import "./OperatorProfile.css";

function OperatorProfile({ onBack, onLogout }) {
  const { language, changeLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const isHindi = language === "hi";

  return (
    <main className={`operator-profile-page ${isDark ? "dark-mode" : ""}`}>
      <header className="operator-profile-header">
        <button
          type="button"
          className="operator-profile-back"
          onClick={onBack}
          aria-label={isHindi ? "वापस जाएँ" : "Go back"}
        >
          <span className="operator-profile-back-arrow">←</span>
        </button>

        <div className="operator-profile-brand">
          <Building2 size={21} />
          <div>
            <strong><b>Farm</b>Buddy</strong>
            <span>{isHindi ? "प्रोक्योरमेंट सेंटर" : "Procurement Centre"}</span>
          </div>
        </div>

      </header>

      <section className="operator-profile-content">
        <div className="operator-profile-heading">
          <div className="operator-profile-avatar">
            <UserCircle2 size={42} />
          </div>
          <div>
            <p>{isHindi ? "ऑपरेटर प्रोफाइल" : "OPERATOR PROFILE"}</p>
            <h1>{isHindi ? "प्रोफाइल और सेटिंग्स" : "Profile & Settings"}</h1>
            <span>
              {isHindi
                ? "अपने केंद्र और ऑपरेटर की जानकारी देखें"
                : "View your operator and centre information"}
            </span>
          </div>
        </div>

        <div className="operator-profile-card">
          <div className="operator-profile-card-title">
            <UserCircle2 size={18} />
            <div>
              <h2>{isHindi ? "ऑपरेटर जानकारी" : "Operator Information"}</h2>
              <p>{isHindi ? "आपके खाते की जानकारी" : "Your account details"}</p>
            </div>
          </div>

          <div className="operator-profile-grid">
            <div className="operator-profile-field">
              <span>{isHindi ? "ऑपरेटर का नाम" : "Operator Name"}</span>
              <strong>Nitin Dangi</strong>
            </div>

            <div className="operator-profile-field">
              <span>{isHindi ? "मोबाइल नंबर" : "Mobile Number"}</span>
              <strong>+91 98XXXXXX25</strong>
            </div>

            <div className="operator-profile-field">
              <span>{isHindi ? "प्रोक्योरमेंट सेंटर" : "Procurement Centre"}</span>
              <strong>Sehore Procurement Centre</strong>
            </div>

            <div className="operator-profile-field">
              <span>{isHindi ? "सेंटर ID" : "Centre ID"}</span>
              <strong>PC-IND-1025</strong>
            </div>
          </div>
        </div>

        <div className="operator-profile-card">
          <div className="operator-profile-card-title">
            <MapPin size={18} />
            <div>
              <h2>{isHindi ? "केंद्र का पता" : "Centre Address"}</h2>
              <p>{isHindi ? "पंजीकृत केंद्र स्थान" : "Registered centre location"}</p>
            </div>
          </div>

          <div className="operator-profile-address">
            <MapPin size={18} />
            <span>Indore, Madhya Pradesh, India</span>
          </div>
        </div>

        <div className="operator-profile-card">
          <div className="operator-profile-card-title">
            <ShieldCheck size={18} />
            <div>
              <h2>{isHindi ? "प्राथमिकताएँ" : "Preferences"}</h2>
              <p>{isHindi ? "ऐप की सामान्य सेटिंग्स" : "General app settings"}</p>
            </div>
          </div>

          <div className="operator-profile-preferences">
            <button
              type="button"
              className="operator-profile-preference operator-profile-language-button"
              onClick={() => {
                changeLanguage(isHindi ? "en" : "hi");
              }}
              aria-label={isHindi ? "भाषा बदलें" : "Change language"}
            >
              <div className="operator-profile-preference-icon">
                <Globe2 size={17} />
              </div>
              <div>
                <strong>{isHindi ? "भाषा" : "Language"}</strong>
                <span>{isHindi ? "हिंदी" : "English"}</span>
              </div>
              <span className="operator-profile-language-toggle">
                {isHindi ? "EN" : "HI"}
              </span>
            </button>

            <div className="operator-profile-preference operator-profile-theme-row">
              <div className="operator-profile-preference-icon">
                <Moon size={17} />
              </div>

              <div className="operator-profile-preference-text">
                <strong>{isHindi ? "थीम" : "Theme"}</strong>
                <span>{isDark ? "Dark" : "Light"}</span>
              </div>

              <button
                type="button"
                className={`operator-profile-theme-switch ${isDark ? "is-dark" : ""}`}
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={isDark}
              >
                <span className="operator-profile-theme-sun">
                  <Sun size={14} />
                </span>
                <span className="operator-profile-theme-moon">
                  <Moon size={14} />
                </span>
                <span className="operator-profile-theme-thumb" />
              </button>
            </div>

            <div className="operator-profile-preference">
              <div className="operator-profile-preference-icon">
                <Phone size={17} />
              </div>
              <div>
                <strong>{isHindi ? "सहायता" : "Support"}</strong>
                <span>{isHindi ? "केंद्र सहायता टीम" : "Centre support team"}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="operator-profile-logout"
          onClick={onLogout}
        >
          {isHindi ? "लॉगआउट" : "Logout"}
        </button>
      </section>
    </main>
  );
}

export default OperatorProfile;