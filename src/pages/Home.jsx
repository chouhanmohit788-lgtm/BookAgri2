import "./Home.css";
function Home() {
  return (
    <main className="home-screen">
      <div className="home-content">

        <div className="logo-circle">
  <img
    src="/farmbuddy-logo.png"
    alt="FarmBuddy"
    className="home-logo-image"
  />
</div>

        <h1 className="brand-name">
  <span style={{ color: "#07552f" }}>Farm</span>
  <span style={{ color: "#45c35b" }}>Buddy</span>
</h1>

        <div className="divider">
          <span></span>
          <b>⌁</b>
          <span></span>
        </div>

        <p className="tagline">
          Smart Procurement. Less Waiting.
        </p>

        <div className="loading-dots">
          <i></i>
          <i></i>
          <i></i>
        </div>

      </div>
    </main>
  );
}

export default Home;