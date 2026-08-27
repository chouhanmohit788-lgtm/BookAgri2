import { useState } from "react";

import {
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";

import "./operatorLogin.css";

function ProcurementCentreLogin({ onBack, onLoginSuccess }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [centreId, setCentreId] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [captcha, setCaptcha] = useState("7K4P2");
  const [error, setError] = useState("");
  const [showOtpDemo, setShowOtpDemo] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const demoPassword = "PC@12345";
  const demoOtp = "482916";

  const districts = [
    "Sehore",
    "Bhopal",
    "Raisen",
    "Vidisha",
    "Indore",
    "Ujjain",
  ];

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let nextCaptcha = "";

    for (let i = 0; i < 5; i += 1) {
      nextCaptcha += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptcha(nextCaptcha);
    setCaptchaInput("");
  };

  const handleSendOtp = () => {
    if (!centreId.trim() || !district) {
      setError(
        isHindi
          ? "कृपया केंद्र कोड और जिला चुनें।"
          : "Please enter Centre ID and select district."
      );
      return;
    }

    setError("");
    setOtpSent(true);
    setShowOtpDemo(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!centreId.trim() || !district || !password.trim()) {
      setError(
        isHindi
          ? "कृपया सभी आवश्यक जानकारी भरें।"
          : "Please fill all required details."
      );
      return;
    }

    if (!otpSent) {
      setError(
        isHindi
          ? "पहले OTP भेजें और सत्यापन करें।"
          : "Please send and verify OTP first."
      );
      return;
    }

    if (otp.length !== 6) {
      setError(
        isHindi
          ? "कृपया 6 अंकों का OTP दर्ज करें।"
          : "Please enter a 6-digit OTP."
      );
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captcha) {
      setError(
        isHindi
          ? "कैप्चा सही नहीं है।"
          : "Incorrect captcha."
      );
      return;
    }

    // Prototype login: real authentication will be handled by backend later.
    setLoginSuccess(true);

    setTimeout(() => {
      onLoginSuccess();
    }, 1200);
  };

  return (
    <main className={`proc-login-page ${isDark ? "dark-mode" : ""}`}>
      <header className="proc-login-header">
        <button
          type="button"
          className="proc-back-button"
          onClick={onBack}
          aria-label={isHindi ? "वापस जाएँ" : "Go back"}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="proc-brand">
          <Building2 size={21} />
          <span>
            <b>Farm</b>Buddy
          </span>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      <section className="proc-login-content">
        <div className="proc-login-card">
          <div className="proc-login-icon">
            <Building2 size={38} />
          </div>

          <div className="proc-login-heading">
            <h1>
              {isHindi
                ? "ऑपरेटर / यूज़र लॉगिन"
                : "Operator / User Login"}
            </h1>

            <p>
              {isHindi
                ? "अपने ऑपरेटर / यूज़र खाते में सुरक्षित रूप से लॉगिन करें"
                : "Securely login to your operator / user account"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="proc-login-form">
            <div className="proc-field">
              <label>
                {isHindi
                  ? "प्रोक्योरमेंट केंद्र कोड / केंद्र ID"
                  : "Procurement Centre Code / Centre ID"}
                <span>*</span>
              </label>

              <div className="proc-input-wrap">
                <Building2 size={18} />
                <input
                  type="text"
                  value={centreId}
                  onChange={(e) => setCentreId(e.target.value)}
                  placeholder={isHindi ? "उदा. PC1025" : "e.g. PC1025"}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="proc-field">
              <label>
                {isHindi ? "जिला" : "District"}
                <span>*</span>
              </label>

              <div className="proc-input-wrap">
                <MapPin size={18} />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">
                    {isHindi ? "जिला चुनें" : "Select District"}
                  </option>

                  {districts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="proc-field">
              <label>
                {isHindi ? "पासवर्ड" : "Password"}
                <span>*</span>
              </label>

              <div className="proc-input-wrap">
                <LockKeyhole size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isHindi ? "पासवर्ड दर्ज करें" : "Enter password"
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="proc-eye-button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="proc-demo-hint">
                {isHindi
                  ? `डेमो पासवर्ड: ${demoPassword}`
                  : `Demo password: ${demoPassword}`}
              </p>
            </div>

            <div className="proc-otp-box">
              <div className="proc-otp-title">
                <div>
                  <Smartphone size={18} />
                  <strong>
                    {isHindi ? "OTP सत्यापन" : "OTP Verification"}
                  </strong>
                </div>

                <span>
                  {isHindi
                    ? "पंजीकृत मोबाइल पर OTP"
                    : "OTP on registered mobile"}
                </span>
              </div>

              <div className="proc-otp-row">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder={isHindi ? "6 अंकों का OTP" : "6-digit OTP"}
                />

                <button
                  type="button"
                  className="proc-otp-button"
                  onClick={handleSendOtp}
                >
                  {otpSent
                    ? isHindi
                      ? "OTP फिर भेजें"
                      : "Resend OTP"
                    : isHindi
                    ? "OTP भेजें"
                    : "Send OTP"}
                </button>
              </div>

              {otpSent && (
                <p className="proc-otp-success">
                  {isHindi
                    ? "OTP पंजीकृत मोबाइल नंबर पर भेजा गया है।"
                    : "OTP has been sent to the registered mobile number."}
                </p>
              )}
            </div>

            <div className="proc-captcha">
              <label>
                {isHindi ? "कैप्चा" : "Captcha"}
                <span>*</span>
              </label>

              <div className="proc-captcha-row">
                <div className="proc-captcha-code">{captcha}</div>

                <button
                  type="button"
                  className="proc-captcha-refresh"
                  onClick={refreshCaptcha}
                  aria-label={
                    isHindi ? "कैप्चा रीफ्रेश करें" : "Refresh captcha"
                  }
                  title={
                    isHindi ? "कैप्चा रीफ्रेश करें" : "Refresh captcha"
                  }
                >
                  ↻
                </button>

                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder={
                    isHindi ? "कैप्चा दर्ज करें" : "Enter captcha"
                  }
                />
              </div>
            </div>

            {error && (
              <div className="proc-login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="proc-login-button"
            >
              <ShieldCheck size={19} />
              {isHindi ? "लॉगिन करें" : "Login"}
            </button>
          </form>

          <div className="proc-security-note">
            <ShieldCheck size={16} />
            <span>
              {isHindi
                ? "आपके केंद्र खाते की जानकारी सुरक्षित है"
                : "Your centre account information is secure"}
            </span>
          </div>
        </div>
      </section>

      {loginSuccess && (
        <div className="proc-login-success-backdrop">
          <div className="proc-login-success-modal" role="status">
            <div className="proc-login-success-icon">
              <ShieldCheck size={28} />
            </div>

            <h3>
              {isHindi ? "लॉगिन सफल!" : "Login Successful!"}
            </h3>

            <p>
              {isHindi
                ? "प्रोक्योरमेंट केंद्र डैशबोर्ड खोला जा रहा है..."
                : "Opening Procurement Centre Dashboard..."}
            </p>
          </div>
        </div>
      )}

      {showOtpDemo && (
        <div className="proc-demo-modal-backdrop">
          <div className="proc-demo-modal" role="dialog" aria-modal="true">
            <div className="proc-demo-modal-icon">
              <Smartphone size={24} />
            </div>

            <h3>
              {isHindi ? "डेमो OTP" : "Demo OTP"}
            </h3>

            <p>
              {isHindi
                ? "प्रोटोटाइप के लिए OTP यहाँ दिखाया गया है।"
                : "For prototype/demo purposes, the OTP is shown here."}
            </p>

            <div className="proc-demo-otp">{demoOtp}</div>

            <div className="proc-demo-password">
              <span>
                {isHindi ? "डेमो पासवर्ड" : "Demo Password"}
              </span>
              <strong>{demoPassword}</strong>
            </div>

            <button
              type="button"
              className="proc-demo-modal-button"
              onClick={() => setShowOtpDemo(false)}
            >
              {isHindi ? "ठीक है" : "Got it"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProcurementCentreLogin;
