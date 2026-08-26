import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  CreditCard,
  FileCheck2,
  Home,
  Languages,
  LogOut,
  MapPin,
  Phone,
  ShieldCheck,
  UserCircle,
  Wheat,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./Profile.css";

function Profile({ onBack, onLogout }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();

  return (
    <main className={`profile-page ${isDark ? "dark-mode" : ""}`}>
      <header className="profile-header">
        <button
          type="button"
          className="profile-back"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{t.profileTitle}</h1>
          <p>{t.profileSubtitle}</p>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      <section className="profile-content">

        {/* Profile Identity */}
        <div className="profile-identity-card">
          <div className="profile-photo">
            <UserCircle size={76} />
          </div>

          <div className="profile-identity">
            <h2>Ramesh Patel</h2>
            <p>Farmer ID: FA-2026-004821</p>

            <div className="verified-badge">
              <BadgeCheck size={15} />
              {t.verifiedFarmer}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <section className="profile-card">
          <div className="profile-section-title">
            <UserCircle size={19} />
            <h3>{t.personalDetails}</h3>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>{t.fullName}</span>
              <strong>Ramesh Patel</strong>
            </div>

            <div className="profile-field">
              <span>{t.mobileNumber}</span>
              <strong>XXXXXX7314</strong>
            </div>

            <div className="profile-field">
              <span>{t.farmerIdKisanCode}</span>
              <strong>FA-2026-004821</strong>
            </div>
          </div>
        </section>

        {/* Full Address */}
        <section className="profile-card">
          <div className="profile-section-title">
            <MapPin size={19} />
            <h3>{t.fullAddress}</h3>
          </div>

          <div className="profile-address">
            <strong>
              Khajuri, Post Khajuri, Tehsil Sehore,
              District Sehore, Madhya Pradesh - 466001
            </strong>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>{t.village}</span>
              <strong>Khajuri</strong>
            </div>

            <div className="profile-field">
              <span>{t.post}</span>
              <strong>Khajuri</strong>
            </div>

            <div className="profile-field">
              <span>{t.tehsilBlock}</span>
              <strong>Sehore</strong>
            </div>

            <div className="profile-field">
              <span>{t.district}</span>
              <strong>Sehore</strong>
            </div>

            <div className="profile-field">
              <span>{t.state}</span>
              <strong>Madhya Pradesh</strong>
            </div>

            <div className="profile-field">
              <span>{t.pinCode}</span>
              <strong>466001</strong>
            </div>
          </div>
        </section>

        {/* Farm Details */}
        <section className="profile-card">
          <div className="profile-section-title">
            <Wheat size={19} />
            <h3>{t.farmDetails}</h3>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>{t.landArea}</span>
              <strong>5.5 Acre</strong>
            </div>

            <div className="profile-field">
              <span>{t.landUnit}</span>
              <strong>Acre</strong>
            </div>

            <div className="profile-field">
              <span>{t.mainCrop}</span>
              <strong>Wheat</strong>
            </div>
          </div>
        </section>

        {/* Bank Details */}
        <section className="profile-card">
          <div className="profile-section-title">
            <CreditCard size={19} />
            <h3>{t.bankDetails}</h3>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>{t.accountHolderName}</span>
              <strong>Ramesh Patel</strong>
            </div>

            <div className="profile-field">
              <span>{t.bankName}</span>
              <strong>State Bank of India</strong>
            </div>

            <div className="profile-field">
              <span>{t.accountNumber}</span>
              <strong>XXXX XXXX 4582</strong>
            </div>

            <div className="profile-field">
              <span>{t.ifscCode}</span>
              <strong>SBINXXXX123</strong>
            </div>
          </div>

          <div className="verification-line verified">
            <ShieldCheck size={17} />
            {t.bankVerified}
          </div>
        </section>

        {/* Verification */}
        <section className="profile-card">
          <div className="profile-section-title">
            <FileCheck2 size={19} />
            <h3>{t.verification}</h3>
          </div>

          <div className="verification-list">
            <div className="verification-row">
              <div>
                <ShieldCheck size={18} />
                <span>{t.aadhaar}</span>
              </div>
              <strong>{`XXXX XXXX 6214 · ${t.verified}`}</strong>
            </div>

            <div className="verification-row">
              <div>
                <FileCheck2 size={18} />
                <span>{t.landRecord}</span>
              </div>
              <strong>{t.submittedVerified}</strong>
            </div>

            <div className="verification-row">
              <div>
                <BadgeCheck size={18} />
                <span>{t.farmerRegistration}</span>
              </div>
              <strong>Active</strong>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="profile-card">
          <div className="profile-section-title">
            <CalendarDays size={19} />
            <h3>{t.accountInformation}</h3>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <span>{t.registrationDate}</span>
              <strong>12 June 2026</strong>
            </div>

            <div className="profile-field">
              <span>{t.accountStatus}</span>
              <strong className="status-active">{t.active}</strong>
            </div>
          </div>
        </section>

        {/* Help & Support */}
        <section className="profile-card profile-help-card">
          <div className="profile-section-title">
            <Phone size={19} />
            <h3>{language === "hi" ? "सहायता और समर्थन" : "Help & Support"}</h3>
          </div>

          <div className="profile-help-list">
            <button type="button" className="profile-help-item">
              <div className="profile-help-icon">?</div>
              <div>
                <strong>
                  {language === "hi"
                    ? "अक्सर पूछे जाने वाले प्रश्न"
                    : "Frequently Asked Questions"}
                </strong>
                <span>
                  {language === "hi"
                    ? "सामान्य सवालों के जवाब देखें"
                    : "Find answers to common questions"}
                </span>
              </div>
              <span className="profile-help-arrow">→</span>
            </button>

            <button
              type="button"
              className="profile-help-item"
              onClick={() =>
                window.alert(
                  language === "hi"
                    ? "किसान हेल्पलाइन: 1800-123-4567"
                    : "Farmer Helpline: 1800-123-4567"
                )
              }
            >
              <div className="profile-help-icon">
                <Phone size={17} />
              </div>
              <div>
                <strong>
                  {language === "hi" ? "किसान हेल्पलाइन" : "Farmer Helpline"}
                </strong>
                <span>1800-123-4567</span>
              </div>
              <span className="profile-help-arrow">→</span>
            </button>

            <button type="button" className="profile-help-item">
              <div className="profile-help-icon">!</div>
              <div>
                <strong>
                  {language === "hi" ? "शिकायत दर्ज करें" : "Raise a Complaint"}
                </strong>
                <span>
                  {language === "hi"
                    ? "अपनी समस्या या शिकायत भेजें"
                    : "Send your issue or complaint"}
                </span>
              </div>
              <span className="profile-help-arrow">→</span>
            </button>

            <button type="button" className="profile-help-item">
              <div className="profile-help-icon">
                <MapPin size={17} />
              </div>
              <div>
                <strong>
                  {language === "hi"
                    ? "प्रोक्योरमेंट केंद्र संपर्क"
                    : "Procurement Centre Contact"}
                </strong>
                <span>
                  {language === "hi"
                    ? "अपने केंद्र की संपर्क जानकारी देखें"
                    : "View contact information for your centre"}
                </span>
              </div>
              <span className="profile-help-arrow">→</span>
            </button>
          </div>
        </section>

        <div className="profile-actions">
          <div className="profile-language-control">
            <Languages size={18} />

            <span className="profile-language-label">
              {language === "hi" ? "भाषा" : "Language"}
            </span>

            <div
              className="profile-language-switch"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                className={`profile-language-option ${
                  language === "en" ? "active" : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>

              <button
                type="button"
                className={`profile-language-option ${
                  language === "hi" ? "active" : ""
                }`}
                onClick={() => changeLanguage("hi")}
              >
                हिं
              </button>
            </div>
          </div>

          <button
            type="button"
            className="profile-logout"
            onClick={onLogout}
          >
            <LogOut size={18} />
            {t.logout}
          </button>
        </div>

      </section>
    </main>
  );
}

export default Profile;
