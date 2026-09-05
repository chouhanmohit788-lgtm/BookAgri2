import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import {
  ArrowRight,
  Leaf,
  Phone,
  ShieldCheck,
  Sprout,
  UserRound,
} from "lucide-react";

import "./FarmerLogin.css";

function FarmerLogin({
  onLoginSuccess,
}) {
  const { isDark, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
  const [farmerId, setFarmerId] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const mpDistricts = [
    { en: "Agar Malwa", hi: "आगर मालवा" },
    { en: "Alirajpur", hi: "अलीराजपुर" },
    { en: "Anuppur", hi: "अनूपपुर" },
    { en: "Ashoknagar", hi: "अशोकनगर" },
    { en: "Balaghat", hi: "बालाघाट" },
    { en: "Barwani", hi: "बड़वानी" },
    { en: "Betul", hi: "बैतूल" },
    { en: "Bhind", hi: "भिंड" },
    { en: "Bhopal", hi: "भोपाल" },
    { en: "Burhanpur", hi: "बुरहानपुर" },
    { en: "Chhatarpur", hi: "छतरपुर" },
    { en: "Chhindwara", hi: "छिंदवाड़ा" },
    { en: "Damoh", hi: "दमोह" },
    { en: "Datia", hi: "दतिया" },
    { en: "Dewas", hi: "देवास" },
    { en: "Dhar", hi: "धार" },
    { en: "Dindori", hi: "डिंडौरी" },
    { en: "Guna", hi: "गुना" },
    { en: "Gwalior", hi: "ग्वालियर" },
    { en: "Harda", hi: "हरदा" },
    { en: "Narmadapuram", hi: "नर्मदापुरम" },
    { en: "Indore", hi: "इंदौर" },
    { en: "Jabalpur", hi: "जबलपुर" },
    { en: "Jhabua", hi: "झाबुआ" },
    { en: "Katni", hi: "कटनी" },
    { en: "Khandwa", hi: "खंडवा" },
    { en: "Khargone", hi: "खरगोन" },
    { en: "Maihar", hi: "मैहर" },
    { en: "Mandla", hi: "मंडला" },
    { en: "Mandsaur", hi: "मंदसौर" },
    { en: "Mauganj", hi: "मऊगंज" },
    { en: "Morena", hi: "मुरैना" },
    { en: "Narsinghpur", hi: "नरसिंहपुर" },
    { en: "Neemuch", hi: "नीमच" },
    { en: "Niwari", hi: "निवाड़ी" },
    { en: "Pandhurna", hi: "पांढुर्णा" },
    { en: "Panna", hi: "पन्ना" },
    { en: "Raisen", hi: "रायसेन" },
    { en: "Rajgarh", hi: "राजगढ़" },
    { en: "Ratlam", hi: "रतलाम" },
    { en: "Rewa", hi: "रीवा" },
    { en: "Sagar", hi: "सागर" },
    { en: "Satna", hi: "सतना" },
    { en: "Sehore", hi: "सीहोर" },
    { en: "Seoni", hi: "सिवनी" },
    { en: "Shahdol", hi: "शहडोल" },
    { en: "Shajapur", hi: "शाजापुर" },
    { en: "Sheopur", hi: "श्योपुर" },
    { en: "Shivpuri", hi: "शिवपुरी" },
    { en: "Sidhi", hi: "सीधी" },
    { en: "Singrauli", hi: "सिंगरौली" },
    { en: "Tikamgarh", hi: "टीकमगढ़" },
    { en: "Ujjain", hi: "उज्जैन" },
    { en: "Umaria", hi: "उमरिया" },
    { en: "Vidisha", hi: "विदिशा" },
  ];

  const handleLogin = (event) => {
    event.preventDefault();

    if (!farmerId || !mobile || !district) {
      alert(
        language === "hi"
          ? "किसान कोड, मोबाइल नंबर और जिला आवश्यक हैं।"
          : "Farmer ID, mobile number and district are required."
      );
      return;
    }

    if (mobile.length !== 10) {
      alert(
        language === "hi"
          ? "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setOtp("");
    setOtpError("");
    setOtpSent(true);

    alert(
      language === "hi"
        ? "OTP भेज दिया गया है। डेमो OTP: 123456"
        : "OTP sent. Demo OTP: 123456"
    );
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setOtpError(
        language === "hi"
          ? "कृपया 6 अंकों का OTP दर्ज करें।"
          : "Please enter the 6-digit OTP."
      );
      return;
    }

    if (otp !== "123456") {
      setOtpError(
        language === "hi"
          ? "गलत OTP। डेमो के लिए 123456 दर्ज करें।"
          : "Invalid OTP. Use 123456 for demo."
      );
      return;
    }

    setOtpError("");
    onLoginSuccess();
  };

  const handleResendOtp = () => {
    setOtp("");
    setOtpError("");

    alert(
      language === "hi"
        ? "OTP फिर से भेज दिया गया है। डेमो OTP: 123456"
        : "OTP resent. Demo OTP: 123456"
    );
  };


  const handleFillDemoDetails = () => {
    setFarmerId("FA-2026-004821");
    setDistrict("Bhopal");
    setMobile("9000000001");
    setOtpSent(false);
    setOtp("");
    setOtpError("");
  };


  return (
    <main className={`farmer-login-page ${isDark ? "dark-mode" : ""}`}>

      {/* Background */}
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <Leaf className="login-leaf login-leaf-one" />
      <Leaf className="login-leaf login-leaf-two" />


      {/* Header */}
      <header className="login-header">

        <div className="login-brand">

          <div className="login-brand-icon">
            <Sprout size={22} />
          </div>
          

          <div>
            <h1 className="brand-name">
  <span style={{ color: "#07552f" }}>Farm</span>
  <span style={{ color: "#45c35b" }}>Buddy</span>
</h1>

            <p>{t.farmer} {language === "hi" ? "पोर्टल" : "Portal"}</p>
          </div>

        </div>
        <ThemeButton
  isDark={isDark}
  onToggle={toggleTheme}
/>

      </header>


      {/* Main */}
      <section className="farmer-login-content">

        {/* Logo */}
        <div className="login-logo-wrapper">

          <div className="login-logo-ring">

            <div className="login-logo">
              <img
                src="/farmbuddy-logo.png"
                alt="FarmBuddy"
                className="login-logo-image"
              />
            </div>

          </div>

        </div>


        {/* Heading */}
        <div className="login-heading">

          <div className="login-title-row">

            <Leaf size={17} fill="currentColor" />

            <h2>{t.farmerLogin}</h2>

            <Leaf
              size={17}
              fill="currentColor"
              className="login-title-leaf-right"
            />

          </div>

          <p>
            {t.welcomeFarmer}! {t.loginContinue}
          </p>

        </div>


        {/* Login / OTP Card */}
        {!otpSent ? (
          <div className="login-card">
            <form
              className="login-form"
              onSubmit={handleLogin}
            >
              {/* Farmer ID */}
              <div className="login-field">
                <label>
                  {t.kisanCode} <span>*</span>
                </label>

                <div className="login-input">
                  <UserRound size={18} />

                  <input
                    type="text"
                    placeholder={t.enterKisanCode}
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                  />
                </div>
              </div>

              {/* District */}
              <div className="login-field">
                <label>
                  {language === "hi" ? "जिला" : "District"} <span>*</span>
                </label>

                <div className="login-input">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">
                      {language === "hi"
                        ? "अपना जिला चुनें"
                        : "Select your district"}
                    </option>

                    {mpDistricts.map((item) => (
                      <option key={item.en} value={item.en}>
                        {language === "hi" ? item.hi : item.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile */}
              <div className="login-field">
                <label>
                  {t.mobileNumber} <span>*</span>
                </label>

                <div className="login-input">
                  <div className="login-country-code">
                    +91
                  </div>

                  <Phone size={18} />

                  <input
                    type="tel"
                    placeholder={t.enterMobile}
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </div>



              <button
                type="button"
                className="farmer-demo-fill-button"
                onClick={handleFillDemoDetails}
              >
                {language === "hi" ? "Demo Details भरें" : "Fill Demo Details"}
              </button>

              <div className="otp-info">
                <ShieldCheck size={18} />

                <span>
                  {t.otpInfo}
                </span>
              </div>

              <button
                type="submit"
                className="farmer-login-button"
              >
                <span>{t.sendOtp}</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        ) : (
          <div className="login-card">
            <form
              className="login-form"
              onSubmit={handleVerifyOtp}
            >
              <div className="login-heading">
                <h3>
                  {language === "hi" ? "OTP सत्यापित करें" : "Verify OTP"}
                </h3>

                <p>
                  {language === "hi"
                    ? `+91 ${mobile} पर OTP भेजा गया है`
                    : `OTP sent to +91 ${mobile}`}
                </p>
              </div>

              <div className="login-field">
                <label>
                  {language === "hi"
                    ? "6 अंकों का OTP दर्ज करें"
                    : "Enter 6-Digit OTP"}{" "}
                  <span>*</span>
                </label>

                <div className="login-input">
                  <ShieldCheck size={18} />

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    maxLength={6}
                    placeholder={
                      language === "hi"
                        ? "OTP दर्ज करें"
                        : "Enter OTP"
                    }
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ""));
                      setOtpError("");
                    }}
                  />
                </div>

                {otpError && (
                  <span className="otp-error">
                    {otpError}
                  </span>
                )}
              </div>

              <div className="otp-info">
                <ShieldCheck size={18} />

                <span>
                  {language === "hi"
                    ? "डेमो OTP: 123456"
                    : "Demo OTP: 123456"}
                </span>
              </div>

              <button
                type="submit"
                className="farmer-login-button"
              >
                <span>
                  {language === "hi"
                    ? "OTP सत्यापित करें"
                    : "Verify OTP"}
                </span>

                <ArrowRight size={20} />
              </button>
</form>
          </div>
        )}

        {/* Security */}
        <div className="login-security">

          <ShieldCheck size={16} />

          <span>
            {t.secure}
          </span>

        </div>


        {/* Tagline */}
        <div className="login-tagline">

          <Leaf size={14} fill="currentColor" />

          <span>
            {t.tagline}
          </span>

        </div>

      </section>

    </main>
  );
}

export default FarmerLogin