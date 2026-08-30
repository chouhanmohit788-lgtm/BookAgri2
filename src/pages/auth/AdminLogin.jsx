import React from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import "./AdminLogin.css";

function AdminLogin({ onBack, onLogin }) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const isHindi = language === "hi";

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [captchaText, setCaptchaText] = React.useState("F7K9P");
  const [otp, setOtp] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  // Prototype demo credentials — all visible on the same login page.
  const DEMO_USER_ID = "ADMIN-DEMO-001";
  const DEMO_PASSWORD = "Admin@123";
  const DEMO_OTP = "123456";

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let value = "";

    for (let i = 0; i < 5; i += 1) {
      value += chars[Math.floor(Math.random() * chars.length)];
    }

    setCaptchaText(value);
    setCaptcha("");
  };

  const fillDemo = () => {
    setUserId(DEMO_USER_ID);
    setPassword(DEMO_PASSWORD);
    setDistrict("Sehore");
    setCaptcha(captchaText);
    setOtp(DEMO_OTP);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password || !district || !captcha.trim() || !otp.trim()) {
      setError(
        isHindi
          ? "कृपया सभी जानकारी भरें।"
          : "Please fill in all required fields."
      );
      return;
    }

    if (captcha.trim().toUpperCase() !== captchaText) {
      setError(
        isHindi
          ? "CAPTCHA सही नहीं है।"
          : "Invalid CAPTCHA. Please try again."
      );
      refreshCaptcha();
      return;
    }

    if (otp.length !== 6) {
      setError(
        isHindi
          ? "6 अंकों का OTP दर्ज करें।"
          : "Please enter the 6-digit OTP."
      );
      return;
    }

    if (otp !== DEMO_OTP) {
      setError(
        isHindi
          ? "Demo OTP सही नहीं है।"
          : "Invalid demo OTP."
      );
      return;
    }

    if (onLogin) {
      onLogin({
        userId,
        district,
        verified: true,
        otpVerified: true,
      });
    }
  };

  return (
    <main className={`admin-login-page ${isDark ? "dark-mode" : ""}`}>
      {/* Farmer-style background effects — visual only */}
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />
      <Leaf className="login-leaf login-leaf-one" />
      <Leaf className="login-leaf login-leaf-two" />

      <header className="admin-login-topbar">
        <button
          type="button"
          className="admin-back-button"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="admin-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={19} />
          </div>

          <div>
            <strong>
              <span>Farm</span>
              <b>Buddy</b>
            </strong>
            <small>
              {isHindi
                ? "सरकारी प्रशासन पोर्टल"
                : "Government Administration Portal"}
            </small>
          </div>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="admin-login-content">
        <div className="admin-security-badge">
          <ShieldCheck size={17} />
          <span>
            {isHindi
              ? "सुरक्षित सरकारी एक्सेस"
              : "Secure Government Access"}
          </span>
        </div>

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

        <div className="admin-login-heading">
          <div className="login-title-row">
            <Leaf size={17} fill="currentColor" />
            <h1>
              {isHindi
                ? "सरकारी एडमिन लॉगिन"
                : "Government Admin Login"}
            </h1>
            <Leaf
              size={17}
              fill="currentColor"
              className="login-title-leaf-right"
            />
          </div>

          <p>ADMIN LOGIN</p>

          <span>
            {isHindi
              ? "केवल अधिकृत सरकारी अधिकारियों के लिए"
              : "For authorized government officials only"}
          </span>
        </div>

        <div className="admin-login-card">
          {/* Demo details — kept on the SAME login page */}
          <div className="admin-demo-box">
            <div className="admin-demo-title">
              <span>🧪 Demo Login Details</span>
              <small>Prototype only</small>
            </div>

            <div className="admin-demo-grid">
              <div>
                <label>Demo Admin ID</label>
                <code>{DEMO_USER_ID}</code>
              </div>

              <div>
                <label>Demo Password</label>
                <code>{DEMO_PASSWORD}</code>
              </div>

              <div>
                <label>Demo OTP</label>
                <code>{DEMO_OTP}</code>
              </div>
            </div>

            <button
              type="button"
              className="admin-demo-fill"
              onClick={fillDemo}
            >
              Fill Demo Credentials
            </button>
          </div>

          <div className="admin-login-warning">
            <strong>
              ⚠️{" "}
              {isHindi
                ? "केवल सरकारी अधिकारियों के लिए"
                : "Government Officials Only"}
            </strong>

            <span>
              {isHindi
                ? "इस पोर्टल का उपयोग केवल अधिकृत अधिकारी ही कर सकते हैं।"
                : "Only authorized government officials can access this portal."}
            </span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="admin-field">
              <label>Admin User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={
                  isHindi
                    ? "अपना Admin ID दर्ज करें"
                    : "Enter your Admin ID"
                }
                autoComplete="username"
              />
            </div>

            <div className="admin-field">
              <label>
                {isHindi ? "पासवर्ड" : "Password"}
              </label>

              <div className="admin-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isHindi
                      ? "अपना पासवर्ड दर्ज करें"
                      : "Enter your password"
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="password-toggle"
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              <small className="password-hint">
                {isHindi
                  ? "कम से कम 8 अक्षर, uppercase, lowercase, number और special character"
                  : "Minimum 8 characters with uppercase, lowercase, number & special character"}
              </small>
            </div>

            <div className="admin-field">
              <label>
                {isHindi ? "जिला" : "District"}
              </label>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">
                  {isHindi
                    ? "अपना जिला चुनें"
                    : "Select your district"}
                </option>
                <option value="Bhopal">Bhopal</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Sagar">Sagar</option>
                <option value="Sehore">Sehore</option>
              </select>
            </div>

            <div className="admin-field">
              <label>CAPTCHA</label>

              <div className="captcha-row">
                <div className="captcha-box">{captchaText}</div>

                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={refreshCaptcha}
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw size={17} />
                </button>

                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  placeholder="Enter CAPTCHA"
                />
              </div>
            </div>

            {/* OTP is now directly on the login page */}
            <div className="admin-field">
              <label>
                {isHindi ? "6 Digit OTP" : "6 Digit OTP"}
              </label>

              <input
                className="otp-input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="••••••"
              />

              <small className="password-hint">
                {isHindi
                  ? "Demo OTP ऊपर दिया गया है"
                  : "Demo OTP is shown above"}
              </small>
            </div>

            {error && <div className="admin-error">{error}</div>}

            <button type="submit" className="admin-login-button">
              <ShieldCheck size={18} />
              {isHindi ? "सुरक्षित लॉगिन" : "Secure Login"}
            </button>
          </form>

          <div className="admin-security-info">
            <div>
              <LockKeyhole size={14} />
              <span>
                {isHindi
                  ? "Password + OTP verification"
                  : "Password + OTP verification"}
              </span>
            </div>

            <div>
              <span>
                {isHindi
                  ? "सुरक्षित सरकारी एक्सेस"
                  : "Secure government access"}
              </span>
            </div>
          </div>
        </div>

        <div className="admin-footer-security">
          <LockKeyhole size={14} />
          <span>
            {isHindi
              ? "Secure session • Encrypted communication • Authorized access only"
              : "Secure session • Encrypted communication • Authorized access only"}
          </span>
        </div>
      </section>
    </main>
  );
}

export default AdminLogin;
