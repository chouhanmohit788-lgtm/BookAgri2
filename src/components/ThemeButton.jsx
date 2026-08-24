import { Moon, Sun } from "lucide-react";

function ThemeButton({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-button"
    >
      <span className={`theme-icon ${!isDark ? "active" : ""}`}>
        <Sun size={17} strokeWidth={2.2} />
      </span>

      <span className={`theme-toggle ${isDark ? "dark" : ""}`}>
        <span className="theme-knob" />
      </span>

      <span className={`theme-icon ${isDark ? "active" : ""}`}>
        <Moon size={17} strokeWidth={2.2} />
      </span>
    </button>
  );
}

export default ThemeButton;