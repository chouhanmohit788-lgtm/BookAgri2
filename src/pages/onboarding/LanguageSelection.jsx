import { Languages, Leaf, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import "./LanguageSelection.css";

function LanguageSelection({ onContinue }) {
  const { language, changeLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <main className={`language-page ${isDark ? "dark-mode" : ""}`}>

      {/* Background decorations */}
      <div className="language-glow language-glow-one" />
      <div className="language-glow language-glow-two" />

      {/* Top Bar */}
      <header className="language-topbar">
        <div className="mini-brand">
          <Leaf size={17} strokeWidth={2.2} />
          <span>BookAgri</span>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />
      </header>

      {/* Main Content */}
      <section className="language-content">

        {/* Logo */}
        <div className="language-logo-wrap">
          <div className="language-logo-ring">
            <div className="language-logo">
              <span>B</span>
              <Leaf
                className="logo-leaf"
                size={25}
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="language-brand">
          <h1>
            Book<span>Agri</span>
          </h1>

          <div className="brand-divider">
            <span />
            <Leaf size={15} fill="currentColor" />
            <span />
          </div>

          <p>Smart Procurement. Less Waiting.</p>
        </div>

        {/* Heading */}
        <div className="language-heading">
          <div className="heading-icon">
            <Languages size={19} strokeWidth={2} />
          </div>

          <h2>{t.chooseLanguage}</h2>

          <p>{t.selectLanguage}</p>
        </div>

        {/* Language Cards */}
        <div className="language-options">

          {/* English */}
          <button
            type="button"
            onClick={() => changeLanguage("en")}
            className={`language-card ${
              language === "en" ? "selected" : ""
            }`}
          >
            <div className="language-card-top">
              <div className="language-symbol">
                A
              </div>

              
            </div>

            <div className="language-card-text">
              <strong>English</strong>
              <span>English</span>
            </div>
          </button>

          {/* Hindi */}
          <button
            type="button"
            onClick={() => changeLanguage("hi")}
            className={`language-card ${
              language === "hi" ? "selected" : ""
            }`}
          >
            <div className="language-card-top">
              <div className="language-symbol hindi-symbol">
                अ
              </div>

              
            </div>

            <div className="language-card-text">
              <strong>हिंदी</strong>
              <span>Hindi</span>
            </div>
          </button>

        </div>

        {/* Continue */}
        <button
  type="button"
  className="continue-button"
  onClick={onContinue}
>
          <span>{t.continue}</span>
          <Sparkles size={17} strokeWidth={2.2} />
        </button>

        {/* Note */}
        <p className="language-note">
          {t.languageNote}
        </p>

      </section>

      {/* Bottom Decoration */}
      <div className="bottom-leaves">
        <Leaf size={22} />
        <Leaf size={15} />
        <Leaf size={19} />
      </div>

    </main>
  );
}

export default LanguageSelection;