import "../src/style/home.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <main className="hero-section">
        <img
          src="../src/assets/pexels-rebrand-cities-581004-1367276-scaled.jpg" 
          alt="Team Meeting"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Empowering Businesses with Cloud Data Solutions</h1>
          <p>
            Revolutionizing data management with innovative cloud-based database
            services tailored to your business needs.
          </p>
          <div className="hero-buttons">
            <a href="/get-started" className="btn primary-btn">
              Get Started
            </a>
            <a href="/services" className="btn secondary-btn">
              Explore Our Services
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
