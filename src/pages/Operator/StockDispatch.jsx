import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Package,
  Truck,
  Warehouse,
  Wheat,
  XCircle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";
import "./StockDispatch.css";

function StockDispatch({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [dispatches, setDispatches] = useState([
    { id: "DSP-1025", crop: "Wheat", quantity: "250 Qtl", vehicle: "MP04 AB 2145", status: "Pending Dispatch" },
    { id: "DSP-1026", crop: "Wheat", quantity: "180 Qtl", vehicle: "MP04 CD 7821", status: "Vehicle Assigned" },
    { id: "DSP-1027", crop: "Soybean", quantity: "120 Qtl", vehicle: "MP04 EF 4582", status: "Dispatched" },
  ]);
  const [message, setMessage] = useState("");

  const updateDispatch = (id) => {
    setDispatches((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        if (item.status === "Pending Dispatch") return { ...item, status: "Vehicle Assigned" };
        if (item.status === "Vehicle Assigned") return { ...item, status: "Dispatched" };
        return { ...item, status: "Received at Godown" };
      })
    );
    setMessage(isHindi ? "Dispatch record successfully update हो गया।" : "Dispatch record updated successfully.");
  };

  return (
    <main className={`stock-page ${isDark ? "dark-mode" : ""}`}>
      <header className="stock-header">
        <button className="stock-back" type="button" onClick={onBack}><ArrowLeft size={19} /></button>
        <div className="stock-brand">
          <div className="stock-brand-icon"><Wheat size={20} /></div>
          <div><strong>FarmBuddy</strong><span>{isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}</span></div>
        </div>
        <div className="stock-centre"><strong>{isHindi ? "सीहोर प्रोक्योरमेंट केंद्र" : "Sehore Procurement Centre"}</strong><span>Centre ID: PC1025</span></div>
        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="stock-content">
        <div className="stock-heading">
          <div><p>{isHindi ? "केंद्र प्रबंधन" : "Centre Management"}</p><h1>{isHindi ? "स्टॉक और डिस्पैच" : "Stock & Dispatch"}</h1><span>{isHindi ? "प्राप्त फसल और उसके dispatch को manage करें" : "Manage received crop stock and dispatch"}</span></div>
        </div>

        <div className="stock-summary">
          <div><Package size={19} /><span>{isHindi ? "कुल स्टॉक" : "Total Stock"}</span><strong>850 Qtl</strong></div>
          <div><Wheat size={19} /><span>{isHindi ? "गेहूं" : "Wheat"}</span><strong>730 Qtl</strong></div>
          <div><Truck size={19} /><span>{isHindi ? "डिस्पैच लंबित" : "Pending Dispatch"}</span><strong>250 Qtl</strong></div>
          <div><Warehouse size={19} /><span>{isHindi ? "भेजा गया" : "Dispatched"}</span><strong>300 Qtl</strong></div>
        </div>

        <section className="stock-card">
          <div className="stock-card-title"><div><h2>{isHindi ? "Dispatch Records" : "Dispatch Records"}</h2><p>{isHindi ? "केंद्र से godown तक crop movement" : "Crop movement from centre to godown"}</p></div></div>
          <div className="stock-table-wrap">
            <table className="stock-table">
              <thead><tr><th>ID</th><th>{isHindi ? "फसल" : "Crop"}</th><th>{isHindi ? "मात्रा" : "Quantity"}</th><th>{isHindi ? "वाहन" : "Vehicle"}</th><th>{isHindi ? "स्थिति" : "Status"}</th><th></th></tr></thead>
              <tbody>
                {dispatches.map((item) => (
                  <tr key={item.id}>
                    <td><strong className="stock-id">{item.id}</strong></td><td>{item.crop}</td><td><strong>{item.quantity}</strong></td><td>{item.vehicle}</td>
                    <td><span className={`stock-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status === "Dispatched" || item.status === "Received at Godown" ? <CheckCircle2 size={12} /> : <Truck size={12} />}{isHindi ? item.status : item.status}</span></td>
                    <td><button className="stock-action" type="button" onClick={() => updateDispatch(item.id)} disabled={item.status === "Received at Godown"}><ClipboardCheck size={14} />{item.status === "Received at Godown" ? "Done" : "Update"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {message && <div className="stock-message"><CheckCircle2 size={17} />{message}</div>}
      </section>
    </main>
  );
}
export default StockDispatch;
