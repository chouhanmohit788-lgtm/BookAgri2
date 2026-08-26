
import { useEffect, useState } from "react";
import FarmerLogin from "./pages/auth/FarmerLogin";
import ForgotFarmerId from "./pages/auth/ForgotFarmerId";

import Home from "./pages/Home";

import LanguageSelection from "./pages/onboarding/LanguageSelection";
import RoleSelection from "./pages/onboarding/RoleSelection";

import FarmerRegistration from "./pages/farmer/FarmerRegistration";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import BookSlot from "./pages/farmer/BookSlot";
import Payment from "./pages/farmer/Payment";
import MyBooking from "./pages/farmer/MyBooking";
import BookingHistory from "./pages/farmer/BookingHistory";
import TokenQueue from "./pages/farmer/TokenQueue";
import Profile from "./pages/farmer/Profile";
import Weather from "./pages/farmer/Weather";


function App() {

  const [screen, setScreen] = useState("splash");

  const [selectedRole, setSelectedRole] = useState(null);
  const [booking, setBooking] = useState(null);


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
// BOOK SLOT
// =========================

if (screen === "bookSlot") {
  return (
    <BookSlot
      onBack={() => setScreen("farmerDashboard")}
      onBookingConfirmed={(newBooking) => {
        setBooking(newBooking);
        setScreen("farmerDashboard");
      }}
    />
  );
}

  // =========================
  // BOOKING HISTORY
  // =========================

  if (screen === "bookingHistory") {
    return (
      <BookingHistory
        booking={booking}
        onBack={() => setScreen("farmerDashboard")}
      />
    );
  }

  // =========================
  // TOKEN & QUEUE
  // =========================

  if (screen === "tokenQueue") {
    return (
      <TokenQueue
        booking={booking}
        onBack={() => setScreen("farmerDashboard")}
      />
    );
  }

  // =========================
  // MY BOOKING
  // =========================

  if (screen === "myBooking") {
    return (
      <MyBooking
        booking={booking}
        onBack={() => setScreen("farmerDashboard")}
        onBookingUpdated={(updatedBooking) => {
          setBooking(updatedBooking);
          setScreen("farmerDashboard");
        }}
      />
    );
  }

  // =========================
  // PAYMENT
  // =========================

  if (screen === "payment") {
    return (
      <Payment
        booking={booking}
        onBack={() => setScreen("farmerDashboard")}
      />
    );
  }

  // =========================
  // PROFILE
  // =========================

  if (screen === "profile") {
    return (
      <Profile
        onBack={() => setScreen("farmerDashboard")}
        onChangeLanguage={() => setScreen("language")}
        onLogout={() => setScreen("role")}
      />
    );
  }

  // =========================
  // WEATHER
  // =========================

  if (screen === "weather") {
    return (
      <Weather
        onBack={() => setScreen("farmerDashboard")}
      />
    );
  }

  // =========================
  // FARMER DASHBOARD
  // =========================

  if (screen === "farmerDashboard") {
  return (
    <FarmerDashboard
      onBookSlot={() => setScreen("bookSlot")}
      onMyBooking={() => setScreen("myBooking")}
      onTokenQueue={() => setScreen("tokenQueue")}
      onHistory={() => setScreen("bookingHistory")}
      onPayment={() => setScreen("payment")}
      onProfile={() => setScreen("profile")}
      onWeather={() => setScreen("weather")}
      booking={booking}
    />
  );
}


  return <Home />;
}


export default App;