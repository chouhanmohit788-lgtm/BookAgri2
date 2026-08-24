import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
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
  onRegister,
  onForgotId,
  onLoginSuccess,
}) {
    const { isDark, toggleTheme } = useTheme();
  const [farmerId, setFarmerId] = useState("");
  const [mobile, setMobile] = useState("");

  const handleLogin = (event) => {
  event.preventDefault();

  if (!farmerId || !mobile) {
    alert("Please enter Farmer ID and Mobile Number.");
    return;
  }

  if (mobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  alert("OTP sent successfully!");

  // Temporary testing:
  // OTP verification ke baad dashboard par jayega
  onLoginSuccess();
};

  const handleRegister = () => {
    console.log("Open Farmer Registration");
  };

  const handleForgotId = () => {
    console.log("Open Forgot Farmer ID");
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
            <h1>
              Book<span>Agri</span>
            </h1>

            <p>Farmer Portal</p>
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

              <span>B</span>

              <Leaf
                size={23}
                className="login-logo-leaf"
                fill="currentColor"
              />

            </div>

          </div>

        </div>


        {/* Heading */}
        <div className="login-heading">

          <div className="login-title-row">

            <Leaf size={17} fill="currentColor" />

            <h2>Farmer Login</h2>

            <Leaf
              size={17}
              fill="currentColor"
              className="login-title-leaf-right"
            />

          </div>

          <p>
            Welcome back! Login to continue
          </p>

        </div>


        {/* Login Card */}
        <div className="login-card">

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* Farmer ID */}
            <div className="login-field">

              <label>
                Farmer ID <span>*</span>
              </label>

              <div className="login-input">

                <UserRound size={18} />

                <input
                  type="text"
                  placeholder="Enter your Farmer ID"
                  value={farmerId}
                  onChange={(e) =>
                    setFarmerId(e.target.value)
                  }
                />

              </div>

            </div>


            {/* Mobile */}
            <div className="login-field">

              <label>
                Registered Mobile Number <span>*</span>
              </label>

              <div className="login-input">

                <div className="login-country-code">
                  +91
                </div>

                <Phone size={18} />

                <input
                  type="tel"
                  placeholder="Enter registered mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

              </div>

            </div>


            {/* Forgot Farmer ID */}
            <button
              type="button"
              className="forgot-farmer-id"
              onClick={onForgotId}
            >
              Forgot Farmer ID?
            </button>


            {/* OTP Information */}
            <div className="otp-info">

              <ShieldCheck size={18} />

              <span>
                We'll send a secure OTP to your
                registered mobile number.
              </span>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="farmer-login-button"
            >

              <span>Send OTP</span>

              <ArrowRight size={20} />

            </button>

          </form>


          {/* Registration */}
          <div className="register-line">

            <span>
              New to BookAgri?
            </span>

            <button
              type="button"
              onClick={onRegister}
            >
              Register as Farmer
            </button>

          </div>

        </div>


        {/* Security */}
        <div className="login-security">

          <ShieldCheck size={16} />

          <span>
            Your information is secure and protected
          </span>

        </div>


        {/* Tagline */}
        <div className="login-tagline">

          <Leaf size={14} fill="currentColor" />

          <span>
            Smart Procurement. Less Waiting.
          </span>

        </div>

      </section>

    </main>
  );
}

export default FarmerLogin;