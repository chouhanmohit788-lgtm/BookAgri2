import "./Home.css";
function Home() {
  return (
    <main className="home-screen">
      <div className="home-content">

        <div className="logo-circle">
          <div className="logo-b">
            B
          </div>

          <div className="logo-leaf">🌿</div>
          <div className="logo-wheat">🌾</div>
        </div>

        <h1 className="brand-name">
          Book<span>Agri</span>
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