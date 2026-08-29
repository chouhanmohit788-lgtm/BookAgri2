import React, { useEffect, useState } from "react";
import FarmerLogin from "./pages/auth/FarmerLogin";
import ForgotFarmerId from "./pages/auth/ForgotFarmerId";
import OperatorLogin from "./pages/auth/operatorLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProcurementCentres from "./pages/admin/ProcurementCentres";
import ProcurementOverviewMonitoring from "./pages/admin/ProcurementOverviewMonitoring";
import ComplaintReceive from "./pages/admin/ComplaintReceive";
import FarmerComplaints from "./pages/farmer/FarmerComplaints";
import OperatorDashboard from "./pages/Operator/operatorDashboard";
import Farmers from "./pages/Operator/Farmers";
import Procurement from "./pages/Operator/Procurement";
import StockDispatch from "./pages/Operator/StockDispatch";
import Reports from "./pages/Operator/Reports";
import OperatorProfile from "./pages/Operator/OperatorProfile";
import TodayBookings from "./pages/Operator/TodayBookings";
import CompletedProcurement from "./pages/Operator/CompletedProcurement";
import ProcurementCapacity from "./pages/Operator/ProcurementCapacity";
import ExpectedArrivals from "./pages/Operator/ExpectedArrivals";
import TransactionHistory from "./pages/Operator/TransactionHistory";

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
import HelpSupport from "./pages/farmer/HelpSupport";


function App() {

  // Always start the app from the Home/Splash page on a fresh app load.
  // Do not restore the previous screen from localStorage.
  const [screen, setScreen] = React.useState("splash");

  const [selectedRole, setSelectedRole] = React.useState(null);
  const [booking, setBooking] = React.useState(null);


  // Splash → Language
  useEffect(() => {
    if (screen !== "splash") return;

    const timer = setTimeout(() => {
      setScreen("language");
    }, 3000);

    return () => clearTimeout(timer);
  }, [screen]);


  // Language → Role
  const handleLanguageContinue = () => {
    setScreen("role");
  };


  // Role → Login
  const handleRoleContinue = (role) => {

    setSelectedRole(role);

    if (role === "farmer") {
      setScreen("farmerLogin");
    } else if (role === "operator") {
      setScreen("procurementCentreLogin");
    } else if (role === "admin") {
      setScreen("adminLogin");
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
  // ADMIN LOGIN
  // =========================

  if (screen === "adminLogin") {
    return (
      <AdminLogin
        onBack={() => setScreen("role")}
        onLogin={(adminData) => {
          console.log("Admin verified:", adminData);
          setScreen("adminDashboard");
        }}
      />
    );
  }

  // =========================
  // PROCUREMENT OVERVIEW & MONITORING
  // =========================

  if (screen === "procurementOverview") {
    return (
      <ProcurementOverviewMonitoring
        onBack={() => setScreen("adminDashboard")}
      />
    );
  }

  // =========================
  // PROCUREMENT CENTRES
  // =========================

  if (screen === "procurementCentres") {
    return (
      <ProcurementCentres
        onBack={() => setScreen("adminDashboard")}
      />
    );
  }

  // =========================
  // FARMER COMPLAINTS
  // =========================

  if (screen === "farmerComplaints") {
    return (
      <FarmerComplaints
        onBack={() => setScreen("farmerDashboard")}
      />
    );
  }

  // =========================
  // ADMIN COMPLAINT RECEIVE
  // =========================

  if (screen === "adminComplaints") {
    return (
      <ComplaintReceive
        onBack={() => setScreen("adminDashboard")}
      />
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  if (screen === "adminDashboard") {
    return (
      <AdminDashboard
        onNavigate={(page) => {
          if (page === "procurementOverview") {
            setScreen("procurementOverview");
          } else if (page === "centres") {
            setScreen("procurementCentres");
          } else if (page === "complaints") {
            setScreen("adminComplaints");
          } else {
            console.log("Admin section selected:", page);
          }
        }}
        onLogout={() => setScreen("role")}
      />
    );
  }

  // =========================
  // PROCUREMENT CENTRE LOGIN
  // =========================

  if (screen === "procurementCentreLogin") {
    return (
      <OperatorLogin
        onBack={() => setScreen("role")}
        onLoginSuccess={() => {
          setScreen("procurementCentreDashboard");
        }}
      />
    );
  }

  // =========================
  // PROCUREMENT CENTRE DASHBOARD
  // =========================

  if (screen === "procurementCentreDashboard") {
    return (
      <OperatorDashboard
        onBack={() => setScreen("role")}
        onLogout={() => setScreen("role")}
        onFarmers={() => setScreen("farmers")}
        onProcurement={() => setScreen("procurement")}
        onStockDispatch={() => setScreen("stockDispatch")}
        onReports={() => setScreen("reports")}
        onProfile={() => setScreen("operatorProfile")}
        onTodayBookings={() => setScreen("todayBookings")}
        onCompletedProcurement={() => setScreen("completedProcurement")}
        onQuantityProcured={() => setScreen("procurementCapacity")}
        onExpectedArrivals={() => setScreen("expectedArrivals")}
        onTransactionHistory={() => setScreen("transactionHistory")}
/>
    );
  }

  // =========================
  // TODAY'S BOOKINGS
  // =========================

  if (screen === "todayBookings") {
    return (
      <TodayBookings
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // OPERATOR PROFILE
  // =========================

  if (screen === "operatorProfile") {
    return (
      <OperatorProfile
        onBack={() => setScreen("procurementCentreDashboard")}
        onLogout={() => setScreen("role")}
      />
    );
  }

  // =========================
  // COMPLETED PROCUREMENT
  // =========================

  if (screen === "completedProcurement") {
    return (
      <CompletedProcurement
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // PROCUREMENT CAPACITY
  // =========================

  if (screen === "procurementCapacity") {
    return (
      <ProcurementCapacity
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // EXPECTED ARRIVALS
  // =========================

  if (screen === "expectedArrivals") {
    return (
      <ExpectedArrivals
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // TRANSACTION HISTORY
  // =========================

  if (screen === "transactionHistory") {
    return (
      <TransactionHistory
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // FARMERS
  // =========================

  if (screen === "farmers") {
    return (
      <Farmers
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // PROCUREMENT
  // =========================

  if (screen === "procurement") {
    return (
      <Procurement
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // STOCK & DISPATCH
  // =========================

  if (screen === "stockDispatch") {
    return (
      <StockDispatch
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // REPORTS
  // =========================

  if (screen === "reports") {
    return (
      <Reports
        onBack={() => setScreen("procurementCentreDashboard")}
      />
    );
  }

  // =========================
  // RECEIPT & PROCUREMENT RECORD
  // =========================

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
  // HELP & SUPPORT
  // =========================

  if (screen === "helpSupport") {
    return (
      <HelpSupport
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
      onHelpSupport={() => setScreen("helpSupport")}
      onComplaints={() => setScreen("farmerComplaints")}
      booking={booking}
    />
  );
}


  return <Home />;
}


export default App;