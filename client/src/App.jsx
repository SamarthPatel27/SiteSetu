import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./styles.css";

const API = "https://sitesetu.onrender.com/api";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/services`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error("Services error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              🏗️ Trusted Construction Professionals
            </div>

            <h1>
              Build Your Dream Project
              <span> With Trusted Experts</span>
            </h1>

            <p>
              Find verified architects, civil engineers and interior designers
              for your construction and renovation needs — all in one place.
            </p>

            <div className="hero-buttons">
              <a href="#services" className="primary-btn">
                Find a Professional →
              </a>

              <a href="#how-it-works" className="secondary-btn">
                How It Works
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>100+</strong>
                <span>Professionals</span>
              </div>

              <div>
                <strong>500+</strong>
                <span>Projects</span>
              </div>

              <div>
                <strong>4.8★</strong>
                <span>Average Rating</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="building-icon">🏠</div>

            <h3>Start Your Project</h3>

            <p>
              Get connected with the right professional for your project.
            </p>

            <div className="mini-card">
              <span>👷</span>
              <div>
                <strong>Verified Experts</strong>
                <small>Professionals you can trust</small>
              </div>
            </div>

            <div className="mini-card">
              <span>📍</span>
              <div>
                <strong>Local Professionals</strong>
                <small>Find experts near you</small>
              </div>
            </div>

            <div className="mini-card">
              <span>⭐</span>
              <div>
                <strong>Quality Services</strong>
                <small>Rated by customers</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-header">
          <div className="section-label">OUR SERVICES</div>

          <h2>Find the Right Professional</h2>

          <p>
            Whatever your construction requirement, SiteSetu helps you connect
            with the right expert.
          </p>
        </div>

        {loading ? (
          <div className="loading">Loading services...</div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-icon">
                  {service.category === "Architect"
                    ? "📐"
                    : service.category === "Civil Engineer"
                    ? "🏗️"
                    : "🎨"}
                </div>

                <span className="service-category">
                  {service.category}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button className="service-btn">
                  View Professionals →
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-header">
          <div className="section-label">SIMPLE PROCESS</div>

          <h2>How SiteSetu Works</h2>

          <p>Finding the right professional is simple.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-icon">🔍</div>
            <h3>Search</h3>
            <p>
              Select the type of professional you need for your project.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-icon">👷</div>
            <h3>Choose</h3>
            <p>
              Compare professionals based on their services and experience.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-icon">🤝</div>
            <h3>Connect</h3>
            <p>
              Contact the professional and discuss your project requirements.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-icon">🏠</div>
            <h3>Build</h3>
            <p>
              Start your project with confidence and trusted expertise.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <div className="section-label">ABOUT SITESETU</div>

            <h2>
              Making Construction
              <span> Simple & Reliable</span>
            </h2>

            <p>
              SiteSetu is a platform designed to connect customers with trusted
              construction professionals. Whether you are building a new home,
              renovating an existing property or designing an interior, we help
              you find the right expert.
            </p>

            <div className="about-points">
              <div>✓ Easy professional discovery</div>
              <div>✓ Multiple service categories</div>
              <div>✓ Simple and transparent process</div>
              <div>✓ Built for customers and professionals</div>
            </div>
          </div>

          <div className="about-box">
            <div className="about-house">🏡</div>
            <h3>Your Project. Our Network.</h3>
            <p>
              From planning to execution, find the professionals you need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <h2>Ready to Start Your Project?</h2>
          <p>
            Connect with the right construction professional today.
          </p>
        </div>

        <Link to="/login" className="cta-btn">
          Get Started →
        </Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-container">
          <div>
            <Link to="/" className="footer-logo">
              <span className="logo-icon">S</span>
              SiteSetu
            </Link>

            <p>
              Connecting people with trusted construction professionals.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <span>Architect</span>
            <span>Civil Engineer</span>
            <span>Interior Designer</span>
          </div>
        </div>

        <div className="copyright">
          © 2026 SiteSetu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    alert(
      "Login system is connected to the frontend. Backend authentication can be added next."
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue to your SiteSetu account.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;