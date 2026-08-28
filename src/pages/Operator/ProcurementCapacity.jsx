import { ArrowLeft, BarChart3, CheckCircle2, Wheat } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./ProcurementCapacity.css";

function ProcurementCapacity({ onBack }) {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const isHindi = language === "hi";

  const totalCapacity = 1000;
  const totalProcured = 486;
  const remainingCapacity = 514;

  const crops = [
    { name: "Wheat", capacity: 500, procured: 326 },
    { name: "Soybean", capacity: 300, procured: 110 },
    { name: "Maize", capacity: 200, procured: 50 },
  ];

  return (
    <main className={`capacity-page ${isDark ? "dark-mode" : ""}`}>
      <header className="capacity-header">
        <button type="button" className="capacity-back" onClick={onBack}><ArrowLeft size={19} /></button>
        <div className="capacity-brand">
          <BarChart3 size={21} />
          <div><strong>FarmBuddy</strong><span>{isHindi ? "प्रोक्योरमेंट केंद्र" : "Procurement Centre"}</span></div>
        </div>
      </header>

      <section className="capacity-content">
        <div className="capacity-title">
          <p>{isHindi ? "प्रोक्योरमेंट क्षमता" : "PROCUREMENT CAPACITY"}</p>
          <h1>{isHindi ? "केंद्र की कुल क्षमता" : "Centre Procurement Capacity"}</h1>
          <span>{isHindi ? "कुल क्षमता, खरीदी और बची हुई क्षमता" : "Overall capacity, procurement and remaining capacity"}</span>
        </div>

        <section className="capacity-overview">
          <div className="capacity-overview-main">
            <div className="capacity-icon"><Wheat size={24} /></div>
            <div><span>{isHindi ? "कुल केंद्र क्षमता" : "Total Centre Capacity"}</span><strong>1,000 Qtl</strong></div>
          </div>

          <div className="capacity-progress">
            <div className="capacity-progress-head"><span>{isHindi ? "क्षमता उपयोग" : "Capacity Used"}</span><strong>48.6%</strong></div>
            <div className="capacity-progress-track"><div style={{ width: "48.6%" }} /></div>
          </div>

          <div className="capacity-stat procured">
            <CheckCircle2 size={20} />
            <div><span>{isHindi ? "कुल खरीदी" : "Total Procured"}</span><strong>486 Qtl</strong></div>
          </div>

          <div className="capacity-stat remaining">
            <BarChart3 size={20} />
            <div><span>{isHindi ? "बची हुई क्षमता" : "Remaining Capacity"}</span><strong>{remainingCapacity} Qtl</strong></div>
          </div>
        </section>

        <section className="crop-capacity-card">
          <div className="crop-capacity-heading">
            <div>
              <p>{isHindi ? "फसल के अनुसार" : "CROP-WISE"}</p>
              <h2>{isHindi ? "फसल के अनुसार प्रोक्योरमेंट" : "Procurement by Crop"}</h2>
              <span>{isHindi ? "हर फसल की कुल क्षमता, खरीदी और बची क्षमता" : "Total capacity, procured quantity and remaining capacity"}</span>
            </div>
            <span className="crop-total">486 Qtl Procured</span>
          </div>

          <div className="crop-capacity-list">
            {crops.map((crop) => {
              const remaining = crop.capacity - crop.procured;
              const percent = (crop.procured / crop.capacity) * 100;
              return (
                <div className="crop-row" key={crop.name}>
                  <div className="crop-row-top">
                    <div className="crop-name"><span className={`crop-dot ${crop.name.toLowerCase()}`} /><strong>{crop.name}</strong></div>
                    <span>{percent.toFixed(0)}% used</span>
                  </div>
                  <div className="crop-bar"><div style={{ width: `${percent}%` }} /></div>
                  <div className="crop-values">
                    <div><span>{isHindi ? "कुल क्षमता" : "Total Capacity"}</span><strong>{crop.capacity} Qtl</strong></div>
                    <div><span>{isHindi ? "खरीदी" : "Procured"}</span><strong>{crop.procured} Qtl</strong></div>
                    <div><span>{isHindi ? "बची क्षमता" : "Remaining"}</span><strong>{remaining} Qtl</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
export default ProcurementCapacity;
