import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

const translations = {
  en: {
    chooseLanguage: "Choose Your Language",
    selectLanguage: "Select your preferred language to continue",
    english: "English",
    hindi: "Hindi",
    englishNative: "English",
    hindiNative: "हिंदी",
    continue: "Continue",
    languageNote: "Your language preference helps us provide you with the best experience.",
    selectRole: "Select Your Role",
    roleSubtitle: "Choose how you want to use FarmBuddy",
    farmer: "Farmer",
    farmerDesc: "Book slots, manage produce & track bookings",
    operator: "Operator",
    operatorDesc: "Manage procurement, verification & queues",
    admin: "Admin",
    adminDesc: "Manage users, approvals & reports",
    secure: "Your data is secure with us",
    back: "Back", save: "Save", cancel: "Cancel", confirm: "Confirm", submit: "Submit", next: "Next", done: "Done", viewAll: "View All", home: "Home", verified: "Verified",
    farmerLogin: "Farmer Login", welcomeFarmer: "Welcome, Farmer", kisanCode: "Kisan Code", mobileNumber: "Mobile Number", enterKisanCode: "Enter Kisan Code", enterMobile: "Enter mobile number", sendOtp: "Send OTP", verifyOtp: "Verify OTP", enterOtp: "Enter OTP", forgotKisanCode: "Forgot Kisan Code?", login: "Login", loginContinue: "Login to continue", invalidMobile: "Please enter a valid 10-digit mobile number.", otpInfo: "We'll send a secure OTP to your registered mobile number.", newToFarmBuddy: "New to FarmBuddy?", registration: "Register as Farmer", tagline: "Smart Procurement. Less Waiting.",
    hello: "Hello", todayOverview: "Today's Overview", upcomingBooking: "Upcoming Booking", bookingStatus: "Booking Status", bookNewSlot: "Book New Slot", quickAccess: "Quick Access", bookSlot: "Book Slot", myBooking: "My Booking", tokenQueue: "Token / Queue", payment: "Payment", profile: "Profile", notifications: "Notifications", history: "History",
    selectCrop: "Select Crop", selectCentre: "Select Procurement Centre", selectDate: "Select Date", availableSlots: "Available Time Slots", confirmBooking: "Confirm & Book Slot", bookingConfirmed: "Booking Confirmed", bookingId: "Booking ID", status: "Status", confirmed: "Confirmed", available: "Available", full: "Full", morning: "Morning", afternoon: "Afternoon", oneHour: "1 Hour",
    wheat: "Wheat", soybean: "Soybean", maize: "Maize", mustard: "Mustard", quintal: "Quintal", searchProcurementCentre: "Search procurement centre...", selectYourCrop: "Select your crop", selectProcurementCentre: "Select procurement centre", slotSelected: "Slot Selected", pleaseFillAllDetails: "Please fill all details", slotBookedSuccessfully: "Slot booked successfully!", scheduleProcurement: "Schedule your procurement", procurementCentre: "Procurement Centre", availableTimeSlots: "Available Time Slots", currentBooking: "Your current procurement booking", noBookingYet: "No Booking Yet", bookProcurementSlot: "Book a procurement slot to see it here.", date: "Date", time: "Time", bookingCentre: "Procurement Centre", tokenQueueTitle: "Token & Queue", tokenQueueSubtitle: "Your procurement queue status", noActiveBooking: "No Active Booking", bookSlotFirstToken: "Book a slot first to get your token number.", yourToken: "Your Token", currentQueuePosition: "Current Queue Position", slot: "Slot", reachCentreNote: "Please reach the procurement centre before your allotted slot. Your token will be processed according to the live queue.", bookingHistoryTitle: "Booking History", bookingHistorySubtitle: "Your procurement booking records", noBookingHistory: "No Booking History", pastBookingsNote: "Your completed and past bookings will appear here.", paymentTitle: "Payment", paymentSubtitle: "Procurement payment status", noActivePayment: "No Active Booking", completeBookingPayment: "Complete a booking first to see its payment details.", paymentPending: "Payment Pending", paymentSuccessful: "Payment Successful", paymentReceivedNote: "Payment for your completed procurement booking has been received.", quantity: "Quantity", yourToken: "Your Token", paymentAmount: "Payment Amount", paymentCompletedNote: "1 payment completed", amount: "Amount", procurementPayment: "Procurement Payment", paymentPendingNote: "Payment amount will be updated after procurement is completed.", bookingDetailsTitle: "Booking Details", paymentPrototypeNote: "Payment will be reflected here once the procurement transaction is processed. No amount is assumed in this prototype.", paymentPending: "Payment Pending", profileTitle: "My Profile", profileSubtitle: "Farmer account information", verifiedFarmer: "Verified Farmer", personalDetails: "Personal Details", fullName: "Full Name", farmerIdKisanCode: "Farmer ID / Kisan Code", fullAddress: "Full Address", village: "Village", post: "Post", tehsilBlock: "Tehsil / Block", district: "District", state: "State", pinCode: "PIN Code", farmDetails: "Farm Details", landArea: "Land Area", landUnit: "Land Unit", mainCrop: "Main Crop", bankDetails: "Bank Details", accountHolderName: "Account Holder Name", bankName: "Bank Name", accountNumber: "Account Number", ifscCode: "IFSC Code", bankVerified: "Bank account verified", verification: "Verification", aadhaar: "Aadhaar", landRecord: "Land Record", farmerRegistration: "Farmer Registration", submittedVerified: "Submitted · Verified", accountInformation: "Account Information", registrationDate: "Registration Date", accountStatus: "Account Status", active: "Active", inactive: "Inactive", logout: "Logout", upcoming: "Upcoming", completed: "Completed", cancelled: "Cancelled", inProcess: "In Process"
  },
  hi: {
    chooseLanguage: "अपनी भाषा चुनें", selectLanguage: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें", english: "अंग्रेज़ी", hindi: "हिंदी", englishNative: "English", hindiNative: "हिंदी", continue: "जारी रखें", languageNote: "आपकी भाषा की पसंद हमें आपको बेहतर अनुभव देने में मदद करती है।",
    selectRole: "अपनी भूमिका चुनें", roleSubtitle: "चुनें कि आप FarmBuddy का उपयोग कैसे करना चाहते हैं", farmer: "किसान", farmerDesc: "स्लॉट बुक करें, उपज प्रबंधित करें और बुकिंग देखें", operator: "ऑपरेटर", operatorDesc: "खरीद, सत्यापन और कतार प्रबंधित करें", admin: "एडमिन", adminDesc: "यूज़र, अनुमोदन और रिपोर्ट प्रबंधित करें", secure: "आपका डेटा हमारे साथ सुरक्षित है",
    back: "वापस", save: "सेव करें", cancel: "रद्द करें", confirm: "पुष्टि करें", submit: "जमा करें", next: "आगे", done: "पूर्ण", viewAll: "सभी देखें", home: "होम", verified: "सत्यापित",
    farmerLogin: "किसान लॉगिन", welcomeFarmer: "स्वागत है, किसान", kisanCode: "किसान कोड", mobileNumber: "मोबाइल नंबर", enterKisanCode: "किसान कोड दर्ज करें", enterMobile: "मोबाइल नंबर दर्ज करें", sendOtp: "OTP भेजें", verifyOtp: "OTP सत्यापित करें", enterOtp: "OTP दर्ज करें", forgotKisanCode: "किसान कोड भूल गए?", login: "लॉगिन", loginContinue: "जारी रखने के लिए लॉगिन करें", invalidMobile: "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।", otpInfo: "आपके पंजीकृत मोबाइल नंबर पर सुरक्षित OTP भेजा जाएगा।", newToFarmBuddy: "FarmBuddy पर नए हैं?", registration: "किसान के रूप में पंजीकरण करें", tagline: "स्मार्ट खरीद। कम इंतज़ार।",
    hello: "नमस्ते", todayOverview: "आज का विवरण", upcomingBooking: "आगामी बुकिंग", bookingStatus: "बुकिंग स्थिति", bookNewSlot: "नया स्लॉट बुक करें", quickAccess: "त्वरित विकल्प", bookSlot: "स्लॉट बुक करें", myBooking: "मेरी बुकिंग", tokenQueue: "टोकन / कतार", payment: "भुगतान", profile: "प्रोफ़ाइल", notifications: "सूचनाएँ", history: "इतिहास",
    selectCrop: "फसल चुनें", selectCentre: "खरीद केंद्र चुनें", selectDate: "तारीख चुनें", availableSlots: "उपलब्ध समय स्लॉट", confirmBooking: "पुष्टि करें और स्लॉट बुक करें", bookingConfirmed: "बुकिंग की पुष्टि हो गई", bookingId: "बुकिंग आईडी", status: "स्थिति", confirmed: "पुष्टि हुई", available: "उपलब्ध", full: "भर गया", morning: "सुबह", afternoon: "दोपहर", oneHour: "1 घंटा",
    wheat: "गेहूँ", soybean: "सोयाबीन", maize: "मक्का", mustard: "सरसों", quintal: "क्विंटल", searchProcurementCentre: "प्रोक्योरमेंट केंद्र खोजें...", selectYourCrop: "अपनी फसल चुनें", selectProcurementCentre: "प्रोक्योरमेंट केंद्र चुनें", slotSelected: "स्लॉट चुना गया", pleaseFillAllDetails: "कृपया सभी जानकारी भरें", slotBookedSuccessfully: "स्लॉट सफलतापूर्वक बुक हो गया!", scheduleProcurement: "अपना प्रोक्योरमेंट शेड्यूल करें", procurementCentre: "प्रोक्योरमेंट केंद्र", availableTimeSlots: "उपलब्ध समय स्लॉट", currentBooking: "आपकी वर्तमान प्रोक्योरमेंट बुकिंग", noBookingYet: "अभी कोई बुकिंग नहीं", bookProcurementSlot: "अपना प्रोक्योरमेंट स्लॉट बुक करने के लिए यहाँ जाएँ।", date: "तारीख", time: "समय", bookingCentre: "प्रोक्योरमेंट केंद्र", tokenQueueTitle: "टोकन और कतार", tokenQueueSubtitle: "आपकी प्रोक्योरमेंट कतार की स्थिति", noActiveBooking: "कोई सक्रिय बुकिंग नहीं", bookSlotFirstToken: "टोकन नंबर पाने के लिए पहले स्लॉट बुक करें।", yourToken: "आपका टोकन", currentQueuePosition: "वर्तमान कतार स्थिति", slot: "स्लॉट", reachCentreNote: "अपने निर्धारित स्लॉट से पहले प्रोक्योरमेंट केंद्र पहुँचें। आपका टोकन लाइव कतार के अनुसार संसाधित किया जाएगा।", bookingHistoryTitle: "बुकिंग इतिहास", bookingHistorySubtitle: "आपकी प्रोक्योरमेंट बुकिंग का रिकॉर्ड", noBookingHistory: "कोई बुकिंग इतिहास नहीं", pastBookingsNote: "आपकी पूरी और पिछली बुकिंग यहाँ दिखाई देंगी।", paymentTitle: "भुगतान", paymentSubtitle: "प्रोक्योरमेंट भुगतान की स्थिति", noActivePayment: "कोई सक्रिय बुकिंग नहीं", completeBookingPayment: "भुगतान विवरण देखने के लिए पहले बुकिंग पूरी करें।", paymentPending: "भुगतान लंबित", paymentSuccessful: "भुगतान सफल", paymentReceivedNote: "आपकी पूरी हुई प्रोक्योरमेंट बुकिंग का भुगतान प्राप्त हो गया है।", quantity: "मात्रा", yourToken: "आपका टोकन", paymentAmount: "भुगतान राशि", paymentCompletedNote: "1 भुगतान पूरा हुआ", amount: "राशि", procurementPayment: "प्रोक्योरमेंट भुगतान", paymentPendingNote: "प्रोक्योरमेंट पूरा होने के बाद भुगतान की राशि अपडेट की जाएगी।", bookingDetailsTitle: "बुकिंग विवरण", paymentPrototypeNote: "प्रोक्योरमेंट लेनदेन संसाधित होने के बाद भुगतान यहाँ दिखाई देगा। इस प्रोटोटाइप में कोई राशि मानकर नहीं चल रहे हैं।", profileTitle: "मेरी प्रोफ़ाइल", profileSubtitle: "किसान खाते की जानकारी", verifiedFarmer: "सत्यापित किसान", personalDetails: "व्यक्तिगत जानकारी", fullName: "पूरा नाम", farmerIdKisanCode: "किसान आईडी / किसान कोड", fullAddress: "पूरा पता", village: "गाँव", post: "डाकघर", tehsilBlock: "तहसील / ब्लॉक", district: "जिला", state: "राज्य", pinCode: "पिन कोड", farmDetails: "खेत की जानकारी", landArea: "भूमि क्षेत्र", landUnit: "भूमि इकाई", mainCrop: "मुख्य फसल", bankDetails: "बैंक विवरण", accountHolderName: "खाता धारक का नाम", bankName: "बैंक का नाम", accountNumber: "खाता संख्या", ifscCode: "IFSC कोड", bankVerified: "बैंक खाता सत्यापित", verification: "सत्यापन", aadhaar: "आधार", landRecord: "भूमि रिकॉर्ड", farmerRegistration: "किसान पंजीकरण", submittedVerified: "जमा · सत्यापित", accountInformation: "खाता जानकारी", registrationDate: "पंजीकरण तिथि", accountStatus: "खाते की स्थिति", active: "सक्रिय", inactive: "निष्क्रिय", logout: "लॉगआउट", upcoming: "आगामी", completed: "पूर्ण", cancelled: "रद्द", inProcess: "प्रक्रिया में"
  },
};

const autoTranslations = {
    "Smart Procurement. Less Waiting.": "स्मार्ट खरीद। कम इंतज़ार।",
    "Choose Your Language": "अपनी भाषा चुनें",
    "Select your preferred language to continue": "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें",
    "Continue": "जारी रखें",
    "Your language preference helps us provide you with the best experience.": "आपकी भाषा की पसंद हमें आपको बेहतर अनुभव देने में मदद करती है।",
    "Select Your Role": "अपनी भूमिका चुनें",
    "Choose how you want to use FarmBuddy": "चुनें कि आप FarmBuddy का उपयोग कैसे करना चाहते हैं",
    "Farmer": "किसान",
    "Operator": "ऑपरेटर",
    "Admin": "एडमिन",
    "Book slots, manage produce & track bookings": "स्लॉट बुक करें, उपज प्रबंधित करें और बुकिंग देखें",
    "Manage procurement, verification & queues": "खरीद, सत्यापन और कतार प्रबंधित करें",
    "Manage users, approvals & reports": "यूज़र, अनुमोदन और रिपोर्ट प्रबंधित करें",
    "Your data is secure with us": "आपका डेटा हमारे साथ सुरक्षित है",
    "Back": "वापस",
    "Save": "सेव करें",
    "Cancel": "रद्द करें",
    "Confirm": "पुष्टि करें",
    "Submit": "जमा करें",
    "Next": "आगे",
    "Done": "पूर्ण",
    "View All": "सभी देखें",
    "Home": "होम",
    "Verified": "सत्यापित",
    "Logout": "लॉगआउट",
    "Farmer Login": "किसान लॉगिन",
    "Welcome, Farmer": "स्वागत है, किसान",
    "Kisan Code": "किसान कोड",
    "Mobile Number": "मोबाइल नंबर",
    "Enter Kisan Code": "किसान कोड दर्ज करें",
    "Enter mobile number": "मोबाइल नंबर दर्ज करें",
    "Send OTP": "OTP भेजें",
    "Verify OTP": "OTP सत्यापित करें",
    "Enter OTP": "OTP दर्ज करें",
    "Forgot Farmer ID?": "किसान आईडी भूल गए?",
    "Forgot Kisan Code?": "किसान कोड भूल गए?",
    "Login": "लॉगिन",
    "Login to continue": "जारी रखने के लिए लॉगिन करें",
    "Please enter a valid 10-digit mobile number.": "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।",
    "We'll send a secure OTP to your registered mobile number.": "आपके पंजीकृत मोबाइल नंबर पर सुरक्षित OTP भेजा जाएगा।",
    "New to FarmBuddy?": "FarmBuddy पर नए हैं?",
    "Register as Farmer": "किसान के रूप में पंजीकरण करें",
    "Hello": "नमस्ते",
    "Today's Overview": "आज का विवरण",
    "Upcoming Booking": "आगामी बुकिंग",
    "Booking Status": "बुकिंग स्थिति",
    "Book New Slot": "नया स्लॉट बुक करें",
    "Quick Access": "त्वरित विकल्प",
    "Book Slot": "स्लॉट बुक करें",
    "My Booking": "मेरी बुकिंग",
    "Token / Queue": "टोकन / कतार",
    "Payment": "भुगतान",
    "Profile": "प्रोफ़ाइल",
    "Notifications": "सूचनाएँ",
    "History": "इतिहास",
    "Select Crop": "फसल चुनें",
    "Select Procurement Centre": "खरीद केंद्र चुनें",
    "Select Date": "तारीख चुनें",
    "Available Time Slots": "उपलब्ध समय स्लॉट",
    "Confirm & Book Slot": "पुष्टि करें और स्लॉट बुक करें",
    "Booking Confirmed": "बुकिंग की पुष्टि हो गई",
    "Booking ID": "बुकिंग आईडी",
    "Status": "स्थिति",
    "Confirmed": "पुष्टि हुई",
    "Available": "उपलब्ध",
    "Full": "भर गया",
    "Morning": "सुबह",
    "Afternoon": "दोपहर",
    "1 Hour": "1 घंटा",
    "Wheat": "गेहूँ",
    "Soybean": "सोयाबीन",
    "Maize": "मक्का",
    "Mustard": "सरसों",
    "Quintal": "क्विंटल",
    "Qtl": "क्विंटल",
    "Qty": "मात्रा",
    "Quantity": "मात्रा",
    "Search procurement centre...": "प्रोक्योरमेंट केंद्र खोजें...",
    "Select your crop": "अपनी फसल चुनें",
    "Select procurement centre": "प्रोक्योरमेंट केंद्र चुनें",
    "Slot Selected": "स्लॉट चुना गया",
    "Please fill all details": "कृपया सभी जानकारी भरें",
    "Slot booked successfully!": "स्लॉट सफलतापूर्वक बुक हो गया!",
    "Schedule your procurement": "अपना प्रोक्योरमेंट शेड्यूल करें",
    "Procurement Centre": "प्रोक्योरमेंट केंद्र",
    "Your current procurement booking": "आपकी वर्तमान प्रोक्योरमेंट बुकिंग",
    "No Booking Yet": "अभी कोई बुकिंग नहीं",
    "Book a procurement slot to see it here.": "अपना प्रोक्योरमेंट स्लॉट बुक करने के लिए यहाँ जाएँ।",
    "Date": "तारीख",
    "Time": "समय",
    "Token & Queue": "टोकन और कतार",
    "Your procurement queue status": "आपकी प्रोक्योरमेंट कतार की स्थिति",
    "No Active Booking": "कोई सक्रिय बुकिंग नहीं",
    "Book a slot first to get your token number.": "टोकन नंबर पाने के लिए पहले स्लॉट बुक करें।",
    "Your Token": "आपका टोकन",
    "Current Queue Position": "वर्तमान कतार स्थिति",
    "Slot": "स्लॉट",
    "Please reach the procurement centre before your allotted slot. Your token will be processed according to the live queue.": "अपने निर्धारित स्लॉट से पहले प्रोक्योरमेंट केंद्र पहुँचें। आपका टोकन लाइव कतार के अनुसार संसाधित किया जाएगा।",
    "Booking History": "बुकिंग इतिहास",
    "Your procurement booking records": "आपकी प्रोक्योरमेंट बुकिंग का रिकॉर्ड",
    "No Booking History": "कोई बुकिंग इतिहास नहीं",
    "Your completed and past bookings will appear here.": "आपकी पूरी और पिछली बुकिंग यहाँ दिखाई देंगी।",
    "Procurement payment status": "प्रोक्योरमेंट भुगतान की स्थिति",
    "Complete a booking first to see its payment details.": "भुगतान विवरण देखने के लिए पहले बुकिंग पूरी करें।",
    "Payment Pending": "भुगतान लंबित",
    "Procurement Payment": "प्रोक्योरमेंट भुगतान",
    "Payment amount will be updated after procurement is completed.": "प्रोक्योरमेंट पूरा होने के बाद भुगतान की राशि अपडेट की जाएगी।",
    "Booking Details": "बुकिंग विवरण",
    "Payment Successful": "भुगतान सफल",
    "Payment for your completed procurement booking has been received.": "आपकी पूरी हुई प्रोक्योरमेंट बुकिंग का भुगतान प्राप्त हो गया है।",
    "Payment Amount": "भुगतान राशि",
    "My Profile": "मेरी प्रोफ़ाइल",
    "Farmer account information": "किसान खाते की जानकारी",
    "Verified Farmer": "सत्यापित किसान",
    "Personal Details": "व्यक्तिगत जानकारी",
    "Full Name": "पूरा नाम",
    "Farmer ID / Kisan Code": "किसान आईडी / किसान कोड",
    "Full Address": "पूरा पता",
    "Village": "गाँव",
    "Post": "डाकघर",
    "Tehsil / Block": "तहसील / ब्लॉक",
    "District": "जिला",
    "State": "राज्य",
    "PIN Code": "पिन कोड",
    "Farm Details": "खेत की जानकारी",
    "Land Area": "भूमि क्षेत्र",
    "Land Unit": "भूमि इकाई",
    "Main Crop": "मुख्य फसल",
    "Bank Details": "बैंक विवरण",
    "Account Holder Name": "खाता धारक का नाम",
    "Bank Name": "बैंक का नाम",
    "Account Number": "खाता संख्या",
    "IFSC Code": "IFSC कोड",
    "Bank account verified": "बैंक खाता सत्यापित",
    "Verification": "सत्यापन",
    "Aadhaar": "आधार",
    "Land Record": "भूमि रिकॉर्ड",
    "Farmer Registration": "किसान पंजीकरण",
    "Submitted · Verified": "जमा · सत्यापित",
    "Account Information": "खाता जानकारी",
    "Registration Date": "पंजीकरण तिथि",
    "Account Status": "खाते की स्थिति",
    "Active": "सक्रिय",
    "Inactive": "निष्क्रिय",
    "Upcoming": "आगामी",
    "Completed": "पूर्ण",
    "Cancelled": "रद्द",
    "In Process": "प्रक्रिया में",
    "Registration Successful": "पंजीकरण सफल",
    "Registration Summary": "पंजीकरण सारांश",
    "Name": "नाम",
    "Mobile": "मोबाइल",
    "Farmer Type": "किसान का प्रकार",
    "Verify Mobile Number": "मोबाइल नंबर सत्यापित करें",
    "Step": "चरण",
    "of 4": "में से 4",
    "(Optional)": "(वैकल्पिक)",
    "Contact Support": "सहायता से संपर्क करें",
    "FARMER SUPPORT": "किसान सहायता",
    "BOOKING TRACKING": "बुकिंग ट्रैकिंग",
    "Token": "टोकन",
    "Reached Procurement Centre": "प्रोक्योरमेंट केंद्र पहुँच गए",
    "Procurement Started": "प्रोक्योरमेंट शुरू",
    "Payment Processing": "भुगतान प्रक्रिया में",
    "Booking Completed": "बुकिंग पूरी हुई",
    "Token Assigned": "टोकन सौंपा गया",
    "Arrival Time": "पहुँचने का समय",
    "No complaints found": "कोई शिकायत नहीं मिली",
    "No matching procurement data": "कोई मिलान वाला प्रोक्योरमेंट डेटा नहीं मिला",
    "No procurement centres found": "कोई प्रोक्योरमेंट केंद्र नहीं मिला",
    "No procurement data found": "कोई प्रोक्योरमेंट डेटा नहीं मिला",
    "No transaction found.": "कोई लेनदेन नहीं मिला।",
    "Try another search or status filter.": "कोई दूसरा खोज या स्थिति फ़िल्टर आज़माएँ।",
    "Try changing the filters or search.": "फ़िल्टर या खोज बदलकर देखें।",
    "Try changing the search or filters.": "खोज या फ़िल्टर बदलकर देखें।",
    "Try changing the search or status filter.": "खोज या स्थिति फ़िल्टर बदलकर देखें।",
    "Action": "कार्रवाई",
    "All": "सभी",
    "All Dates": "सभी तारीखें",
    "All Status": "सभी स्थितियाँ",
    "Amount": "राशि",
    "Capacity": "क्षमता",
    "Capacity Used": "उपयोग की गई क्षमता",
    "Capacity Utilization": "क्षमता उपयोग",
    "Centre": "केंद्र",
    "Centre Code": "केंद्र कोड",
    "Centre Name & Location": "केंद्र का नाम और स्थान",
    "Centre ID": "केंद्र आईडी",
    "Daily Report": "दैनिक रिपोर्ट",
    "Date & Time": "तारीख और समय",
    "Expected Quantity": "अपेक्षित मात्रा",
    "Actual Procurement": "वास्तविक प्रोक्योरमेंट",
    "Actual Quantity": "वास्तविक मात्रा",
    "Remaining": "शेष",
    "Used Capacity vs Remaining Capacity": "उपयोग की गई क्षमता बनाम शेष क्षमता",
    "Overall Capacity vs Actual Procurement": "कुल क्षमता बनाम वास्तविक प्रोक्योरमेंट",
    "Overall utilization": "कुल उपयोग",
    "Total Capacity": "कुल क्षमता",
    "Total Procured": "कुल प्रोक्योरमेंट",
    "Total Procurement": "कुल प्रोक्योरमेंट",
    "Today's Procurement": "आज का प्रोक्योरमेंट",
    "Total procurement today": "आज का कुल प्रोक्योरमेंट",
    "Previous Days": "पिछले दिन",
    "Procurement Performance": "प्रोक्योरमेंट प्रदर्शन",
    "Recent Procurement Trend": "हाल का प्रोक्योरमेंट रुझान",
    "Record / Receipt ID": "रिकॉर्ड / रसीद आईडी",
    "Record successfully updated": "रिकॉर्ड सफलतापूर्वक अपडेट हुआ",
    "Quality Result": "गुणवत्ता परिणाम",
    "Rejection Reason": "अस्वीकृति कारण",
    "Admin Dashboard": "एडमिन डैशबोर्ड",
    "Admin Portal": "एडमिन पोर्टल",
    "Admin User ID": "एडमिन यूज़र आईडी",
    "Government Admin": "सरकारी एडमिन",
    "GOVERNMENT ADMINISTRATION": "सरकारी प्रशासन",
    "Authorized Access": "अधिकृत पहुँच",
    "Only authorized government administrators can add or update procurement centres.": "केवल अधिकृत सरकारी एडमिन ही प्रोक्योरमेंट केंद्र जोड़ या अपडेट कर सकते हैं।",
    "Procurement Centres": "प्रोक्योरमेंट केंद्र",
    "Procurement Centre List": "प्रोक्योरमेंट केंद्र सूची",
    "Procurement Monitoring": "प्रोक्योरमेंट मॉनिटरिंग",
    "Procurement Overview & Monitoring": "प्रोक्योरमेंट अवलोकन और मॉनिटरिंग",
    "CAPACITY MONITORING": "क्षमता मॉनिटरिंग",
    "CAPACITY STATUS": "क्षमता स्थिति",
    "CENTRE-WISE MONITORING": "केंद्र-वार मॉनिटरिंग",
    "CENTRE STATUS": "केंद्र स्थिति",
    "CROP-WISE QUANTITY": "फसल-वार मात्रा",
    "CURRENT PROCUREMENT": "वर्तमान प्रोक्योरमेंट",
    "DATE-WISE PROCUREMENT": "तारीख-वार प्रोक्योरमेंट",
    "PROCUREMENT BY CROP": "फसल के अनुसार प्रोक्योरमेंट",
    "REPORTS & ANALYSIS": "रिपोर्ट और विश्लेषण",
    "Manage": "प्रबंधित करें",
    "Search and filter complaints received from farmers": "किसानों से प्राप्त शिकायतें खोजें और फ़िल्टर करें",
    "Search and manage centre information": "केंद्र की जानकारी खोजें और प्रबंधित करें",
    "Manage all registered and approved centres in the district": "जिले में सभी पंजीकृत और स्वीकृत केंद्र प्रबंधित करें",
    "Monitor and manage procurement operations": "प्रोक्योरमेंट संचालन की निगरानी और प्रबंधन करें",
    "Review, track and resolve farmer complaints": "किसान शिकायतों की समीक्षा, ट्रैकिंग और समाधान करें",
    "Complaint Details": "शिकायत विवरण",
    "Complaint Description": "शिकायत विवरण",
    "Complaint Type": "शिकायत प्रकार",
    "Complaint Register": "शिकायत रजिस्टर",
    "Complaint history and admin actions should remain recorded for audit purposes.": "ऑडिट के लिए शिकायत इतिहास और एडमिन कार्रवाई दर्ज रहनी चाहिए।",
    "Demo Admin ID": "डेमो एडमिन आईडी",
    "Demo OTP": "डेमो OTP",
    "Demo Password": "डेमो पासवर्ड",
    "OTP Sent Successfully": "OTP सफलतापूर्वक भेजा गया",
    "🧪 Demo Login Details": "🧪 डेमो लॉगिन विवरण",
    "Today": "आज",
    "Search": "खोजें",
    "Filter": "फ़िल्टर",
    "Select": "चुनें",
    "Type": "प्रकार",
    "Transaction": "लेनदेन",
    "Transactions": "लेनदेन",
    "Report": "रिपोर्ट",
    "Reports": "रिपोर्ट",
    "Overview": "अवलोकन",
    "Queue": "कतार",
    "Used": "उपयोग",
    "Target": "लक्ष्य",
    "Centre-wise Procurement Report": "केंद्र-वार प्रोक्योरमेंट रिपोर्ट",
    "Compare actual procurement with centre capacity": "वास्तविक प्रोक्योरमेंट की केंद्र क्षमता से तुलना करें",
    "This is a demo procurement record for prototype use.": "यह प्रोटोटाइप उपयोग के लिए डेमो प्रोक्योरमेंट रिकॉर्ड है।",
    "Prototype only": "केवल प्रोटोटाइप"
};

const normalize = (value) => value.replace(/\s+/g, " ").trim();
const protectedText = (value) => {
  const s = normalize(value);
  if (!s) return true;
  if (/^[0-9\s:+%₹₹₨.,/\-\(\)#]+$/.test(s)) return true;
  return false;
};

export function translateDomText(value, language) {
  const original = normalize(String(value));
  if (!original || protectedText(original) || language === "en") return original;
  if (autoTranslations[original]) return autoTranslations[original];
  // Preserve dynamic identifiers/values while translating common labels.
  let result = original;
  const replacements = [
    ["Farmer ID:", "किसान आईडी:"], ["Centre ID:", "केंद्र आईडी:"], ["Token:", "टोकन:"], ["Payment Amount:", "भुगतान राशि:"], ["Quantity:", "मात्रा:"], ["Farmer ID / Kisan Code:", "किसान आईडी / किसान कोड:"],
  ];
  for (const [from, to] of replacements) if (result.startsWith(from)) result = to + result.slice(from.length);
  return autoTranslations[original] || result;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("bookagri-language");
    return saved === "hi" ? "hi" : "en";
  });

  useEffect(() => {
    localStorage.setItem("bookagri-language", language);
  }, [language]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const translateTree = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach((textNode) => {
        const parent = textNode.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) return;
        const state = originalTextNodes.get(textNode) || {};
        if (!Object.prototype.hasOwnProperty.call(state, "original") || textNode.nodeValue !== state.translated) {
          state.original = textNode.nodeValue;
        }
        const translated = translateDomText(state.original, language);
        state.translated = translated;
        originalTextNodes.set(textNode, state);
        if (textNode.nodeValue !== translated) textNode.nodeValue = translated;
      });

      document.querySelectorAll("[placeholder], [title], [aria-label]").forEach((el) => {
        ["placeholder", "title", "aria-label"].forEach((attr) => {
          const value = el.getAttribute(attr);
          if (!value) return;
          const map = originalAttributes.get(el) || {};
          if (!Object.prototype.hasOwnProperty.call(map, attr) || value !== map[`translated_${attr}`]) {
            map[attr] = value;
          }
          const original = map[attr];
          const translated = translateDomText(original, language);
          map[`translated_${attr}`] = translated;
          originalAttributes.set(el, map);
          if (value !== translated) el.setAttribute(attr, translated);
        });
      });
    };

    translateTree();
    const observer = new MutationObserver(() => translateTree());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label"] });
    return () => observer.disconnect();
  }, [language]);

  const changeLanguage = (newLanguage) => setLanguage(newLanguage === "hi" ? "hi" : "en");
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
