
import {
  ArrowRight,
  Check,
  Leaf,
  ShieldCheck,
  Settings,
  Sprout,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";

import "./RoleSelection.css";

function RoleSelection({ onContinue }) {
  const { language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [selectedRole, setSelectedRole] = React.useState("farmer");

  const content = {
    en: {
      title: "Select Your Role",
      subtitle: "Choose how you want to use FarmBuddy",

      farmer: "Farmer",
      farmerDesc: "Book slots, manage produce & track bookings",

      operator: "Operator / User",
      operatorDesc: "Manage procurement, verification & queues",

      admin: "Admin",
      adminDesc: "Manage users, approvals & reports",

      continue: "Continue",
      secure: "Your data is secure with us",
    },

    hi: {
      title: "अपनी भूमिका चुनें",
      subtitle: "चुनें कि आप FarmBuddy का उपयोग कैसे करना चाहते हैं",

      farmer: "किसान",
      farmerDesc: "स्लॉट बुक करें, उपज प्रबंधित करें और बुकिंग देखें",

      operator: "ऑपरेटर / यूज़र",
      operatorDesc: "खरीद, सत्यापन और कतार प्रबंधित करें",

      admin: "एडमिन",
      adminDesc: "यूज़र, अनुमोदन और रिपोर्ट प्रबंधित करें",

      continue: "जारी रखें",
      secure: "आपका डेटा हमारे साथ सुरक्षित है",
    },
  };

  const text = content[language];

  const roles = [
    {
      id: "farmer",
      title: text.farmer,
      description: text.farmerDesc,
      icon: Sprout,
    },
    {
      id: "operator",
      title: text.operator,
      description: text.operatorDesc,
      icon: Settings,
    },
    {
      id: "admin",
      title: text.admin,
      description: text.adminDesc,
      icon: ShieldCheck,
    },
  ];

  return (
    <main className={`role-page ${isDark ? "dark-mode" : ""}`}>

      {/* Background */}
      <div className="role-glow role-glow-one" />
      <div className="role-glow role-glow-two" />

      {/* Decorative leaves */}
      <Leaf className="role-leaf role-leaf-left" />
      <Leaf className="role-leaf role-leaf-right" />

      {/* Top Bar */}
      <header className="role-topbar">

        <div className="role-mini-brand">
          <Leaf size={18} fill="currentColor" />
          <span>
  <span style={{ color: "#07552f" }}>Farm</span>
  <span style={{ color: "#45c35b" }}>Buddy</span>
</span>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />

      </header>

      {/* Main */}
      <section className="role-content">

        {/* Logo */}
        <div className="role-logo-wrap">

          <div className="role-logo-ring">

            <div className="role-logo">
              <img
                src="/farmbuddy-logo.png"
                alt="FarmBuddy"
                className="role-logo-image"
              />
            </div>

          </div>

        </div>

        {/* Heading */}
        <div className="role-heading">

          <div className="role-heading-title">

            <Leaf
              size={20}
              fill="currentColor"
            />

            <h1>{text.title}</h1>

            <Leaf
              size={20}
              fill="currentColor"
              className="right-leaf"
            />

          </div>

          <p>{text.subtitle}</p>

          <div className="role-divider">
            <span />
            <Leaf size={14} fill="currentColor" />
            <span />
          </div>

        </div>

        {/* Role Cards */}
        <div className="role-options">

          {roles.map((role) => {

            const Icon = role.icon;

            const isSelected =
              selectedRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                className={`role-card ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() =>
                  setSelectedRole(role.id)
                }
              >

                {isSelected && (
                  <div className="role-check">
                    <Check
                      size={15}
                      strokeWidth={3}
                    />
                  </div>
                )}

                <div className="role-icon">

                  <Icon
                    size={42}
                    strokeWidth={1.8}
                  />

                </div>

                <div className="role-card-title">
                  {role.title}
                </div>

                <div className="role-card-line" />

                <p>
                  {role.description}
                </p>

                <div className="role-arrow">
                  <ArrowRight size={18} />
                </div>

              </button>
            );
          })}

        </div>

        {/* Continue */}
        <button
          type="button"
          className="role-continue"
          onClick={() => onContinue(selectedRole)}
        >
          <span>{text.continue}</span>

          <ArrowRight
            size={21}
            strokeWidth={2.5}
          />
        </button>

        {/* Security */}
        <div className="role-security">

          <ShieldCheck size={17} />

          <span>{text.secure}</span>

        </div>

      </section>

      {/* Bottom decoration */}
      <div className="role-bottom-decoration">
        <Leaf size={24} />
        <Leaf size={17} />
        <Leaf size={21} />
      </div>

    </main>
  );
}

export default RoleSelection;