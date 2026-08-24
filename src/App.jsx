import { useEffect, useState } from "react";

import FarmerLogin from "./pages/auth/FarmerLogin";
import ForgotFarmerId from "./pages/auth/ForgotFarmerId";

import Home from "./pages/Home";

import LanguageSelection from "./pages/onboarding/LanguageSelection";
import RoleSelection from "./pages/onboarding/RoleSelection";

import FarmerRegistration from "./pages/farmer/FarmerRegistration";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";


function App() {

  const [screen, setScreen] = useState("splash");

  const [selectedRole, setSelectedRole] = useState(null);


  // Splash → Language
  useEffect(() => {

    const timer = setTimeout(() => {
      setScreen("language");
    }, 3000);

    return () => clearTimeout(timer);

  }, []);


  // Language → Role
  const handleLanguageContinue = () => {
    setScreen("role");
  };


  // Role → Login
  const handleRoleContinue = (role) => {

    setSelectedRole(role);

    if (role === "farmer") {
      setScreen("farmerLogin");
    }

  };


  // =========================
  // SPLASH
  // =========================

  if (screen === "splash") {
    return <Home />;
  }


  // =========================
  // LANGUAGE
  // =========================

  if (screen === "language") {

    return (
      <LanguageSelection
        onContinue={handleLanguageContinue}
      />
    );

  }


  // =========================
  // ROLE
  // =========================

  if (screen === "role") {

    return (
      <RoleSelection
        onContinue={handleRoleContinue}
      />
    );

  }


  // =========================
  // FARMER LOGIN
  // =========================

  if (screen === "farmerLogin") {

    return (
      <FarmerLogin

        onRegister={() =>
          setScreen("farmerRegistration")
        }

        onForgotId={() =>
          setScreen("forgotFarmerId")
        }

        onLoginSuccess={() =>
          setScreen("farmerDashboard")
        }

      />
    );

  }


  // =========================
  // FORGOT FARMER ID
  // =========================

  if (screen === "forgotFarmerId") {

    return (
      <ForgotFarmerId
        onBack={() =>
          setScreen("farmerLogin")
        }
      />
    );

  }


  // =========================
  // FARMER REGISTRATION
  // =========================

  if (screen === "farmerRegistration") {

    return (
      <FarmerRegistration

        onLogin={() =>
          setScreen("farmerLogin")
        }

      />
    );

  }


  // =========================
  // FARMER DASHBOARD
  // =========================

  if (screen === "farmerDashboard") {

    return (
      <FarmerDashboard />
    );

  }


  return <Home />;
}


export default App;