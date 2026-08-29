import React, { useMemo } from "react";
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
    "question": "Kisan Code kya hota hai?",
    "answer": "Kisan Code farmer ki unique identification code hoti hai jisse FarmBuddy par farmer ko identify kiya ja sakta hai.",
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
    "question": "Kisan Code kahan milega?",
    "answer": "Apna Kisan Code registration ke time milne wale official record ya registered procurement details se check karein.",
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
    "question": "Main Kisan Code bhool gaya hoon, kya karun?",
    "answer": "Apne registered mobile number aur official farmer records ke through Kisan Code verify ya recover karne ki process follow karein.",
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
    "question": "Kisan Code galat dikha raha hai, kya karun?",
    "answer": "Code dobara carefully enter karein. Problem continue ho to Contact Support se verification karwayein.",
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
    "question": "Kya mobile number se login kar sakta hoon?",
    "answer": "FarmBuddy login mein registered farmer details aur mobile verification ka use kiya ja sakta hai.",
    "hiAnswer": "FarmBuddy में किसान लॉगिन के लिए पंजीकृत किसान विवरण और मोबाइल सत्यापन का उपयोग किया जाता है।",
    "keywords": [
      "mobile",
      "login"
    ]
  },
  {
    "id": 6,
    "category": "Account & Kisan Code",
    "question": "OTP kya hota hai?",
    "answer": "OTP ek one-time verification code hota hai jo login ya verification ke time registered mobile par milta hai.",
    "hiAnswer": "OTP एक बार इस्तेमाल होने वाला सत्यापन कोड है, जो लॉगिन या सत्यापन के समय पंजीकृत मोबाइल पर मिलता है।",
    "keywords": [
      "otp",
      "one time"
    ]
  },
  {
    "id": 7,
    "category": "Account & Kisan Code",
    "question": "OTP nahi aa raha hai, kya karun?",
    "answer": "Network check karein, kuch seconds wait karke resend karein. Phir bhi problem ho to support se contact karein.",
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
    "question": "OTP kitni baar resend kar sakte hain?",
    "answer": "OTP resend limited attempts ke saath hota hai. Baar-baar request karne par thoda wait karna pad sakta hai.",
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
    "question": "Galat OTP dal diya, kya karun?",
    "answer": "Sahi OTP dobara enter karein ya latest OTP resend karke verify karein.",
    "hiAnswer": "सही OTP दोबारा दर्ज करें या नया OTP भेजकर सत्यापन करें।",
    "keywords": [
      "wrong otp",
      "galat otp"
    ]
  },
  {
    "id": 10,
    "category": "Account & Kisan Code",
    "question": "Mobile number change ho gaya hai, kya karun?",
    "answer": "Registered mobile update ke liye applicable official verification process follow karein ya support se help lein.",
    "hiAnswer": "पंजीकृत मोबाइल अपडेट करने के लिए आधिकारिक सत्यापन प्रक्रिया अपनाएँ या सपोर्ट से सहायता लें।",
    "keywords": [
      "mobile change",
      "number change"
    ]
  },
  {
    "id": 11,
    "category": "Account & Kisan Code",
    "question": "Kya ek mobile se do farmer account login ho sakte hain?",
    "answer": "Account access registered farmer details aur verification par depend karega. Duplicate access ke liye support se verify karein.",
    "hiAnswer": "अकाउंट का एक्सेस पंजीकृत किसान विवरण और सत्यापन पर निर्भर करता है। डुप्लीकेट एक्सेस के लिए सपोर्ट से जाँच करवाएँ।",
    "keywords": [
      "same mobile",
      "two farmer"
    ]
  },
  {
    "id": 12,
    "category": "Account & Kisan Code",
    "question": "Login kyun nahi ho raha hai?",
    "answer": "Kisan Code, mobile number aur required details check karein. OTP bhi sahi enter karein.",
    "hiAnswer": "किसान कोड, मोबाइल नंबर और जरूरी विवरण जाँचें। OTP भी सही दर्ज करें।",
    "keywords": [
      "login problem",
      "login nahi"
    ]
  },
  {
    "id": 13,
    "category": "Account & Kisan Code",
    "question": "Password ki zarurat hai kya?",
    "answer": "Farmer login ka current prototype OTP-based verification use karta hai.",
    "hiAnswer": "वर्तमान किसान लॉगिन प्रोटोटाइप OTP आधारित सत्यापन का उपयोग करता है।",
    "keywords": [
      "password",
      "login"
    ]
  },
  {
    "id": 14,
    "category": "Account & Kisan Code",
    "question": "Kya logout karna zaroori hai?",
    "answer": "Haan, shared ya public device par use ke baad logout karna safer hai.",
    "hiAnswer": "हाँ, साझा या सार्वजनिक डिवाइस इस्तेमाल करने के बाद लॉगआउट करना अधिक सुरक्षित है।",
    "keywords": [
      "logout",
      "security"
    ]
  },
  {
    "id": 15,
    "category": "Account & Kisan Code",
    "question": "Mera account secure kaise rahega?",
    "answer": "OTP kisi ke saath share na karein aur sirf official FarmBuddy access ka use karein.",
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
    "question": "Procurement slot kaise book karein?",
    "answer": "Book New Slot par jaakar crop, quantity, procurement centre, date aur available time select karke booking confirm karein.",
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
    "question": "Slot book karne ke liye kya details chahiye?",
    "answer": "Crop, expected quantity, procurement centre, date aur available time slot select karna hota hai.",
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
    "question": "Kya main booking ke baad details dekh sakta hoon?",
    "answer": "Haan, My Booking section mein confirmed booking details dekhi ja sakti hain.",
    "hiAnswer": "हाँ, My Booking सेक्शन में पुष्टि की गई बुकिंग की जानकारी देख सकते हैं।",
    "keywords": [
      "my booking",
      "booking details"
    ]
  },
  {
    "id": 19,
    "category": "Booking & Slot",
    "question": "Meri booking confirm hui ya nahi kaise pata chalega?",
    "answer": "My Booking ya notification section mein booking status check karein.",
    "hiAnswer": "My Booking या Notification सेक्शन में बुकिंग की स्थिति देखें।",
    "keywords": [
      "confirmed",
      "booking status"
    ]
  },
  {
    "id": 20,
    "category": "Booking & Slot",
    "question": "Kya booking ka date badal sakte hain?",
    "answer": "Date change availability aur current booking rules par depend karega. Applicable option ho to My Booking se update karein.",
    "hiAnswer": "तारीख बदलना उपलब्धता और मौजूदा बुकिंग नियमों पर निर्भर करता है। विकल्प हो तो My Booking से अपडेट करें।",
    "keywords": [
      "date change",
      "reschedule"
    ]
  },
  {
    "id": 21,
    "category": "Booking & Slot",
    "question": "Kya booking cancel kar sakte hain?",
    "answer": "Cancellation available ho to My Booking section se process start karein; otherwise support se contact karein.",
    "hiAnswer": "Cancellation उपलब्ध हो तो My Booking से प्रक्रिया शुरू करें, अन्यथा सपोर्ट से संपर्क करें।",
    "keywords": [
      "cancel",
      "booking cancel"
    ]
  },
  {
    "id": 22,
    "category": "Booking & Slot",
    "question": "Mujhe slot nahi mil raha hai, kya karun?",
    "answer": "Dusri available date ya time slot check karein. Sab slots unavailable hon to baad mein retry karein.",
    "hiAnswer": "दूसरी उपलब्ध तारीख या समय स्लॉट देखें। सभी स्लॉट उपलब्ध न हों तो बाद में फिर प्रयास करें।",
    "keywords": [
      "slot nahi",
      "available slot"
    ]
  },
  {
    "id": 23,
    "category": "Booking & Slot",
    "question": "Ek din mein kitne slot book kar sakta hoon?",
    "answer": "Allowed bookings applicable procurement rules aur system availability par depend karti hain.",
    "hiAnswer": "एक दिन में अनुमत बुकिंग खरीद नियमों और सिस्टम की उपलब्धता पर निर्भर करती हैं।",
    "keywords": [
      "one day",
      "kitne slot"
    ]
  },
  {
    "id": 24,
    "category": "Booking & Slot",
    "question": "Kya booking free hai?",
    "answer": "FarmBuddy prototype mein slot selection ko separate service charge ke bina dikhaya gaya hai; actual charges applicable policy par depend karte hain.",
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
    "question": "Quantity galat bhar di ho to kya karun?",
    "answer": "Confirmation se pehle quantity verify karein. Confirmed booking mein correction option available ho to use karein.",
    "hiAnswer": "पुष्टि से पहले मात्रा जाँचें। पुष्टि की गई बुकिंग में सुधार विकल्प हो तो उसका उपयोग करें।",
    "keywords": [
      "quantity",
      "galat quantity"
    ]
  },
  {
    "id": 26,
    "category": "Booking & Slot",
    "question": "Kya quantity baad mein badal sakte hain?",
    "answer": "Confirmed booking mein quantity change availability system ke rules par depend karega.",
    "hiAnswer": "पुष्टि की गई बुकिंग में मात्रा बदलना सिस्टम के नियमों पर निर्भर करेगा।",
    "keywords": [
      "quantity change"
    ]
  },
  {
    "id": 27,
    "category": "Booking & Slot",
    "question": "Crop kaise select karun?",
    "answer": "Apni actual procured crop select karein, jaise Wheat, Soybean, Maize ya Mustard.",
    "hiAnswer": "अपनी वास्तविक खरीद वाली फसल चुनें, जैसे गेहूँ, सोयाबीन, मक्का या सरसों।",
    "keywords": [
      "crop select",
      "crop"
    ]
  },
  {
    "id": 28,
    "category": "Booking & Slot",
    "question": "Galat crop select ho gaya, kya karun?",
    "answer": "Booking confirm karne se pehle correct crop select karein. Confirmed booking mein correction option ho to use karein.",
    "hiAnswer": "बुकिंग की पुष्टि से पहले सही फसल चुनें। पुष्टि की गई बुकिंग में सुधार विकल्प हो तो उसका उपयोग करें।",
    "keywords": [
      "wrong crop",
      "crop change"
    ]
  },
  {
    "id": 29,
    "category": "Booking & Slot",
    "question": "Procurement centre kaise choose karun?",
    "answer": "Centre search karke available list se apne relevant procurement centre ko select karein.",
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
    "question": "Kya main nearby procurement centre dekh sakta hoon?",
    "answer": "Centre list mein available procurement centres search karke relevant centre choose kiya ja sakta hai.",
    "hiAnswer": "उपलब्ध खरीद केंद्रों की सूची में खोज करके अपने लिए सही केंद्र चुनें।",
    "keywords": [
      "nearby",
      "centre"
    ]
  },
  {
    "id": 31,
    "category": "Booking & Slot",
    "question": "Date select karne par kya karna hai?",
    "answer": "Calendar se required available date select karein aur phir available time slot choose karein.",
    "hiAnswer": "कैलेंडर से उपलब्ध तारीख चुनें और फिर उपलब्ध समय स्लॉट चुनें।",
    "keywords": [
      "date select",
      "calendar"
    ]
  },
  {
    "id": 32,
    "category": "Booking & Slot",
    "question": "Kya past date select kar sakte hain?",
    "answer": "Past date ko booking ke liye select nahi karna chahiye. Available future date choose karein.",
    "hiAnswer": "खरीद के लिए पिछली तारीख नहीं चुननी चाहिए। उपलब्ध भविष्य की तारीख चुनें।",
    "keywords": [
      "past date",
      "old date"
    ]
  },
  {
    "id": 33,
    "category": "Booking & Slot",
    "question": "Time slot full dikhe to kya matlab hai?",
    "answer": "Us time slot ki current availability complete ho chuki hai.",
    "hiAnswer": "इसका मतलब है कि उस समय स्लॉट की उपलब्ध क्षमता पूरी हो चुकी है।",
    "keywords": [
      "full",
      "time slot"
    ]
  },
  {
    "id": 34,
    "category": "Booking & Slot",
    "question": "Kya booking confirmation ke baad token milta hai?",
    "answer": "Confirmed booking ke saath token/queue information available ho sakti hai.",
    "hiAnswer": "पुष्टि की गई बुकिंग के साथ टोकन या कतार की जानकारी उपलब्ध हो सकती है।",
    "keywords": [
      "token",
      "booking confirmation"
    ]
  },
  {
    "id": 35,
    "category": "Booking & Slot",
    "question": "Booking karne ke baad centre kab jana hai?",
    "answer": "Confirmed booking mein selected date aur time slot ke according centre par pahunchna chahiye.",
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
    "question": "Procurement centre par kya hota hai?",
    "answer": "Farmer crop lekar centre par aata hai, jahan verification, weighing/quantity recording aur procurement process complete kiya ja sakta hai.",
    "hiAnswer": "किसान फसल लेकर केंद्र पर आता है, जहाँ सत्यापन, वजन/मात्रा दर्ज करना और खरीद प्रक्रिया पूरी की जाती है।",
    "keywords": [
      "procurement centre",
      "process"
    ]
  },
  {
    "id": 37,
    "category": "Procurement Process",
    "question": "Centre par kya lekar jana chahiye?",
    "answer": "Required farmer identification, booking/token details aur procured crop se related required documents saath rakhein.",
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
    "question": "Token number ka kya use hai?",
    "answer": "Token/queue number farmer ki turn aur current queue position samajhne mein madad karta hai.",
    "hiAnswer": "टोकन या कतार नंबर किसान की बारी और वर्तमान कतार स्थिति समझने में मदद करता है।",
    "keywords": [
      "token",
      "queue"
    ]
  },
  {
    "id": 39,
    "category": "Procurement Process",
    "question": "Token queue kaise check karun?",
    "answer": "Token & Queue section mein current token aur queue position check karein.",
    "hiAnswer": "Token & Queue सेक्शन में वर्तमान टोकन और कतार की स्थिति देखें।",
    "keywords": [
      "queue",
      "token queue"
    ]
  },
  {
    "id": 40,
    "category": "Procurement Process",
    "question": "Meri procurement pending kyun hai?",
    "answer": "Centre workload, verification, weighing ya processing stage ki wajah se procurement pending ho sakti hai.",
    "hiAnswer": "केंद्र का काम, सत्यापन, वजन या प्रोसेसिंग की स्थिति के कारण खरीद लंबित हो सकती है।",
    "keywords": [
      "pending",
      "procurement pending"
    ]
  },
  {
    "id": 41,
    "category": "Procurement Process",
    "question": "Procurement complete hone ka matlab kya hai?",
    "answer": "Iska matlab centre ne current procurement transaction ko completion status mein mark kar diya hai.",
    "hiAnswer": "इसका मतलब है कि केंद्र ने वर्तमान खरीद लेन-देन को पूर्ण स्थिति में दर्ज कर दिया है।",
    "keywords": [
      "completed",
      "procurement complete"
    ]
  },
  {
    "id": 42,
    "category": "Procurement Process",
    "question": "Centre par waiting time kitna hota hai?",
    "answer": "Waiting time centre workload, queue aur daily activity par depend karta hai.",
    "hiAnswer": "प्रतीक्षा समय केंद्र के काम, कतार और दैनिक गतिविधि पर निर्भर करता है।",
    "keywords": [
      "waiting time",
      "wait"
    ]
  },
  {
    "id": 43,
    "category": "Procurement Process",
    "question": "Kya booking karne ke baad bhi wait karna pad sakta hai?",
    "answer": "Haan, centre par queue aur daily workload ke according waiting ho sakti hai.",
    "hiAnswer": "हाँ, केंद्र की कतार और दैनिक काम के अनुसार प्रतीक्षा करनी पड़ सकती है।",
    "keywords": [
      "wait",
      "booking"
    ]
  },
  {
    "id": 44,
    "category": "Procurement Process",
    "question": "Kya bina booking ke procurement ho sakti hai?",
    "answer": "Ye centre ke applicable process aur availability par depend karega. Scheduled slot follow karna recommended hai.",
    "hiAnswer": "यह केंद्र की लागू प्रक्रिया और उपलब्धता पर निर्भर करता है। निर्धारित स्लॉट का पालन करना बेहतर है।",
    "keywords": [
      "without booking",
      "bina booking"
    ]
  },
  {
    "id": 45,
    "category": "Procurement Process",
    "question": "Procurement ke baad kya milta hai?",
    "answer": "Procurement record/confirmation aur applicable payment processing information system mein update ki ja sakti hai.",
    "hiAnswer": "खरीद पूरी होने के बाद खरीद रिकॉर्ड/पुष्टि और लागू भुगतान प्रक्रिया की जानकारी अपडेट की जा सकती है।",
    "keywords": [
      "after procurement",
      "record"
    ]
  },
  {
    "id": 46,
    "category": "Procurement Process",
    "question": "Kya farmer ko receipt milti hai?",
    "answer": "Procurement completion ke baad applicable record ya receipt process centre/system workflow par depend karta hai.",
    "hiAnswer": "खरीद पूरी होने के बाद रसीद या रिकॉर्ड केंद्र और सिस्टम की प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "receipt",
      "procurement"
    ]
  },
  {
    "id": 47,
    "category": "Procurement Process",
    "question": "Meri crop accept nahi hui, kyun?",
    "answer": "Quality, quantity, documentation ya applicable procurement criteria ke reasons ho sakte hain. Exact reason centre se verify karein.",
    "hiAnswer": "गुणवत्ता, मात्रा, दस्तावेज या लागू खरीद मानकों के कारण हो सकते हैं। सही कारण केंद्र से पता करें।",
    "keywords": [
      "crop reject",
      "accept nahi"
    ]
  },
  {
    "id": 48,
    "category": "Procurement Process",
    "question": "Quality checking kya hoti hai?",
    "answer": "Crop ko applicable quality parameters ke according check kiya ja sakta hai.",
    "hiAnswer": "फसल को लागू गुणवत्ता मानकों के अनुसार जाँचा जा सकता है।",
    "keywords": [
      "quality check",
      "quality"
    ]
  },
  {
    "id": 49,
    "category": "Procurement Process",
    "question": "Quality mein problem aaye to kya karun?",
    "answer": "Centre se exact issue samjhein aur zarurat par Farmer Complaint section se complaint raise karein.",
    "hiAnswer": "केंद्र से समस्या का सही कारण समझें और जरूरत होने पर Farmer Complaint से शिकायत दर्ज करें।",
    "keywords": [
      "quality problem",
      "complaint"
    ]
  },
  {
    "id": 50,
    "category": "Procurement Process",
    "question": "Weighing ke time kya check karna chahiye?",
    "answer": "Recorded quantity aur displayed/recorded weight ko carefully verify karein.",
    "hiAnswer": "दर्ज की गई मात्रा और दिखाए/दर्ज किए गए वजन को ध्यान से जाँचें।",
    "keywords": [
      "weighing",
      "weight check"
    ]
  },
  {
    "id": 51,
    "category": "Procurement Process",
    "question": "Quantity kam record hui to kya karun?",
    "answer": "Centre par recorded quantity verify karayein. Issue solve na ho to weighing/quantity complaint raise karein.",
    "hiAnswer": "केंद्र पर दर्ज मात्रा की जाँच करवाएँ। समस्या हल न हो तो वजन/मात्रा से जुड़ी शिकायत करें।",
    "keywords": [
      "quantity kam",
      "weight less"
    ]
  },
  {
    "id": 52,
    "category": "Procurement Process",
    "question": "Kya main procurement status dekh sakta hoon?",
    "answer": "Haan, My Booking, relevant status screens ya available procurement updates se status check kiya ja sakta hai.",
    "hiAnswer": "हाँ, My Booking, संबंधित स्टेटस स्क्रीन या उपलब्ध खरीद अपडेट से स्थिति देखी जा सकती है।",
    "keywords": [
      "procurement status"
    ]
  },
  {
    "id": 53,
    "category": "Procurement Process",
    "question": "Centre band ho to kya karun?",
    "answer": "Centre status check karein aur available alternative centre/date ke liye support se contact karein.",
    "hiAnswer": "केंद्र की स्थिति देखें और वैकल्पिक केंद्र/तारीख के लिए सपोर्ट से संपर्क करें।",
    "keywords": [
      "centre closed",
      "band"
    ]
  },
  {
    "id": 54,
    "category": "Procurement Process",
    "question": "Centre par staff se baat nahi ho rahi, kya karun?",
    "answer": "Centre help/contact option use karein ya Contact Support ke through issue report karein.",
    "hiAnswer": "केंद्र का Help/Contact विकल्प इस्तेमाल करें या Contact Support से समस्या बताएँ।",
    "keywords": [
      "staff",
      "contact centre"
    ]
  },
  {
    "id": 55,
    "category": "Procurement Process",
    "question": "Procurement process mein problem aaye to kisko batayein?",
    "answer": "Sabse pehle relevant procurement centre staff se verify karein; unresolved issue ke liye complaint ya support use karein.",
    "hiAnswer": "पहले संबंधित खरीद केंद्र के स्टाफ से जाँच करें। समस्या हल न हो तो शिकायत या सपोर्ट का उपयोग करें।",
    "keywords": [
      "problem",
      "support"
    ]
  },
  {
    "id": 56,
    "category": "Payment",
    "question": "Payment status kaise check karun?",
    "answer": "Payment section mein available payment status aur related information check karein.",
    "hiAnswer": "Payment सेक्शन में उपलब्ध भुगतान स्थिति और संबंधित जानकारी देखें।",
    "keywords": [
      "payment status",
      "payment"
    ]
  },
  {
    "id": 57,
    "category": "Payment",
    "question": "Payment kab aayega?",
    "answer": "Payment timing actual procurement completion aur applicable payment processing par depend karti hai.",
    "hiAnswer": "भुगतान का समय वास्तविक खरीद पूरी होने और भुगतान प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "payment kab",
      "payment"
    ]
  },
  {
    "id": 58,
    "category": "Payment",
    "question": "Payment pending kyun hai?",
    "answer": "Verification, procurement completion ya payment processing ke kaaran status pending ho sakta hai.",
    "hiAnswer": "सत्यापन, खरीद पूरी होने या भुगतान प्रक्रिया के कारण भुगतान लंबित हो सकता है।",
    "keywords": [
      "payment pending"
    ]
  },
  {
    "id": 59,
    "category": "Payment",
    "question": "Procurement complete hai lekin payment update nahi hua, kya karun?",
    "answer": "Procurement record verify karein. Payment update na ho to payment-related complaint raise karein.",
    "hiAnswer": "खरीद रिकॉर्ड की जाँच करें। भुगतान अपडेट न हो तो भुगतान से जुड़ी शिकायत करें।",
    "keywords": [
      "payment not updated",
      "complete"
    ]
  },
  {
    "id": 60,
    "category": "Payment",
    "question": "Payment amount galat lag raha hai to kya karun?",
    "answer": "Transaction details verify karein aur issue continue hone par payment complaint raise karein.",
    "hiAnswer": "लेन-देन की जानकारी जाँचें और समस्या बनी रहे तो भुगतान संबंधी शिकायत करें।",
    "keywords": [
      "wrong payment",
      "amount"
    ]
  },
  {
    "id": 61,
    "category": "Payment",
    "question": "Bank account details kaise check karein?",
    "answer": "Payment issue ho to registered bank information applicable official records ke through verify karein.",
    "hiAnswer": "भुगतान समस्या होने पर पंजीकृत बैंक जानकारी को आधिकारिक रिकॉर्ड से सत्यापित करें।",
    "keywords": [
      "bank",
      "account"
    ]
  },
  {
    "id": 62,
    "category": "Payment",
    "question": "Bank account change ho gaya hai, kya karun?",
    "answer": "Bank detail update ke liye applicable official verification/update process follow karein.",
    "hiAnswer": "बैंक विवरण बदलने के लिए लागू आधिकारिक सत्यापन/अपडेट प्रक्रिया अपनाएँ।",
    "keywords": [
      "bank change",
      "account change"
    ]
  },
  {
    "id": 63,
    "category": "Payment",
    "question": "Payment fail ho gaya to kya karun?",
    "answer": "Payment status dobara check karein aur required bank/transaction verification ke baad support se contact karein.",
    "hiAnswer": "भुगतान स्थिति दोबारा जाँचें और बैंक/लेन-देन सत्यापन के बाद सपोर्ट से संपर्क करें।",
    "keywords": [
      "payment failed"
    ]
  },
  {
    "id": 64,
    "category": "Payment",
    "question": "Kya payment history dekh sakta hoon?",
    "answer": "Payment/transaction section mein available history check ki ja sakti hai.",
    "hiAnswer": "Payment या Transaction सेक्शन में उपलब्ध भुगतान इतिहास देखा जा सकता है।",
    "keywords": [
      "payment history"
    ]
  },
  {
    "id": 65,
    "category": "Payment",
    "question": "Payment ke liye Kisan Code important hai kya?",
    "answer": "Farmer identification aur transaction mapping ke liye Kisan Code relevant ho sakta hai.",
    "hiAnswer": "किसान की पहचान और लेन-देन को जोड़ने के लिए किसान कोड उपयोगी हो सकता है।",
    "keywords": [
      "payment",
      "kisan code"
    ]
  },
  {
    "id": 66,
    "category": "Payment",
    "question": "Payment related complaint kaise karun?",
    "answer": "Farmer Complaints mein complaint type 'Payment related' select karke issue details submit karein.",
    "hiAnswer": "Farmer Complaints में 'Payment related' शिकायत प्रकार चुनकर समस्या दर्ज करें।",
    "keywords": [
      "payment complaint"
    ]
  },
  {
    "id": 67,
    "category": "Payment",
    "question": "Payment receipt nahi mili to kya karun?",
    "answer": "Available transaction details check karein aur support se receipt/record verification karwayein.",
    "hiAnswer": "लेन-देन की जानकारी जाँचें और रसीद/रिकॉर्ड सत्यापन के लिए सपोर्ट से संपर्क करें।",
    "keywords": [
      "receipt",
      "payment"
    ]
  },
  {
    "id": 68,
    "category": "Payment",
    "question": "Payment kis account mein aata hai?",
    "answer": "Payment registered/verified bank account details ke according process kiya ja sakta hai.",
    "hiAnswer": "भुगतान पंजीकृत या सत्यापित बैंक खाते के अनुसार किया जा सकता है।",
    "keywords": [
      "which account",
      "bank"
    ]
  },
  {
    "id": 69,
    "category": "Payment",
    "question": "Kya cash payment milta hai?",
    "answer": "Payment mode applicable official process par depend karta hai; app mein available payment information check karein.",
    "hiAnswer": "भुगतान का तरीका लागू आधिकारिक प्रक्रिया पर निर्भर करता है। ऐप में उपलब्ध जानकारी देखें।",
    "keywords": [
      "cash",
      "payment mode"
    ]
  },
  {
    "id": 70,
    "category": "Payment",
    "question": "Payment issue resolve hone mein kitna time lagta hai?",
    "answer": "Resolution time issue type aur verification process par depend karta hai.",
    "hiAnswer": "समस्या का समाधान समय शिकायत के प्रकार और सत्यापन प्रक्रिया पर निर्भर करता है।",
    "keywords": [
      "payment issue",
      "time"
    ]
  },
  {
    "id": 71,
    "category": "Procurement Centre Help",
    "question": "Procurement centre ka address kaise pata chalega?",
    "answer": "Procurement Centres section ya booking centre list se centre location/details check karein.",
    "hiAnswer": "Procurement Centres सेक्शन या बुकिंग की केंद्र सूची से केंद्र का स्थान/पता देखें।",
    "keywords": [
      "address",
      "centre location"
    ]
  },
  {
    "id": 72,
    "category": "Procurement Centre Help",
    "question": "Centre ka contact number kahan milega?",
    "answer": "Centre details mein available contact/help information check karein.",
    "hiAnswer": "केंद्र की जानकारी में उपलब्ध Contact/Help विवरण देखें।",
    "keywords": [
      "contact number",
      "centre contact"
    ]
  },
  {
    "id": 73,
    "category": "Procurement Centre Help",
    "question": "Mujhe centre ki working status dekhni hai.",
    "answer": "Available centre status/operational information se Active ya Inactive status check karein.",
    "hiAnswer": "उपलब्ध केंद्र स्थिति में Active या Inactive स्थिति देखें।",
    "keywords": [
      "working status",
      "active inactive"
    ]
  },
  {
    "id": 74,
    "category": "Procurement Centre Help",
    "question": "Centre par aaj procurement ho rahi hai ya nahi kaise pata chalega?",
    "answer": "Centre status aur current procurement activity updates check karein.",
    "hiAnswer": "केंद्र की स्थिति और वर्तमान खरीद गतिविधि के अपडेट देखें।",
    "keywords": [
      "today procurement",
      "centre status"
    ]
  },
  {
    "id": 75,
    "category": "Procurement Centre Help",
    "question": "Mere paas wrong centre select ho gaya hai.",
    "answer": "Booking confirmation se pehle correct centre select karein; confirmed booking mein applicable correction process follow karein.",
    "hiAnswer": "बुकिंग की पुष्टि से पहले सही केंद्र चुनें। पुष्टि के बाद उपलब्ध सुधार प्रक्रिया अपनाएँ।",
    "keywords": [
      "wrong centre",
      "centre change"
    ]
  },
  {
    "id": 76,
    "category": "Procurement Centre Help",
    "question": "Mera selected centre bahut door hai.",
    "answer": "Available procurement centres mein location compare karke relevant centre choose karein.",
    "hiAnswer": "उपलब्ध खरीद केंद्रों की जगह की तुलना करके उपयुक्त केंद्र चुनें।",
    "keywords": [
      "far centre",
      "door"
    ]
  },
  {
    "id": 77,
    "category": "Procurement Centre Help",
    "question": "Centre mein weighing machine problem ho to kya karun?",
    "answer": "Centre staff ko inform karein aur weighing/quantity related complaint raise karein.",
    "hiAnswer": "केंद्र के स्टाफ को बताएँ और वजन/मात्रा से जुड़ी शिकायत दर्ज करें।",
    "keywords": [
      "weighing machine",
      "machine problem"
    ]
  },
  {
    "id": 78,
    "category": "Procurement Centre Help",
    "question": "Centre par queue bahut lambi hai.",
    "answer": "Current token/queue status check karein aur centre staff se expected waiting time verify karein.",
    "hiAnswer": "वर्तमान टोकन/कतार स्थिति देखें और केंद्र स्टाफ से अनुमानित प्रतीक्षा समय पूछें।",
    "keywords": [
      "long queue",
      "queue"
    ]
  },
  {
    "id": 79,
    "category": "Procurement Centre Help",
    "question": "Centre staff ne meri complaint nahi suni.",
    "answer": "Complaint details record karke Farmer Complaints ke through admin ko issue submit karein.",
    "hiAnswer": "शिकायत का विवरण दर्ज करके Farmer Complaints के माध्यम से एडमिन को समस्या भेजें।",
    "keywords": [
      "staff complaint",
      "complaint"
    ]
  },
  {
    "id": 80,
    "category": "Procurement Centre Help",
    "question": "Centre inactive kyun dikh raha hai?",
    "answer": "Centre temporary operational issue, schedule ya administrative status ke kaaran inactive ho sakta hai. Support se verify karein.",
    "hiAnswer": "केंद्र अस्थायी समस्या, शेड्यूल या प्रशासनिक स्थिति के कारण Inactive हो सकता है। सपोर्ट से पुष्टि करें।",
    "keywords": [
      "inactive centre"
    ]
  },
  {
    "id": 81,
    "category": "Complaints",
    "question": "Complaint kaise raise karun?",
    "answer": "Farmer Dashboard ke Complaint section se complaint type, centre aur description enter karke submit karein.",
    "hiAnswer": "Farmer Dashboard के Complaint सेक्शन में शिकायत प्रकार, केंद्र और विवरण भरकर शिकायत भेजें।",
    "keywords": [
      "complaint",
      "raise"
    ]
  },
  {
    "id": 82,
    "category": "Complaints",
    "question": "Complaint ka status kaise check karun?",
    "answer": "Complaint section mein submitted complaints aur unka current status check kiya ja sakta hai.",
    "hiAnswer": "Complaint सेक्शन में भेजी गई शिकायत और उसकी वर्तमान स्थिति देखें।",
    "keywords": [
      "complaint status"
    ]
  },
  {
    "id": 83,
    "category": "Complaints",
    "question": "Complaint status Pending ka matlab kya hai?",
    "answer": "Complaint receive ho gayi hai aur abhi detailed action start nahi hua hai.",
    "hiAnswer": "इसका मतलब है कि शिकायत मिल गई है और अभी उस पर विस्तृत कार्रवाई शुरू नहीं हुई है।",
    "keywords": [
      "pending complaint"
    ]
  },
  {
    "id": 84,
    "category": "Complaints",
    "question": "In Progress ka matlab kya hai?",
    "answer": "Admin/concerned team complaint ko review ya resolve karne par kaam kar rahi hai.",
    "hiAnswer": "इसका मतलब है कि एडमिन या संबंधित टीम शिकायत की जाँच/समाधान पर काम कर रही है।",
    "keywords": [
      "in progress"
    ]
  },
  {
    "id": 85,
    "category": "Complaints",
    "question": "Resolved ka matlab kya hai?",
    "answer": "Complaint par action/resolution record ho gaya hai aur issue ko resolved mark kiya gaya hai.",
    "hiAnswer": "इसका मतलब है कि शिकायत पर कार्रवाई/समाधान दर्ज हो गया है और उसे Resolved किया गया है।",
    "keywords": [
      "resolved complaint"
    ]
  },
  {
    "id": 86,
    "category": "Complaints",
    "question": "Kaunsi complaint types available hain?",
    "answer": "Procurement Centre related, Weighing / Quantity related, Payment related, Quality related aur Other.",
    "hiAnswer": "Procurement Centre related, Weighing/Quantity related, Payment related, Quality related और Other शिकायत प्रकार उपलब्ध हैं।",
    "keywords": [
      "complaint type",
      "types"
    ]
  },
  {
    "id": 87,
    "category": "Complaints",
    "question": "Complaint description mein kya likhna chahiye?",
    "answer": "Problem ko simple details mein likhein: kya hua, kis centre par hua, kab hua aur issue kya hai.",
    "hiAnswer": "क्या हुआ, किस केंद्र पर हुआ, कब हुआ और समस्या क्या है—इन बातों को सरल शब्दों में लिखें।",
    "keywords": [
      "description",
      "complaint"
    ]
  },
  {
    "id": 88,
    "category": "Complaints",
    "question": "Kya complaint ke saath Kisan Code dena hota hai?",
    "answer": "Haan, farmer identification aur complaint verification ke liye Kisan Code useful hai.",
    "hiAnswer": "किसान की पहचान और शिकायत सत्यापन के लिए किसान कोड उपयोगी है।",
    "keywords": [
      "kisan code",
      "complaint"
    ]
  },
  {
    "id": 89,
    "category": "Complaints",
    "question": "Complaint kitne time mein resolve hogi?",
    "answer": "Resolution time complaint ki type aur verification/action par depend karta hai.",
    "hiAnswer": "समाधान का समय शिकायत के प्रकार और जाँच/कार्रवाई पर निर्भर करता है।",
    "keywords": [
      "resolve time",
      "complaint"
    ]
  },
  {
    "id": 90,
    "category": "Complaints",
    "question": "Complaint resolve nahi hui to kya karun?",
    "answer": "Complaint status check karein aur required action/resolution details ke saath Contact Support use karein.",
    "hiAnswer": "शिकायत की स्थिति देखें और जरूरी कार्रवाई/समाधान के विवरण के साथ Contact Support का उपयोग करें।",
    "keywords": [
      "not resolved",
      "support"
    ]
  },
  {
    "id": 91,
    "category": "Help & General",
    "question": "FarmBuddy mein Help & Support kya hai?",
    "answer": "Help & Support section common questions, process guidance aur support contact options provide karta hai.",
    "hiAnswer": "Help & Support सेक्शन सामान्य सवालों, प्रक्रिया की जानकारी और सपोर्ट संपर्क की सुविधा देता है।",
    "keywords": [
      "help support"
    ]
  },
  {
    "id": 92,
    "category": "Help & General",
    "question": "FAQ kya hota hai?",
    "answer": "FAQ ka matlab Frequently Asked Questions hai, jahan common questions ke ready answers milte hain.",
    "hiAnswer": "FAQ का मतलब Frequently Asked Questions है, जहाँ सामान्य सवालों के तैयार जवाब मिलते हैं।",
    "keywords": [
      "faq"
    ]
  },
  {
    "id": 93,
    "category": "Help & General",
    "question": "Main apna question search kar sakta hoon?",
    "answer": "Haan, Help & Support mein apna question type karke matching FAQ answer search kar sakte hain.",
    "hiAnswer": "हाँ, Help & Support में अपना सवाल लिखकर उससे मिलता-जुलता FAQ उत्तर खोज सकते हैं।",
    "keywords": [
      "search question",
      "question"
    ]
  },
  {
    "id": 94,
    "category": "Help & General",
    "question": "Agar mera exact question list mein nahi hai to?",
    "answer": "Question ko simple keywords ke saath search karein. Matching answer na mile to Contact Support use karein.",
    "hiAnswer": "सवाल को आसान keywords के साथ खोजें। जवाब न मिले तो Contact Support का उपयोग करें।",
    "keywords": [
      "question not found",
      "support"
    ]
  },
  {
    "id": 95,
    "category": "Help & General",
    "question": "Kya Hindi mein help mil sakti hai?",
    "answer": "FarmBuddy language selection ke according Hindi/English interface aur guidance provide kar sakta hai.",
    "hiAnswer": "हाँ, भाषा बदलने पर FarmBuddy में हिंदी/अंग्रेजी इंटरफेस और सहायता दिखाई जा सकती है।",
    "keywords": [
      "hindi",
      "language help"
    ]
  },
  {
    "id": 96,
    "category": "Help & General",
    "question": "Contact Support kya hai?",
    "answer": "Contact Support option se farmer apni unresolved problem ke liye support team ko request bhej sakta hai.",
    "hiAnswer": "Contact Support विकल्प से किसान अपनी समस्या के लिए सपोर्ट टीम को अनुरोध भेज सकता है।",
    "keywords": [
      "contact support"
    ]
  },
  {
    "id": 97,
    "category": "Help & General",
    "question": "Support ko kya details deni chahiye?",
    "answer": "Kisan Code, procurement centre, issue type aur short problem description dena helpful hota hai.",
    "hiAnswer": "किसान कोड, खरीद केंद्र, समस्या का प्रकार और समस्या का छोटा विवरण देना उपयोगी है।",
    "keywords": [
      "support details"
    ]
  },
  {
    "id": 98,
    "category": "Help & General",
    "question": "Kya mujhe complaint aur support mein se kya use karna chahiye?",
    "answer": "Specific issue record karna ho to Complaint use karein; general guidance ya unresolved help ke liye Help & Support use karein.",
    "hiAnswer": "विशिष्ट समस्या दर्ज करनी हो तो Complaint का उपयोग करें; सामान्य सहायता के लिए Help & Support इस्तेमाल करें।",
    "keywords": [
      "complaint or support"
    ]
  },
  {
    "id": 99,
    "category": "Help & General",
    "question": "App mein information update nahi ho rahi hai.",
    "answer": "Internet connection check karein, page refresh/reopen karein aur issue continue ho to support se contact karein.",
    "hiAnswer": "इंटरनेट कनेक्शन जाँचें, पेज रिफ्रेश/दोबारा खोलें और समस्या बनी रहे तो सपोर्ट से संपर्क करें।",
    "keywords": [
      "update",
      "refresh"
    ]
  },
  {
    "id": 100,
    "category": "Help & General",
    "question": "FarmBuddy mein problem report karne ka best tarika kya hai?",
    "answer": "Issue specific ho to Complaint raise karein; general assistance ke liye Help & Support ke Contact Support option ka use karein.",
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

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

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
                ? "अपने सवाल को search करें और matching answer तुरंत देखें।"
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
            <p>{language === "hi" ? "ANSWER NAHI MILA?" : "DIDN'T FIND YOUR ANSWER?"}</p>
            <h2>Contact Support</h2>
            <span>
              {language === "hi"
                ? "Apni problem directly support ke saath share karein."
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
