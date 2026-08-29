import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  Headset,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./HelpSupport.css";

const faqData = [
  {
    "id": 1,
    "category": "Account & Kisan Code",
    "question": "What is a Kisan Code?",
    "answer": "A Kisan Code is a unique identification code for a farmer that can be used to identify the farmer on FarmBuddy.",
    "hiAnswer": "किसान कोड किसान की एक विशिष्ट पहचान संख्या है, जिससे FarmBuddy पर किसान की पहचान की जाती है।",
    "keywords": [
      "kisan code",
      "farmer code",
      "id"
    ]
  },
  {
    "id": 2,
    "category": "Account & Kisan Code",
    "question": "Where can I find my Kisan Code?",
    "answer": "You can find your Kisan Code in the official record provided during registration or in your registered procurement details.",
    "hiAnswer": "अपना किसान कोड पंजीकरण के समय मिले आधिकारिक रिकॉर्ड या पंजीकृत खरीद विवरण से देखें।",
    "keywords": [
      "kisan code",
      "code kaha",
      "kahan milega"
    ]
  },
  {
    "id": 3,
    "category": "Account & Kisan Code",
    "question": "I forgot my Kisan Code. What should I do?",
    "answer": "Use your registered mobile number and official farmer records to verify or recover your Kisan Code.",
    "hiAnswer": "अपने पंजीकृत मोबाइल नंबर और आधिकारिक किसान रिकॉर्ड से किसान कोड सत्यापित या रिकवर करने की प्रक्रिया अपनाएँ।",
    "keywords": [
      "bhool",
      "forgot",
      "kisan code"
    ]
  },
  {
    "id": 4,
    "category": "Account & Kisan Code",
    "question": "My Kisan Code is showing as incorrect. What should I do?",
    "answer": "Enter the code again carefully. If the problem continues, contact Support for verification.",
    "hiAnswer": "कोड दोबारा ध्यान से दर्ज करें। समस्या बनी रहे तो Contact Support से सत्यापन करवाएँ।",
    "keywords": [
      "galat",
      "wrong",
      "kisan code"
    ]
  },
  {
    "id": 5,
    "category": "Account & Kisan Code",
    "question": "Can I log in using my mobile number?",
    "answer": "FarmBuddy login can use the registered farmer details and mobile verification.",
    "hiAnswer": "FarmBuddy में किसान लॉगिन के लिए पंजीकृत किसान विवरण और मोबाइल सत्यापन का उपयोग किया जाता है।",
    "keywords": [
      "mobile",
      "login"
    ]
  },
  {
    "id": 6,
    "category": "Account & Kisan Code",
    "question": "What is an OTP?",
    "answer": "An OTP is a one-time verification code received on the registered mobile number during login or verification.",
    "hiAnswer": "OTP एक बार इस्तेमाल होने वाला सत्यापन कोड है, जो लॉगिन या सत्यापन के समय पंजीकृत मोबाइल पर मिलता है।",
    "keywords": [
      "otp",
      "one time"
    ]
  },
  {
    "id": 7,
    "category": "Account & Kisan Code",
    "question": "I am not receiving the OTP. What should I do?",
    "answer": "Check your network, wait a few seconds, and resend the OTP. If the problem continues, contact support.",
    "hiAnswer": "नेटवर्क जाँचें, कुछ सेकंड प्रतीक्षा करके OTP दोबारा भेजें। फिर भी समस्या हो तो सपोर्ट से संपर्क करें।",
    "keywords": [
      "otp",
      "nahi aa",
      "resend"
    ]
  },
  {
    "id": 8,
    "category": "Account & Kisan Code",
    "question": "How many times can I resend the OTP?",
    "answer": "OTP resending is limited to a certain number of attempts. You may need to wait before trying again.",
    "hiAnswer": "OTP दोबारा भेजने के प्रयास सीमित होते हैं। बार-बार अनुरोध करने पर कुछ समय प्रतीक्षा करनी पड़ सकती है।",
    "keywords": [
      "otp",
      "resend",
      "attempt"
    ]
  },
  {
    "id": 9,
    "category": "Account & Kisan Code",
    "question": "I entered the wrong OTP. What should I do?",
    "answer": "Enter the correct OTP again or resend the latest OTP and verify it.",
    "hiAnswer": "सही OTP दोबारा दर्ज करें या नया OTP भेजकर सत्यापन करें।",
    "keywords": [
      "wrong otp",
      "galat otp"
    ]
  },
  {
    "id": 10,
    "category": "Account & Kisan Code",
    "question": "My mobile number has changed. What should I do?",
    "answer": "Follow the applicable official verification process to update your registered mobile number or contact support for help.",
    "hiAnswer": "पंजीकृत मोबाइल अपडेट करने के लिए आधिकारिक सत्यापन प्रक्रिया अपनाएँ या सपोर्ट से सहायता लें।",
    "keywords": [
      "mobile change",
      "number change"
    ]
  },
  {
    "id": 11,
    "category": "Account & Kisan Code",
    "question": "Can two farmer accounts be logged in using the same mobile number?",
    "answer": "Account access depends on the registered farmer details and verification. Contact support to verify duplicate access.",
    "hiAnswer": "अकाउंट का एक्सेस पंजीकृत किसान विवरण और सत्यापन पर निर्भर करता है। डुप्लीकेट एक्सेस के लिए सपोर्ट से जाँच करवाएँ।",
    "keywords": [
      "same mobile",
      "two farmer"
    ]
  },
  {
    "id": 12,
    "category": "Account & Kisan Code",
    "question": "Why am I unable to log in?",
    "answer": "Check the Kisan Code, mobile number, and required details. Also make sure the OTP is entered correctly.",
    "hiAnswer": "किसान कोड, मोबाइल नंबर और जरूरी विवरण जाँचें। OTP भी सही दर्ज करें।",
    "keywords": [
      "login problem",
      "login nahi"
    ]
  },
  {
    "id": 13,
    "category": "Account & Kisan Code",
    "question": "Do I need a password?",
    "answer": "The current farmer login prototype uses OTP-based verification.",
    "hiAnswer": "वर्तमान किसान लॉगिन प्रोटोटाइप OTP आधारित सत्यापन का उपयोग करता है।",
    "keywords": [
      "password",
      "login"
    ]
  },
  {
    "id": 14,
    "category": "Account & Kisan Code",
    "question": "Is it necessary to log out?",
    "answer": "Yes, logging out after using a shared or public device is safer.",
    "hiAnswer": "हाँ, साझा या सार्वजनिक डिवाइस इस्तेमाल करने के बाद लॉगआउट करना अधिक सुरक्षित है।",
    "keywords": [
      "logout",
      "security"
    ]
  },
  {
    "id": 15,
    "category": "Account & Kisan Code",
    "question": "How can I keep my account secure?",
    "answer": "Do not share your OTP with anyone and use only the official FarmBuddy access.",
    "hiAnswer": "OTP किसी के साथ साझा न करें और केवल आधिकारिक FarmBuddy का उपयोग करें।",
    "keywords": [
      "security",
      "secure",
      "otp share"
    ]
  },
  {
    "id": 16,
    "category": "Booking & Slot",
    "question": "How can I book a procurement slot?",
    "answer": "Go to Book New Slot, select the crop, quantity, procurement centre, date, and available time, then confirm the booking.",
    "hiAnswer": "Book New Slot पर जाकर फसल, मात्रा, खरीद केंद्र, तारीख और उपलब्ध समय चुनकर बुकिंग की पुष्टि करें।",
    "keywords": [
      "slot",
      "book",
      "booking"
    ]
  },
  {
    "id": 17,
    "category": "Booking & Slot",
    "question": "What details are required to book a slot?",
    "answer": "You need to select the crop, expected quantity, procurement centre, date, and available time slot.",
    "hiAnswer": "फसल, अनुमानित मात्रा, खरीद केंद्र, तारीख और उपलब्ध समय स्लॉट चुनना होता है।",
    "keywords": [
      "details",
      "slot",
      "booking"
    ]
  },
  {
    "id": 18,
    "category": "Booking & Slot",
    "question": "Can I view my booking details after booking?",
    "answer": "Yes, confirmed booking details can be viewed in the My Booking section.",
    "hiAnswer": "हाँ, My Booking सेक्शन में पुष्टि की गई बुकिंग की जानकारी देख सकते हैं।",
    "keywords": [
      "my booking",
      "booking details"
    ]
  },
  {
    "id": 19,
    "category": "Booking & Slot",
    "question": "How can I know whether my booking is confirmed?",
    "answer": "Check the booking status in My Booking or the notification section.",
    "hiAnswer": "My Booking या Notification सेक्शन में बुकिंग की स्थिति देखें।",
    "keywords": [
      "confirmed",
      "booking status"
    ]
  },
  {
    "id": 20,
    "category": "Booking & Slot",
    "question": "Can I change the booking date?",
    "answer": "Changing the date depends on availability and current booking rules. If the option is available, update it from My Booking.",
    "hiAnswer": "तारीख बदलना उपलब्धता और मौजूदा बुकिंग नियमों पर निर्भर करता है। विकल्प हो तो My Booking से अपडेट करें।",
    "keywords": [
      "date change",
      "reschedule"
    ]
  },
  {
    "id": 21,
    "category": "Booking & Slot",
    "question": "Can I cancel a booking?",
    "answer": "If cancellation is available, start the process from My Booking; otherwise contact support.",
    "hiAnswer": "Cancellation उपलब्ध हो तो My Booking से प्रक्रिया शुरू करें, अन्यथा सपोर्ट से संपर्क करें।",
    "keywords": [
      "cancel",
      "booking cancel"
    ]
  },
  {
    "id": 22,
    "category": "Booking & Slot",
    "question": "I cannot find an available slot. What should I do?",
    "answer": "Check another available date or time slot. If all slots are unavailable, try again later.",
    "hiAnswer": "दूसरी उपलब्ध तारीख या समय स्लॉट देखें। सभी स्लॉट उपलब्ध न हों तो बाद में फिर प्रयास करें।",
    "keywords": [
      "slot nahi",
      "available slot"
    ]
  },
  {
    "id": 23,
    "category": "Booking & Slot",
    "question": "How many slots can I book in one day?",
    "answer": "The number of bookings allowed in one day depends on the applicable procurement rules and system availability.",
    "hiAnswer": "एक दिन में अनुमत बुकिंग खरीद नियमों और सिस्टम की उपलब्धता पर निर्भर करती हैं।",
    "keywords": [
      "one day",
      "kitne slot"
    ]
  },
  {
    "id": 24,
    "category": "Booking & Slot",
    "question": "Is booking free?",
    "answer": "The FarmBuddy prototype does not show a separate service charge for slot selection; actual charges depend on the applicable policy.",
    "hiAnswer": "FarmBuddy प्रोटोटाइप में स्लॉट चयन के लिए अलग सेवा शुल्क नहीं दिखाया गया है; वास्तविक शुल्क लागू नीति पर निर्भर करेंगे।",
    "keywords": [
      "free",
      "charge",
      "booking"
    ]
  },
  {
    "id": 25,
    "category": "Booking & Slot",
    "question": "What should I do if I entered the wrong quantity?",
    "answer": "Verify the quantity before confirmation. If a correction option is available for a confirmed booking, use it.",
    "hiAnswer": "पुष्टि से पहले मात्रा जाँचें। पुष्टि की गई बुकिंग में सुधार विकल्प हो तो उसका उपयोग करें।",
    "keywords": [
      "quantity",
      "galat quantity"
    ]
  },
  {
    "id": 26,
    "category": "Booking & Slot",
    "question": "Can I change the quantity later?",
    "answer": "Changing the quantity in a confirmed booking depends on the system rules.",
    "hiAnswer": "पुष्टि की गई बुकिंग में मात्रा बदलना सिस्टम के नियमों पर निर्भर करेगा।",
    "keywords": [
      "quantity change"
    ]
  },
  {
    "id": 27,
    "category": "Booking & Slot",
    "question": "How do I select a crop?",
    "answer": "Select the crop you are actually taking for procurement, such as Wheat, Soybean, Maize, or Mustard.",
    "hiAnswer": "अपनी वास्तविक खरीद वाली फसल चुनें, जैसे गेहूँ, सोयाबीन, मक्का या सरसों।",
    "keywords": [
      "crop select",
      "crop"
    ]
  },
  {
    "id": 28,
    "category": "Booking & Slot",
    "question": "I selected the wrong crop. What should I do?",
    "answer": "Select the correct crop before confirming the booking. If a correction option is available after confirmation, use it.",
    "hiAnswer": "बुकिंग की पुष्टि से पहले सही फसल चुनें। पुष्टि की गई बुकिंग में सुधार विकल्प हो तो उसका उपयोग करें।",
    "keywords": [
      "wrong crop",
      "crop change"
    ]
  },
  {
    "id": 29,
    "category": "Booking & Slot",
    "question": "How do I choose a procurement centre?",
    "answer": "Search for a centre and select the relevant procurement centre from the available list.",
    "hiAnswer": "केंद्र खोजकर उपलब्ध सूची में से संबंधित खरीद केंद्र चुनें।",
    "keywords": [
      "centre",
      "center",
      "select centre"
    ]
  },
  {
    "id": 30,
    "category": "Booking & Slot",
    "question": "Can I see nearby procurement centres?",
    "answer": "You can search the list of available procurement centres and choose the relevant centre.",
    "hiAnswer": "उपलब्ध खरीद केंद्रों की सूची में खोज करके अपने लिए सही केंद्र चुनें।",
    "keywords": [
      "nearby",
      "centre"
    ]
  },
  {
    "id": 31,
    "category": "Booking & Slot",
    "question": "What should I do after selecting a date?",
    "answer": "Select the required available date from the calendar and then choose an available time slot.",
    "hiAnswer": "कैलेंडर से उपलब्ध तारीख चुनें और फिर उपलब्ध समय स्लॉट चुनें।",
    "keywords": [
      "date select",
      "calendar"
    ]
  },
  {
    "id": 32,
    "category": "Booking & Slot",
    "question": "Can I select a past date?",
    "answer": "Past dates should not be selected for booking. Choose an available future date.",
    "hiAnswer": "खरीद के लिए पिछली तारीख नहीं चुननी चाहिए। उपलब्ध भविष्य की तारीख चुनें।",
    "keywords": [
      "past date",
      "old date"
    ]
  },
  {
    "id": 33,
    "category": "Booking & Slot",
    "question": "What does it mean when a time slot is full?",
    "answer": "It means the current availability of that time slot has been filled.",
    "hiAnswer": "इसका मतलब है कि उस समय स्लॉट की उपलब्ध क्षमता पूरी हो चुकी है।",
    "keywords": [
      "full",
      "time slot"
    ]
  },
  {
    "id": 34,
    "category": "Booking & Slot",
    "question": "Do I get a token after booking confirmation?",
    "answer": "Token or queue information may be available with a confirmed booking.",
    "hiAnswer": "पुष्टि की गई बुकिंग के साथ टोकन या कतार की जानकारी उपलब्ध हो सकती है।",
    "keywords": [
      "token",
      "booking confirmation"
    ]
  },
  {
    "id": 35,
    "category": "Booking & Slot",
    "question": "When should I go to the centre after booking?",
    "answer": "You should reach the centre according to the selected date and time slot of your confirmed booking.",
    "hiAnswer": "पुष्टि की गई बुकिंग में चुनी गई तारीख और समय के अनुसार केंद्र पर पहुँचना चाहिए।",
    "keywords": [
      "kab jana",
      "date time",
      "centre"
    ]
  },
  {
    "id": 36,
    "category": "Procurement Process",
    "question": "What happens at a procurement centre?",
    "answer": "The farmer brings the crop to the centre, where verification, weighing or quantity recording, and the procurement process can be completed.",
    "hiAnswer": "किसान फसल लेकर केंद्र पर आता है, जहाँ सत्यापन, वजन/मात्रा दर्ज करना और खरीद प्रक्रिया पूरी की जाती है।",
    "keywords": [
      "procurement centre",
      "process"
    ]
  },
  {
    "id": 37,
    "category": "Procurement Process",
    "question": "What should I take with me to the centre?",
    "answer": "Carry the required farmer identification, booking or token details, and any required documents related to the crop.",
    "hiAnswer": "जरूरी किसान पहचान, बुकिंग/टोकन विवरण और फसल से जुड़े आवश्यक दस्तावेज साथ रखें।",
    "keywords": [
      "documents",
      "centre",
      "what bring"
    ]
  },
  {
    "id": 38,
    "category": "Procurement Process",
    "question": "What is the use of the token number?",
    "answer": "The token or queue number helps the farmer understand their turn and current queue position.",
    "hiAnswer": "टोकन या कतार नंबर किसान की बारी और वर्तमान कतार स्थिति समझने में मदद करता है।",
    "keywords": [
      "token",
      "queue"
    ]
  },
  {
    "id": 39,
    "category": "Procurement Process",
    "question": "How can I check the token queue?",
    "answer": "Check the current token and queue position in the Token & Queue section.",
    "hiAnswer": "Token & Queue सेक्शन में वर्तमान टोकन और कतार की स्थिति देखें।",
    "keywords": [
      "queue",
      "token queue"
    ]
  },
  {
    "id": 40,
    "category": "Procurement Process",
    "question": "Why is my procurement pending?",
    "answer": "Procurement may be pending because of centre workload, verification, weighing, or the current processing stage.",
    "hiAnswer": "केंद्र का काम, सत्यापन, वजन या प्रोसेसिंग की स्थिति के कारण खरीद लंबित हो सकती है।",
    "keywords": [
      "pending",
      "procurement pending"
    ]
  },
  {
    "id": 41,
    "category": "Procurement Process",
    "question": "What does procurement completed mean?",
    "answer": "It means the centre has marked the current procurement transaction as completed.",
    "hiAnswer": "इसका मतलब है कि केंद्र ने वर्तमान खरीद लेन-देन को पूर्ण स्थिति में दर्ज कर दिया है।",
    "keywords": [
      "completed",
      "procurement complete"
    ]
  },
  {
    "id": 42,
    "category": "Procurement Process",
    "question": "How long is the waiting time at the centre?",
    "answer": "Waiting time depends on the centre workload, queue, and daily activity.",
    "hiAnswer": "प्रतीक्षा समय केंद्र के काम, कतार और दैनिक गतिविधि पर निर्भर करता है।",
    "keywords": [
      "waiting time",
      "wait"
    ]
  },
  {
    "id": 43,
    "category": "Procurement Process",
    "question": "Do I still have to wait after booking?",
    "answer": "Yes, there may still be some waiting at the centre depending on the queue and daily workload.",
    "hiAnswer": "हाँ, केंद्र की कतार और दैनिक काम के अनुसार प्रतीक्षा करनी पड़ सकती है।",
    "keywords": [
      "wait",
      "booking"
    ]
  },
  {
    "id": 44,
    "category": "Procurement Process",
    "question": "Can procurement be done without a booking?",
    "answer": "It depends on the centre's applicable process and availability. Following the scheduled slot is recommended.",
    "hiAnswer": "यह केंद्र की लागू प्रक्रिया और उपलब्धता पर निर्भर करता है। निर्धारित स्लॉट का पालन करना बेहतर है।",
    "keywords": [
      "without booking",
      "bina booking"
    ]
  },
  {
    "id": 45,
    "category": "Procurement Process",
    "question": "What do I receive after procurement?",
    "answer": "The procurement record or confirmation and applicable payment processing information can be updated in the system after procurement.",
    "hiAnswer": "खरीद पूरी होने के बाद खरीद रिकॉर्ड/पुष्टि और लागू भुगतान प्रक्रिया की जानकारी अपडेट की जा सकती है।",
    "keywords": [
      "after procurement",
      "record"
    ]
  },
  {
    "id": 46,
    "category": "Procurement Process",
    "question": "Will the farmer receive a receipt?",
    "answer": "The applicable receipt or record process depends on the centre and system workflow after procurement completion.",
    "hiAnswer": "खरीद पूरी होने के बाद रसीद या रिकॉर्ड केंद्र और सिस्टम की प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "receipt",
      "procurement"
    ]
  },
  {
    "id": 47,
    "category": "Procurement Process",
    "question": "Why was my crop not accepted?",
    "answer": "Possible reasons include quality, quantity, documentation, or applicable procurement criteria. Verify the exact reason with the centre.",
    "hiAnswer": "गुणवत्ता, मात्रा, दस्तावेज या लागू खरीद मानकों के कारण हो सकते हैं। सही कारण केंद्र से पता करें।",
    "keywords": [
      "crop reject",
      "accept nahi"
    ]
  },
  {
    "id": 48,
    "category": "Procurement Process",
    "question": "What is quality checking?",
    "answer": "The crop may be checked according to the applicable quality parameters.",
    "hiAnswer": "फसल को लागू गुणवत्ता मानकों के अनुसार जाँचा जा सकता है।",
    "keywords": [
      "quality check",
      "quality"
    ]
  },
  {
    "id": 49,
    "category": "Procurement Process",
    "question": "What should I do if there is a quality issue?",
    "answer": "Understand the exact issue from the centre and, if necessary, raise a complaint through the Farmer Complaint section.",
    "hiAnswer": "केंद्र से समस्या का सही कारण समझें और जरूरत होने पर Farmer Complaint से शिकायत दर्ज करें।",
    "keywords": [
      "quality problem",
      "complaint"
    ]
  },
  {
    "id": 50,
    "category": "Procurement Process",
    "question": "What should I check during weighing?",
    "answer": "Carefully verify the recorded quantity and the displayed or recorded weight.",
    "hiAnswer": "दर्ज की गई मात्रा और दिखाए/दर्ज किए गए वजन को ध्यान से जाँचें।",
    "keywords": [
      "weighing",
      "weight check"
    ]
  },
  {
    "id": 51,
    "category": "Procurement Process",
    "question": "What should I do if the recorded quantity is lower?",
    "answer": "Ask the centre to verify the recorded quantity. If the issue is not resolved, raise a weighing or quantity complaint.",
    "hiAnswer": "केंद्र पर दर्ज मात्रा की जाँच करवाएँ। समस्या हल न हो तो वजन/मात्रा से जुड़ी शिकायत करें।",
    "keywords": [
      "quantity kam",
      "weight less"
    ]
  },
  {
    "id": 52,
    "category": "Procurement Process",
    "question": "Can I check my procurement status?",
    "answer": "Yes, the procurement status can be checked through My Booking, relevant status screens, or available procurement updates.",
    "hiAnswer": "हाँ, My Booking, संबंधित स्टेटस स्क्रीन या उपलब्ध खरीद अपडेट से स्थिति देखी जा सकती है।",
    "keywords": [
      "procurement status"
    ]
  },
  {
    "id": 53,
    "category": "Procurement Process",
    "question": "What should I do if the centre is closed?",
    "answer": "Check the centre status and contact support for an alternative centre or date if needed.",
    "hiAnswer": "केंद्र की स्थिति देखें और वैकल्पिक केंद्र/तारीख के लिए सपोर्ट से संपर्क करें।",
    "keywords": [
      "centre closed",
      "band"
    ]
  },
  {
    "id": 54,
    "category": "Procurement Process",
    "question": "What should I do if I cannot contact the centre staff?",
    "answer": "Use the centre help or contact option, or report the issue through Contact Support.",
    "hiAnswer": "केंद्र का Help/Contact विकल्प इस्तेमाल करें या Contact Support से समस्या बताएँ।",
    "keywords": [
      "staff",
      "contact centre"
    ]
  },
  {
    "id": 55,
    "category": "Procurement Process",
    "question": "Whom should I contact if there is a problem with the procurement process?",
    "answer": "First verify the issue with the relevant procurement centre staff. For an unresolved issue, use a complaint or support.",
    "hiAnswer": "पहले संबंधित खरीद केंद्र के स्टाफ से जाँच करें। समस्या हल न हो तो शिकायत या सपोर्ट का उपयोग करें।",
    "keywords": [
      "problem",
      "support"
    ]
  },
  {
    "id": 56,
    "category": "Payment",
    "question": "How can I check my payment status?",
    "answer": "Check the available payment status and related information in the Payment section.",
    "hiAnswer": "Payment सेक्शन में उपलब्ध भुगतान स्थिति और संबंधित जानकारी देखें।",
    "keywords": [
      "payment status",
      "payment"
    ]
  },
  {
    "id": 57,
    "category": "Payment",
    "question": "When will the payment arrive?",
    "answer": "Payment timing depends on actual procurement completion and the applicable payment processing.",
    "hiAnswer": "भुगतान का समय वास्तविक खरीद पूरी होने और भुगतान प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "payment kab",
      "payment"
    ]
  },
  {
    "id": 58,
    "category": "Payment",
    "question": "Why is my payment pending?",
    "answer": "Payment may be pending because of verification, procurement completion, or payment processing.",
    "hiAnswer": "सत्यापन, खरीद पूरी होने या भुगतान प्रक्रिया के कारण भुगतान लंबित हो सकता है।",
    "keywords": [
      "payment pending"
    ]
  },
  {
    "id": 59,
    "category": "Payment",
    "question": "My procurement is complete but the payment has not been updated. What should I do?",
    "answer": "Verify the procurement record. If the payment is still not updated, raise a payment-related complaint.",
    "hiAnswer": "खरीद रिकॉर्ड की जाँच करें। भुगतान अपडेट न हो तो भुगतान से जुड़ी शिकायत करें।",
    "keywords": [
      "payment not updated",
      "complete"
    ]
  },
  {
    "id": 60,
    "category": "Payment",
    "question": "What should I do if the payment amount seems incorrect?",
    "answer": "Verify the transaction details and raise a payment complaint if the issue continues.",
    "hiAnswer": "लेन-देन की जानकारी जाँचें और समस्या बनी रहे तो भुगतान संबंधी शिकायत करें।",
    "keywords": [
      "wrong payment",
      "amount"
    ]
  },
  {
    "id": 61,
    "category": "Payment",
    "question": "How can I check my bank account details?",
    "answer": "If there is a payment issue, verify the registered bank information through the applicable official records.",
    "hiAnswer": "भुगतान समस्या होने पर पंजीकृत बैंक जानकारी को आधिकारिक रिकॉर्ड से सत्यापित करें।",
    "keywords": [
      "bank",
      "account"
    ]
  },
  {
    "id": 62,
    "category": "Payment",
    "question": "My bank account has changed. What should I do?",
    "answer": "Follow the applicable official verification or update process to change bank details.",
    "hiAnswer": "बैंक विवरण बदलने के लिए लागू आधिकारिक सत्यापन/अपडेट प्रक्रिया अपनाएँ।",
    "keywords": [
      "bank change",
      "account change"
    ]
  },
  {
    "id": 63,
    "category": "Payment",
    "question": "What should I do if the payment failed?",
    "answer": "Check the payment status again and contact support after the required bank or transaction verification.",
    "hiAnswer": "भुगतान स्थिति दोबारा जाँचें और बैंक/लेन-देन सत्यापन के बाद सपोर्ट से संपर्क करें।",
    "keywords": [
      "payment failed"
    ]
  },
  {
    "id": 64,
    "category": "Payment",
    "question": "Can I view my payment history?",
    "answer": "Available payment history can be checked in the Payment or Transaction section.",
    "hiAnswer": "Payment या Transaction सेक्शन में उपलब्ध भुगतान इतिहास देखा जा सकता है।",
    "keywords": [
      "payment history"
    ]
  },
  {
    "id": 65,
    "category": "Payment",
    "question": "Is the Kisan Code important for payment?",
    "answer": "The Kisan Code may be relevant for farmer identification and transaction mapping.",
    "hiAnswer": "किसान की पहचान और लेन-देन को जोड़ने के लिए किसान कोड उपयोगी हो सकता है।",
    "keywords": [
      "payment",
      "kisan code"
    ]
  },
  {
    "id": 66,
    "category": "Payment",
    "question": "How can I raise a payment-related complaint?",
    "answer": "In Farmer Complaints, select the Payment related complaint type and submit the issue details.",
    "hiAnswer": "Farmer Complaints में 'Payment related' शिकायत प्रकार चुनकर समस्या दर्ज करें।",
    "keywords": [
      "payment complaint"
    ]
  },
  {
    "id": 67,
    "category": "Payment",
    "question": "I did not receive the payment receipt. What should I do?",
    "answer": "Check the available transaction details and contact support for receipt or record verification.",
    "hiAnswer": "लेन-देन की जानकारी जाँचें और रसीद/रिकॉर्ड सत्यापन के लिए सपोर्ट से संपर्क करें।",
    "keywords": [
      "receipt",
      "payment"
    ]
  },
  {
    "id": 68,
    "category": "Payment",
    "question": "Which account will receive the payment?",
    "answer": "Payment may be processed according to the registered or verified bank account details.",
    "hiAnswer": "भुगतान पंजीकृत या सत्यापित बैंक खाते के अनुसार किया जा सकता है।",
    "keywords": [
      "which account",
      "bank"
    ]
  },
  {
    "id": 69,
    "category": "Payment",
    "question": "Is cash payment available?",
    "answer": "The payment mode depends on the applicable official process; check the payment information available in the app.",
    "hiAnswer": "भुगतान का तरीका लागू आधिकारिक प्रक्रिया पर निर्भर करता है। ऐप में उपलब्ध जानकारी देखें।",
    "keywords": [
      "cash",
      "payment mode"
    ]
  },
  {
    "id": 70,
    "category": "Payment",
    "question": "How long does it take to resolve a payment issue?",
    "answer": "Resolution time depends on the issue type and verification process.",
    "hiAnswer": "समस्या का समाधान समय शिकायत के प्रकार और सत्यापन प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "payment issue",
      "time"
    ]
  },
  {
    "id": 71,
    "category": "Procurement Centre Help",
    "question": "How can I find the address of a procurement centre?",
    "answer": "Check the centre location or details in the Procurement Centres section or the booking centre list.",
    "hiAnswer": "Procurement Centres सेक्शन या बुकिंग की केंद्र सूची से केंद्र का स्थान/पता देखें।",
    "keywords": [
      "address",
      "centre location"
    ]
  },
  {
    "id": 72,
    "category": "Procurement Centre Help",
    "question": "Where can I find the centre contact number?",
    "answer": "Check the contact or help information available in the centre details.",
    "hiAnswer": "केंद्र की जानकारी में उपलब्ध Contact/Help विवरण देखें।",
    "keywords": [
      "contact number",
      "centre contact"
    ]
  },
  {
    "id": 73,
    "category": "Procurement Centre Help",
    "question": "How can I see the working status of a centre?",
    "answer": "Check the available centre status or operational information to see whether it is Active or Inactive.",
    "hiAnswer": "उपलब्ध केंद्र स्थिति में Active या Inactive स्थिति देखें।",
    "keywords": [
      "working status",
      "active inactive"
    ]
  },
  {
    "id": 74,
    "category": "Procurement Centre Help",
    "question": "How can I know whether procurement is happening at the centre today?",
    "answer": "Check the centre status and current procurement activity updates.",
    "hiAnswer": "केंद्र की स्थिति और वर्तमान खरीद गतिविधि के अपडेट देखें।",
    "keywords": [
      "today procurement",
      "centre status"
    ]
  },
  {
    "id": 75,
    "category": "Procurement Centre Help",
    "question": "I selected the wrong centre. What should I do?",
    "answer": "Select the correct centre before booking confirmation. After confirmation, follow the available correction process.",
    "hiAnswer": "बुकिंग की पुष्टि से पहले सही केंद्र चुनें। पुष्टि के बाद उपलब्ध सुधार प्रक्रिया अपनाएँ।",
    "keywords": [
      "wrong centre",
      "centre change"
    ]
  },
  {
    "id": 76,
    "category": "Procurement Centre Help",
    "question": "My selected centre is too far away.",
    "answer": "Compare the locations of the available procurement centres and choose the appropriate centre.",
    "hiAnswer": "उपलब्ध खरीद केंद्रों की जगह की तुलना करके उपयुक्त केंद्र चुनें।",
    "keywords": [
      "far centre",
      "door"
    ]
  },
  {
    "id": 77,
    "category": "Procurement Centre Help",
    "question": "What should I do if there is a weighing machine problem at the centre?",
    "answer": "Inform the centre staff and raise a weighing or quantity-related complaint.",
    "hiAnswer": "केंद्र के स्टाफ को बताएँ और वजन/मात्रा से जुड़ी शिकायत दर्ज करें।",
    "keywords": [
      "weighing machine",
      "machine problem"
    ]
  },
  {
    "id": 78,
    "category": "Procurement Centre Help",
    "question": "The queue at the centre is very long. What should I do?",
    "answer": "Check the current token or queue status and ask the centre staff for the expected waiting time.",
    "hiAnswer": "वर्तमान टोकन/कतार स्थिति देखें और केंद्र स्टाफ से अनुमानित प्रतीक्षा समय पूछें।",
    "keywords": [
      "long queue",
      "queue"
    ]
  },
  {
    "id": 79,
    "category": "Procurement Centre Help",
    "question": "The centre staff did not listen to my complaint. What should I do?",
    "answer": "Record the complaint details and submit the issue to the admin through Farmer Complaints.",
    "hiAnswer": "शिकायत का विवरण दर्ज करके Farmer Complaints के माध्यम से एडमिन को समस्या भेजें।",
    "keywords": [
      "staff complaint",
      "complaint"
    ]
  },
  {
    "id": 80,
    "category": "Procurement Centre Help",
    "question": "Why is the centre showing as inactive?",
    "answer": "A centre may appear inactive because of a temporary operational issue, schedule, or administrative status. Verify with support.",
    "hiAnswer": "केंद्र अस्थायी समस्या, शेड्यूल या प्रशासनिक स्थिति के कारण Inactive हो सकता है। सपोर्ट से पुष्टि करें।",
    "keywords": [
      "inactive centre"
    ]
  },
  {
    "id": 81,
    "category": "Complaints",
    "question": "How can I raise a complaint?",
    "answer": "From the Farmer Dashboard Complaint section, enter the complaint type, centre, and description, then submit it.",
    "hiAnswer": "Farmer Dashboard के Complaint सेक्शन में शिकायत प्रकार, केंद्र और विवरण भरकर शिकायत भेजें।",
    "keywords": [
      "complaint",
      "raise"
    ]
  },
  {
    "id": 82,
    "category": "Complaints",
    "question": "How can I check my complaint status?",
    "answer": "You can check submitted complaints and their current status in the Complaint section.",
    "hiAnswer": "Complaint सेक्शन में भेजी गई शिकायत और उसकी वर्तमान स्थिति देखें।",
    "keywords": [
      "complaint status"
    ]
  },
  {
    "id": 83,
    "category": "Complaints",
    "question": "What does Pending complaint status mean?",
    "answer": "It means the complaint has been received and detailed action has not started yet.",
    "hiAnswer": "इसका मतलब है कि शिकायत मिल गई है और अभी उस पर विस्तृत कार्रवाई शुरू नहीं हुई है।",
    "keywords": [
      "pending complaint"
    ]
  },
  {
    "id": 84,
    "category": "Complaints",
    "question": "What does In Progress mean?",
    "answer": "It means the admin or concerned team is reviewing the complaint or working to resolve it.",
    "hiAnswer": "इसका मतलब है कि एडमिन या संबंधित टीम शिकायत की जाँच/समाधान पर काम कर रही है।",
    "keywords": [
      "in progress"
    ]
  },
  {
    "id": 85,
    "category": "Complaints",
    "question": "What does Resolved mean?",
    "answer": "It means the action or resolution has been recorded and the issue has been marked as resolved.",
    "hiAnswer": "इसका मतलब है कि शिकायत पर कार्रवाई/समाधान दर्ज हो गया है और उसे Resolved किया गया है।",
    "keywords": [
      "resolved complaint"
    ]
  },
  {
    "id": 86,
    "category": "Complaints",
    "question": "What complaint types are available?",
    "answer": "Available complaint types include Procurement Centre related, Weighing or Quantity related, Payment related, Quality related, and Other.",
    "hiAnswer": "Procurement Centre related, Weighing/Quantity related, Payment related, Quality related और Other शिकायत प्रकार उपलब्ध हैं।",
    "keywords": [
      "complaint type",
      "types"
    ]
  },
  {
    "id": 87,
    "category": "Complaints",
    "question": "What should I write in the complaint description?",
    "answer": "Write what happened, where it happened, when it happened, and what the issue is in simple detail.",
    "hiAnswer": "क्या हुआ, किस केंद्र पर हुआ, कब हुआ और समस्या क्या है—इन बातों को सरल शब्दों में लिखें।",
    "keywords": [
      "description",
      "complaint"
    ]
  },
  {
    "id": 88,
    "category": "Complaints",
    "question": "Do I need to provide my Kisan Code with a complaint?",
    "answer": "Yes, the Kisan Code is useful for farmer identification and complaint verification.",
    "hiAnswer": "किसान की पहचान और शिकायत सत्यापन के लिए किसान कोड उपयोगी है।",
    "keywords": [
      "kisan code",
      "complaint"
    ]
  },
  {
    "id": 89,
    "category": "Complaints",
    "question": "How long will a complaint take to resolve?",
    "answer": "Resolution time depends on the complaint type and the verification or action required.",
    "hiAnswer": "समाधान का समय शिकायत के प्रकार और जाँच/कार्रवाई पर निर्भर करता है।",
    "keywords": [
      "resolve time",
      "complaint"
    ]
  },
  {
    "id": 90,
    "category": "Complaints",
    "question": "What should I do if my complaint is not resolved?",
    "answer": "Check the complaint status and use Contact Support with the required action or resolution details.",
    "hiAnswer": "शिकायत की स्थिति देखें और जरूरी कार्रवाई/समाधान के विवरण के साथ Contact Support का उपयोग करें।",
    "keywords": [
      "not resolved",
      "support"
    ]
  },
  {
    "id": 91,
    "category": "Help & General",
    "question": "What is Help & Support in FarmBuddy?",
    "answer": "The Help & Support section provides common questions, process guidance, and support contact options.",
    "hiAnswer": "Help & Support सेक्शन सामान्य सवालों, प्रक्रिया की जानकारी और सपोर्ट संपर्क की सुविधा देता है।",
    "keywords": [
      "help support"
    ]
  },
  {
    "id": 92,
    "category": "Help & General",
    "question": "What does FAQ mean?",
    "answer": "FAQ stands for Frequently Asked Questions, where ready answers to common questions are provided.",
    "hiAnswer": "FAQ का मतलब Frequently Asked Questions है, जहाँ सामान्य सवालों के तैयार जवाब मिलते हैं।",
    "keywords": [
      "faq"
    ]
  },
  {
    "id": 93,
    "category": "Help & General",
    "question": "Can I search for my question?",
    "answer": "Yes, you can type your question in Help & Support and search for the matching FAQ answer.",
    "hiAnswer": "हाँ, Help & Support में अपना सवाल लिखकर उससे मिलता-जुलता FAQ उत्तर खोज सकते हैं।",
    "keywords": [
      "search question",
      "question"
    ]
  },
  {
    "id": 94,
    "category": "Help & General",
    "question": "What if my exact question is not in the list?",
    "answer": "Search the question using simple keywords. If no matching answer is found, use Contact Support.",
    "hiAnswer": "सवाल को आसान keywords के साथ खोजें। जवाब न मिले तो Contact Support का उपयोग करें।",
    "keywords": [
      "question not found",
      "support"
    ]
  },
  {
    "id": 95,
    "category": "Help & General",
    "question": "Can I get help in Hindi?",
    "answer": "Yes, FarmBuddy can provide a Hindi or English interface and guidance according to the selected language.",
    "hiAnswer": "हाँ, भाषा बदलने पर FarmBuddy में हिंदी/अंग्रेजी इंटरफेस और सहायता दिखाई जा सकती है।",
    "keywords": [
      "hindi",
      "language help"
    ]
  },
  {
    "id": 96,
    "category": "Help & General",
    "question": "What is Contact Support?",
    "answer": "Contact Support lets a farmer send a request to the support team for an unresolved problem.",
    "hiAnswer": "Contact Support विकल्प से किसान अपनी समस्या के लिए सपोर्ट टीम को अनुरोध भेज सकता है।",
    "keywords": [
      "contact support"
    ]
  },
  {
    "id": 97,
    "category": "Help & General",
    "question": "What details should I provide to support?",
    "answer": "Providing the Kisan Code, procurement centre, issue type, and a short problem description is helpful.",
    "hiAnswer": "किसान कोड, खरीद केंद्र, समस्या का प्रकार और समस्या का छोटा विवरण देना उपयोगी है।",
    "keywords": [
      "support details"
    ]
  },
  {
    "id": 98,
    "category": "Help & General",
    "question": "Should I use Complaint or Help & Support?",
    "answer": "Use Complaint to record a specific issue; use Help & Support for general guidance or unresolved help.",
    "hiAnswer": "विशिष्ट समस्या दर्ज करनी हो तो Complaint का उपयोग करें; सामान्य सहायता के लिए Help & Support इस्तेमाल करें।",
    "keywords": [
      "complaint or support"
    ]
  },
  {
    "id": 99,
    "category": "Help & General",
    "question": "The information in the app is not updating. What should I do?",
    "answer": "Check the internet connection, refresh or reopen the page, and contact support if the issue continues.",
    "hiAnswer": "इंटरनेट कनेक्शन जाँचें, पेज रिफ्रेश/दोबारा खोलें और समस्या बनी रहे तो सपोर्ट से संपर्क करें।",
    "keywords": [
      "update",
      "refresh"
    ]
  },
  {
    "id": 100,
    "category": "Help & General",
    "question": "What is the best way to report a problem in FarmBuddy?",
    "answer": "For a specific issue, raise a Complaint; for general assistance, use the Contact Support option in Help & Support.",
    "hiAnswer": "विशिष्ट समस्या के लिए Complaint दर्ज करें और सामान्य सहायता के लिए Help & Support के Contact Support विकल्प का उपयोग करें।",
    "keywords": [
      "report problem",
      "best way"
    ]
  }
];

const categories = ["All", ...Array.from(new Set(faqData.map((item) => item.category)))];

export default function HelpSupport({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();

    if (!text) {
      return [];
    }

    const terms = text.split(/\s+/).filter(Boolean);

    return faqData
      .filter((item) => category === "All" || item.category === category)
      .map((item) => {
        const searchable = (
          item.question +
          " " +
          item.answer +
          " " +
          item.category +
          " " +
          item.keywords.join(" ")
        ).toLowerCase();

        let score = 0;
        terms.forEach((term) => {
          if (searchable.includes(term)) score += 1;
          if (item.question.toLowerCase().includes(term)) score += 2;
          if (
            item.keywords.some(
              (keyword) => keyword.includes(term) || term.includes(keyword)
            )
          ) {
            score += 3;
          }
        });

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.id - b.id);
  }, [query, category]);

  const handleSupport = () => {
    alert(
      language === "hi"
        ? "Contact Support: apni problem aur Kisan Code ke saath support request bhej sakte hain."
        : "Contact Support: you can send a support request with your issue and Kisan Code."
    );
  };

  return (
    <main className={`help-support-page ${isDark ? "dark-mode" : ""}`}>
      <header className="hs-header">
        <button type="button" className="hs-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>{language === "hi" ? "वापस" : "Back"}</span>
        </button>

        <div className="hs-brand">
          <div className="hs-brand-icon"><CircleHelp size={21} /></div>
          <div>
            <strong><span>Farm</span>Buddy</strong>
            <small>{language === "hi" ? "मदद और सहायता" : "Help & Support"}</small>
          </div>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="hs-content">
        <div className="hs-hero">
          <div className="hs-hero-icon"><Headset size={28} /></div>
          <div>
            <p>FARMER SUPPORT</p>
            <h1>{language === "hi" ? "हम आपकी कैसे मदद कर सकते हैं?" : "How can we help you?"}</h1>
            <span>
              {language === "hi"
                ? "अपने सवाल को खोजें और तुरंत संबंधित जवाब देखें।"
                : "Search your question and get the closest matching answer instantly."}
            </span>
          </div>
        </div>

        <div className="hs-search-card">
          <div className="hs-search">
            <Search size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={language === "hi" ? "अपना सवाल लिखें..." : "Ask your question..."}
            />
          </div>

          <div className="hs-category-row">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {language === "hi"
                  ? {
                      "All": "सभी",
                      "Account & Kisan Code": "अकाउंट और किसान कोड",
                      "Booking & Slot": "बुकिंग और स्लॉट",
                      "Procurement Process": "खरीद प्रक्रिया",
                      "Payment": "भुगतान",
                      "Procurement Centre Help": "खरीद केंद्र सहायता",
                      "Complaints": "शिकायतें",
                      "Help & General": "सामान्य सहायता",
                    }[item]
                  : item}
              </button>
            ))}
          </div>
        </div>

        <div className="hs-section-head">
          <div>
            <p>{language === "hi" ? "संबंधित जवाब" : "MATCHING ANSWERS"}</p>
            <h2>
              {query
                ? (language === "hi"
                    ? `${results.length} संबंधित जवाब`
                    : `${results.length} matching answers`)
                : (language === "hi" ? "अपना सवाल खोजें" : "Search your question")}
            </h2>
          </div>
          <span>{faqData.length} {language === "hi" ? "जवाब" : "answers"}</span>
        </div>

        <div className="hs-faq-list">
          {results.map((item) => (
            <div className="hs-faq hs-answer-result" key={item.id}>
              <div className="hs-answer">
                <ShieldCheck size={17} />
                <p>{language === "hi" ? item.hiAnswer : item.answer}</p>
              </div>
            </div>
          ))}

          {!results.length && (
            <div className="hs-no-result">
              <Search size={24} />
              <strong>
                {query
                  ? (language === "hi"
                      ? "संबंधित जवाब नहीं मिला"
                      : "No matching answer found")
                  : (language === "hi"
                      ? "अपना सवाल ऊपर खोजें"
                      : "Search your question above")}
              </strong>
              <span>
                {query
                  ? (language === "hi"
                      ? "सवाल को आसान keywords के साथ दोबारा खोजें या Contact Support का उपयोग करें।"
                      : "Try simpler keywords or use Contact Support.")
                  : (language === "hi"
                      ? "आपके सवालों के जवाब यहां दिखेंगे"
                      : "Answers to your questions will appear here.")}
              </span>
            </div>
          )}
        </div>

        <section className="hs-support-card">
          <div className="hs-support-icon"><MessageCircle size={22} /></div>
          <div>
            <p>{language === "hi" ? "DIDN'T FIND YOUR ANSWER?" : "DIDN'T FIND YOUR ANSWER?"}</p>
            <h2>Contact Support</h2>
            <span>
              {language === "hi"
                ? "Share your problem directly with support."
                : "Share your problem directly with support."}
            </span>
          </div>
          <button type="button" onClick={handleSupport}>
            Contact Support
          </button>
        </section>
      </section>
    </main>
  );
}
