import { CalendarDays, CheckCircle2, Clock3, Search, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./TransactionHistory.css";

function TransactionHistory({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const isHindi = language === "hi";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const transactions = [
    { id:"TXN-1001",date:"28 Aug 2026",farmer:"Ramesh Patel",code:"KC10245",crop:"Wheat",qty:25,token:27,amount:"₹57,500",payment:"Paid",status:"Completed" },
    { id:"TXN-1002",date:"28 Aug 2026",farmer:"Suresh Verma",code:"KC10418",crop:"Wheat",qty:18,token:28,amount:"₹41,400",payment:"Paid",status:"Completed" },
    { id:"TXN-1003",date:"28 Aug 2026",farmer:"Mohan Singh",code:"KC10632",crop:"Soybean",qty:20,token:29,amount:"₹96,000",payment:"Pending",status:"Pending" },
    { id:"TXN-1004",date:"27 Aug 2026",farmer:"Rajesh Yadav",code:"KC10871",crop:"Wheat",qty:30,token:30,amount:"₹69,000",payment:"Paid",status:"Completed" },
    { id:"TXN-1005",date:"27 Aug 2026",farmer:"Anil Sharma",code:"KC11024",crop:"Soybean",qty:22,token:31,amount:"₹1,05,600",payment:"Paid",status:"Completed" },
    { id:"TXN-1006",date:"27 Aug 2026",farmer:"Deepak Meena",code:"KC11209",crop:"Wheat",qty:28,token:32,amount:"₹64,400",payment:"Pending",status:"Pending" },
    { id:"TXN-1007",date:"26 Aug 2026",farmer:"Vijay Solanki",code:"KC11456",crop:"Maize",qty:24,token:33,amount:"₹52,800",payment:"Paid",status:"Completed" },
    { id:"TXN-1008",date:"26 Aug 2026",farmer:"Sunil Chouhan",code:"KC11673",crop:"Wheat",qty:19,token:34,amount:"₹43,700",payment:"Cancelled",status:"Cancelled" },
    { id:"TXN-1009",date:"25 Aug 2026",farmer:"Arjun Verma",code:"KC11842",crop:"Soybean",qty:26,token:35,amount:"₹1,24,800",payment:"Paid",status:"Completed" },
    { id:"TXN-1010",date:"25 Aug 2026",farmer:"Manoj Patel",code:"KC12018",crop:"Wheat",qty:21,token:36,amount:"₹48,300",payment:"Paid",status:"Completed" },
  ];

  const filtered=useMemo(()=>{
    const q=search.trim().toLowerCase();
    return transactions.filter(t =>
      (!q || `${t.id} ${t.farmer} ${t.code} ${t.crop} ${t.token}`.toLowerCase().includes(q)) &&
      (statusFilter==="All" || t.status===statusFilter) &&
      (dateFilter==="All" || (dateFilter==="Today" && t.date==="28 Aug 2026") || (dateFilter==="Previous" && t.date!=="28 Aug 2026"))
    );
  },[search,statusFilter,dateFilter]);

  const totalQty=transactions.reduce((s,t)=>s+t.qty,0);

  return <main className={`transaction-page ${isDark?"dark-mode":""}`}>
    <header className="transaction-header">
      <button type="button" className="transaction-back" onClick={onBack}>←</button>
      <div className="transaction-brand"><CalendarDays size={21}/><div><strong>FarmBuddy</strong><span>{isHindi?"प्रोक्योरमेंट केंद्र":"Procurement Centre"}</span></div></div>
    </header>
    <section className="transaction-content">
      <div className="transaction-heading">
        <div><p>{isHindi?"लेन-देन इतिहास":"TRANSACTION HISTORY"}</p><h1>{isHindi?"प्रोक्योरमेंट हिस्ट्री":"Procurement History"}</h1><span>{isHindi?"किसान-वार सभी प्रोक्योरमेंट रिकॉर्ड":"Farmer-wise procurement transaction records"}</span></div>
        <div className="transaction-summary"><div><strong>{transactions.length}</strong><span>Transactions</span></div><div><strong>{totalQty}</strong><span>Qtl</span></div></div>
      </div>
      <div className="transaction-filters">
        <div className="transaction-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search farmer, Kisan Code or Token..."/></div>
        <select value={dateFilter} onChange={e=>setDateFilter(e.target.value)}><option value="All">All Dates</option><option value="Today">Today</option><option value="Previous">Previous Days</option></select>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="All">All Status</option><option value="Completed">Completed</option><option value="Pending">Pending</option><option value="Cancelled">Cancelled</option></select>
      </div>
      <div className="transaction-card"><div className="transaction-table-wrap"><table className="transaction-table">
        <thead><tr><th>Transaction</th><th>Date</th><th>Farmer</th><th>Crop</th><th>Qty</th><th>Token</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
        <tbody>{filtered.map(t=><tr key={t.id}><td><strong className="txn-id">{t.id}</strong></td><td>{t.date}</td><td><strong>{t.farmer}</strong><small>{t.code}</small></td><td>{t.crop}</td><td><strong>{t.qty} Qtl</strong></td><td>#{t.token}</td><td><strong>{t.amount}</strong></td><td>{t.payment}</td><td><span className={`txn-status ${t.status.toLowerCase()}`}>{t.status==="Completed"?<CheckCircle2 size={12}/>:t.status==="Pending"?<Clock3 size={12}/>:<XCircle size={12}/>} {t.status}</span></td></tr>)}</tbody>
      </table>{filtered.length===0&&<div className="transaction-empty">No transaction found.</div>}</div></div>
    </section>
  </main>;
}
export default TransactionHistory;
