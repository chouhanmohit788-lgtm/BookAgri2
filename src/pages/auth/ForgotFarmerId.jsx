import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import "./ForgotFarmerId.css";

function ForgotFarmerId({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length === 10) {
      setSent(true);
    }
  };

  return (
    <main className={`forgot-id-page ${isDark ? "dark-mode" : ""}`}>

      <header className="forgot-id-header">
        <div className="forgot-brand">
          <div className="forgot-brand-icon">
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

      <section className="forgot-id-content">

        <button
          type="button"
          className="forgot-back"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <div className="forgot-icon">
          <ShieldCheck size={30} />
        </div>

        {!sent ? (
          <>
            <div className="forgot-heading">
              <h2>Forgot Farmer ID?</h2>

              <p>
                Enter your registered mobile number
                and we'll help you recover your Farmer ID.
              </p>
            </div>

            <div className="forgot-card">

              <form onSubmit={handleSubmit}>

                <label>
                  Registered Mobile Number <span>*</span>
                </label>

                <div className="forgot-input">

                  <div className="forgot-country">
                    +91
                  </div>

                  <Phone size={18} />

                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                  />

                </div>

                <div className="forgot-info">
                  <ShieldCheck size={17} />

                  <span>
                    We'll verify your identity using
                    an OTP sent to this number.
                  </span>
                </div>

                <button
                  type="submit"
                  className="recover-button"
                >
                  Recover Farmer ID
                  <ArrowRight size={19} />
                </button>

              </form>

            </div>
          </>
        ) : (
          <div className="recovery-success">

            <div className="success-circle">
              <CheckCircle2 size={45} />
            </div>

            <h2>OTP Sent Successfully</h2>

            <p>
              A verification OTP has been sent to
              <strong> +91 {mobile}</strong>.
            </p>

            <div className="demo-id-box">
              <span>Your Farmer ID</span>
              <strong>FA-2026-001248</strong>

              <small>
                Your actual Farmer ID will appear
                here after backend verification.
              </small>
            </div>

            <button
              type="button"
              className="recover-button"
              onClick={onBack}
            >
              Back to Login
              <ArrowRight size={19} />
            </button>

          </div>
        )}

        <div className="forgot-security">
          <ShieldCheck size={15} />
          Your information is secure and protected
        </div>

      </section>

    </main>
  );
}

export default ForgotFarmerId;