import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  FileText,
  Home,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Sprout,
  Upload,
  User,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../../components/ThemeButton";
import "./FarmerRegistration.css";

function FarmerRegistration({ onLogin }) {
  const { isDark, toggleTheme } = useTheme();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",

    state: "Madhya Pradesh",
    district: "",
    tehsil: "",
    village: "",
    address: "",
    farmerType: "",

    khasra: "",
    landArea: "",
    crop: "",
    quantity: "",
    landDocument: null,

    otp: "",
    declaration: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleDocument = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      updateField("landDocument", file);
    }
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  if (!formData.otp || formData.otp.length !== 6) {
    alert("Please enter the 6-digit OTP.");
    return;
  }

  if (!formData.declaration) {
    alert("Please accept the declaration before submitting.");
    return;
  }

  setSubmitted(true);
};

  const steps = [
    "Personal",
    "Address",
    "Farm",
    "Verify",
  ];

  if (submitted) {
    return (
      <main className={`farmer-registration-page ${isDark ? "dark-mode" : ""}`}>

        <section className="success-screen">

          <div className="success-icon">
            <Check size={48} strokeWidth={3} />
          </div>

          <h1>Registration Successful</h1>

          <p>
            Your Farmer account has been created successfully.
          </p>

          <div className="farmer-id-card">
            <span>Farmer ID</span>
            <strong>FA-2026-001248</strong>
          </div>

          <button
  className="farmer-next-button"
  onClick={onLogin}
>
  Continue to Login
  <ArrowRight size={20} />
</button>

        </section>

      </main>
    );
  }

  return (
    <main className={`farmer-registration-page ${isDark ? "dark-mode" : ""}`}>

      {/* HEADER */}

      <header className="farmer-reg-header">

        <div className="farmer-reg-brand">

          <div className="farmer-reg-brand-icon">
            <Sprout size={23} />
          </div>

          <div>
            <h1 className="brand-name">
  <span style={{ color: "#07552f" }}>Farm</span>
  <span style={{ color: "#45c35b" }}>Buddy</span>
</h1>
            <p>Farmer Registration</p>
          </div>

        </div>

        <div className="farmer-reg-step">
          <span>Step</span>

          <strong>{step}</strong>

          <span>of 4</span>
        </div>

        <ThemeButton
          isDark={isDark}
          onToggle={toggleTheme}
        />

      </header>


      {/* CONTENT */}

      <section className="farmer-reg-content">

        {/* HEADING */}

        <div className="farmer-reg-heading">

          <div className="farmer-reg-icon">

            {step === 1 && <User size={22} />}
            {step === 2 && <MapPin size={22} />}
            {step === 3 && <Sprout size={22} />}
            {step === 4 && <ShieldCheck size={22} />}

          </div>

          <div>

            <h2>
              {step === 1 && "Personal Details"}
              {step === 2 && "Address & Farmer Type"}
              {step === 3 && "Farm & Land Details"}
              {step === 4 && "Verification"}
            </h2>

            <p>
              {step === 1 &&
                "Tell us a little about yourself"}

              {step === 2 &&
                "Tell us where you live and farm"}

              {step === 3 &&
                "Add your farming and land information"}

              {step === 4 &&
                "Verify your details and complete registration"}
            </p>

          </div>

        </div>


        {/* PROGRESS */}

        <div className="farmer-progress">

          {steps.map((item, index) => {

            const number = index + 1;

            return (
              <div
                key={item}
                className={
                  number <= step
                    ? "progress-active"
                    : ""
                }
              />
            );

          })}

        </div>


        {/* STEP LABELS */}

        <div className="step-labels">

          {steps.map((item, index) => {

            const number = index + 1;

            return (
              <span
                key={item}
                className={
                  number === step
                    ? "current-step-label"
                    : ""
                }
              >
                {item}
              </span>
            );

          })}

        </div>


        <form
          className="farmer-form"
          onSubmit={handleSubmit}
        >

          {/* ================================================= */}
          {/* STEP 1 */}
          {/* ================================================= */}

          {step === 1 && (
            <div className="form-step">

              <div className="form-group">

                <label>
                  Full Name <span>*</span>
                </label>

                <div className="input-wrapper">

                  <User size={18} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      updateField(
                        "fullName",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Mobile Number <span>*</span>
                </label>

                <div className="input-wrapper">

                  <div className="country-code">
                    +91
                  </div>

                  <Phone size={18} />

                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) =>
                      updateField(
                        "mobile",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Email Address
                  <small>(Optional)</small>
                </label>

                <div className="input-wrapper">

                  <Mail size={18} />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) =>
                      updateField(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Date of Birth <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Calendar size={18} />

                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      updateField(
                        "dob",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Gender <span>*</span>
                </label>

                <div className="gender-options">

                  {[
                    ["male", "M", "Male"],
                    ["female", "F", "Female"],
                    ["other", "O", "Other"],
                  ].map(
                    ([value, letter, label]) => (

                      <button
                        type="button"
                        key={value}
                        className={`gender-card ${
                          formData.gender === value
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          updateField(
                            "gender",
                            value
                          )
                        }
                      >

                        <span className="gender-circle">
                          {letter}
                        </span>

                        <span>{label}</span>

                        {formData.gender ===
                          value && (
                          <Check
                            size={15}
                            className="selected-check"
                          />
                        )}

                      </button>

                    )
                  )}

                </div>

              </div>

            </div>
          )}


          {/* ================================================= */}
          {/* STEP 2 */}
          {/* ================================================= */}

          {step === 2 && (
            <div className="form-step">

              <div className="form-group">

                <label>
                  State <span>*</span>
                </label>

                <div className="input-wrapper">

                  <MapPin size={18} />

                  <select
                    value={formData.state}
                    onChange={(e) =>
                      updateField(
                        "state",
                        e.target.value
                      )
                    }
                  >
                    <option value="Madhya Pradesh">
                      Madhya Pradesh
                    </option>

                    <option value="Rajasthan">
                      Rajasthan
                    </option>

                    <option value="Uttar Pradesh">
                      Uttar Pradesh
                    </option>

                    <option value="Maharashtra">
                      Maharashtra
                    </option>

                  </select>

                </div>

              </div>


              <div className="two-column">

                <div className="form-group">

                  <label>
                    District <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <MapPin size={18} />

                    <input
                      type="text"
                      placeholder="District"
                      value={formData.district}
                      onChange={(e) =>
                        updateField(
                          "district",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Tehsil <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <MapPin size={18} />

                    <input
                      type="text"
                      placeholder="Tehsil"
                      value={formData.tehsil}
                      onChange={(e) =>
                        updateField(
                          "tehsil",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Village <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Home size={18} />

                  <input
                    type="text"
                    placeholder="Enter village name"
                    value={formData.village}
                    onChange={(e) =>
                      updateField(
                        "village",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Complete Address <span>*</span>
                </label>

                <textarea
                  className="form-textarea"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) =>
                    updateField(
                      "address",
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="form-group">

                <label>
                  Farmer Type <span>*</span>
                </label>

                <div className="farmer-type-options">

                  {[
                    [
                      "owner",
                      "Land Owner",
                      "भूमिधर",
                    ],
                    [
                      "tenant",
                      "Tenant Farmer",
                      "पट्टेदार",
                    ],
                    [
                      "sharecropper",
                      "Sharecropper",
                      "बटाईदार",
                    ],
                    [
                      "other",
                      "Other",
                      "अन्य",
                    ],
                  ].map(
                    ([value, title, hindi]) => (

                      <button
                        type="button"
                        key={value}
                        className={`farmer-type-card ${
                          formData.farmerType === value
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          updateField(
                            "farmerType",
                            value
                          )
                        }
                      >

                        <div className="farmer-type-icon">
                          <Sprout size={21} />
                        </div>

                        <div>

                          <strong>{title}</strong>

                          <small>{hindi}</small>

                        </div>

                        {formData.farmerType ===
                          value && (
                          <Check
                            size={17}
                            className="type-check"
                          />
                        )}

                      </button>

                    )
                  )}

                </div>

              </div>

            </div>
          )}


          {/* ================================================= */}
          {/* STEP 3 */}
          {/* ================================================= */}

          {step === 3 && (
            <div className="form-step">

              <div className="two-column">

                <div className="form-group">

                  <label>
                    Khasra / Land ID <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <FileText size={18} />

                    <input
                      type="text"
                      placeholder="Enter Khasra ID"
                      value={formData.khasra}
                      onChange={(e) =>
                        updateField(
                          "khasra",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Cultivated Area <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <Sprout size={18} />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 5.5"
                      value={formData.landArea}
                      onChange={(e) =>
                        updateField(
                          "landArea",
                          e.target.value
                        )
                      }
                    />

                    <span className="input-unit">
                      Acre
                    </span>

                  </div>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Main Crop <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Sprout size={18} />

                  <select
                    value={formData.crop}
                    onChange={(e) =>
                      updateField(
                        "crop",
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select your main crop
                    </option>

                    <option value="wheat">
                      Wheat / गेहूँ
                    </option>

                    <option value="rice">
                      Rice / धान
                    </option>

                    <option value="soybean">
                      Soybean / सोयाबीन
                    </option>

                    <option value="maize">
                      Maize / मक्का
                    </option>

                    <option value="cotton">
                      Cotton / कपास
                    </option>

                    <option value="other">
                      Other / अन्य
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Expected Produce Quantity <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Sprout size={18} />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Expected quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      updateField(
                        "quantity",
                        e.target.value
                      )
                    }
                  />

                  <span className="input-unit">
                    Quintal
                  </span>

                </div>

              </div>


              {/* DOCUMENT */}

              <div className="form-group">

                <label>
                  Land Document <span>*</span>
                </label>

                <label className="document-upload">

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocument}
                  />

                  <div className="upload-icon">
                    <Upload size={25} />
                  </div>

                  <div className="upload-text">

                    {formData.landDocument ? (
                      <>
                        <strong>
                          {formData.landDocument.name}
                        </strong>

                        <small>
                          Document selected
                        </small>
                      </>
                    ) : (
                      <>
                        <strong>
                          Upload Land Document
                        </strong>

                        <small>
                          PDF, JPG or PNG • Max 5 MB
                        </small>
                      </>
                    )}

                  </div>

                </label>

              </div>


              <div className="document-note">

                <ShieldCheck size={17} />

                <span>
                  Your document will only be used
                  for verification purposes.
                </span>

              </div>

            </div>
          )}


          {/* ================================================= */}
          {/* STEP 4 */}
          {/* ================================================= */}

          {step === 4 && (
            <div className="form-step">

              <div className="verification-card">

                <div className="verification-icon">
                  <Phone size={25} />
                </div>

                <h3>Verify Mobile Number</h3>

                <p>
                  We sent a 6-digit OTP to
                  <strong>
                    {" "}
                    +91 {formData.mobile || "XXXXXXXXXX"}
                  </strong>
                </p>

                <input
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={formData.otp}
                  onChange={(e) =>
                    updateField(
                      "otp",
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                <button
                  type="button"
                  className="resend-button"
                >
                  Resend OTP
                </button>

              </div>


              {/* REVIEW */}

              <div className="review-card">

                <div className="review-header">
                  <h3>Registration Summary</h3>

                  <span>
                    Step 4 of 4
                  </span>
                </div>


                <div className="review-row">
                  <span>Name</span>
                  <strong>
                    {formData.fullName || "—"}
                  </strong>
                </div>

                <div className="review-row">
                  <span>Mobile</span>
                  <strong>
                    {formData.mobile
                      ? `+91 ${formData.mobile}`
                      : "—"}
                  </strong>
                </div>

                <div className="review-row">
                  <span>Village</span>
                  <strong>
                    {formData.village || "—"}
                  </strong>
                </div>

                <div className="review-row">
                  <span>Farmer Type</span>
                  <strong>
                    {formData.farmerType || "—"}
                  </strong>
                </div>

                <div className="review-row">
                  <span>Main Crop</span>
                  <strong>
                    {formData.crop || "—"}
                  </strong>
                </div>

              </div>


              {/* DECLARATION */}

              <label className="declaration">

                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) =>
                    updateField(
                      "declaration",
                      e.target.checked
                    )
                  }
                />

                <span>
                  I confirm that the information
                  provided by me is correct and
                  I agree to the verification of
                  my submitted details.
                </span>

              </label>

            </div>
          )}


          {/* BUTTONS */}

          <div className="registration-actions">

            {step > 1 && (
              <button
                type="button"
                className="back-button"
                onClick={previousStep}
              >
                <ArrowLeft size={19} />
                <span>Back</span>
              </button>
            )}


            {step < 4 ? (
              <button
                type="button"
                className="farmer-next-button"
                onClick={nextStep}
              >
                <span>
                  Continue
                </span>

                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="farmer-next-button"
              >
                <ShieldCheck size={20} />

                <span>
                  Submit Registration
                </span>

              </button>
            )}

          </div>

        </form>


        <p className="required-note">
          <span>*</span> Required fields
        </p>

      </section>

    </main>
  );
}

export default FarmerRegistration;