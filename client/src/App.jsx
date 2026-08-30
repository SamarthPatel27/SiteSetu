import { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./styles.css";

const API = "https://sitesetu.onrender.com/api";

/* =========================
   NAVBAR
========================= */

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeSection = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <button
            type="button"
            onClick={() => goHomeSection("services")}
          >
            Services
          </button>

          <button
            type="button"
            onClick={() => goHomeSection("how-it-works")}
          >
            How It Works
          </button>

          <button
            type="button"
            onClick={() => goHomeSection("about")}
          >
            About
          </button>

          <Link to="/login" className="login-btn">
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}

/* =========================
   HOME
========================= */

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/services`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error("Services error:", err);

        /* Fallback services so cards still appear
           even if backend is temporarily unavailable */
        setServices([
          {
            id: "architect",
            category: "Architect",
            title: "Architect Consultation",
            description:
              "Planning, design and residential consultation.",
          },
          {
            id: "civil-engineer",
            category: "Civil Engineer",
            title: "Civil Engineering Inspection",
            description:
              "Construction quality and site inspection support.",
          },
          {
            id: "interior-designer",
            category: "Interior Designer",
            title: "Interior Design Consultation",
            description:
              "Interior planning, finishing and design guidance.",
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openProfessionals = (category) => {
    navigate(
      `/professionals?category=${encodeURIComponent(category)}`
    );
  };

  const iconForCategory = (category) => {
    if (category === "Architect") return "📐";
    if (category === "Civil Engineer") return "🏗️";
    return "🎨";
  };

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
              Find verified architects, civil engineers and interior
              designers for your construction and renovation needs —
              all in one place.
            </p>

            <div className="hero-buttons">

              <button
                type="button"
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Find a Professional →
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                How It Works
              </button>

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

          <div className="section-label">
            OUR SERVICES
          </div>

          <h2>Find the Right Professional</h2>

          <p>
            Whatever your construction requirement, SiteSetu helps
            you connect with the right expert.
          </p>

        </div>

        {loading ? (
          <div className="loading">
            Loading services...
          </div>
        ) : (

          <div className="services-grid">

            {services.map((service) => (

              <div
                className="service-card"
                key={service.id || service.category}
              >

                <div className="service-icon">
                  {iconForCategory(service.category)}
                </div>

                <span className="service-category">
                  {service.category}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <button
                  type="button"
                  className="service-btn"
                  onClick={() =>
                    openProfessionals(service.category)
                  }
                >
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

          <div className="section-label">
            SIMPLE PROCESS
          </div>

          <h2>How SiteSetu Works</h2>

          <p>
            Finding the right professional is simple.
          </p>

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

            <div className="section-label">
              ABOUT SITESETU
            </div>

            <h2>
              Making Construction
              <span> Simple & Reliable</span>
            </h2>

            <p>
              SiteSetu is a platform designed to connect customers
              with trusted construction professionals. Whether you
              are building a new home, renovating an existing property
              or designing an interior, we help you find the right expert.
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

            <h3>
              Your Project. Our Network.
            </h3>

            <p>
              From planning to execution, find the professionals you need.
            </p>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">

        <div>
          <h2>
            Ready to Start Your Project?
          </h2>

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

            <Link to="/">
              Home
            </Link>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Services
            </button>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </button>

            <Link to="/login">
              Login
            </Link>

          </div>

          <div className="footer-links">

            <h4>Services</h4>

            <button
              type="button"
              onClick={() => openProfessionals("Architect")}
            >
              Architect
            </button>

            <button
              type="button"
              onClick={() => openProfessionals("Civil Engineer")}
            >
              Civil Engineer
            </button>

            <button
              type="button"
              onClick={() => openProfessionals("Interior Designer")}
            >
              Interior Designer
            </button>

          </div>

        </div>

        <div className="copyright">
          © 2026 SiteSetu. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

/* =========================
   LOGIN
========================= */

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

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue to your SiteSetu account.
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
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

/* =========================
   PROFESSIONALS
========================= */

function Professionals() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const professionals = [
    {
      id: 1,
      name: "Rajesh Sharma",
      category: "Architect",
      experience: "8 Years Experience",
      location: "Udaipur",
      rating: "4.9",
      price: "₹1,500 / Consultation",
      icon: "📐",
    },
    {
      id: 2,
      name: "Amit Verma",
      category: "Civil Engineer",
      experience: "10 Years Experience",
      location: "Udaipur",
      rating: "4.8",
      price: "₹1,200 / Inspection",
      icon: "🏗️",
    },
    {
      id: 3,
      name: "Neha Mehta",
      category: "Interior Designer",
      experience: "7 Years Experience",
      location: "Udaipur",
      rating: "4.9",
      price: "₹1,000 / Consultation",
      icon: "🎨",
    },
  ];

  const filteredProfessionals = category
    ? professionals.filter((p) => p.category === category)
    : professionals;

  return (
    <div className="dashboard-page">

      <div className="dashboard-nav">

        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Home
        </button>

      </div>

      <main className="dashboard-container">

        <div className="dashboard-header">

          <div className="section-label">
            PROFESSIONALS
          </div>

          <h1>
            {category
              ? `${category} Professionals`
              : "Find Professionals"}
          </h1>

          <p>
            Choose a trusted professional for your project.
          </p>

        </div>

        <div className="professional-grid">

          {filteredProfessionals.map((professional) => (

            <div
              className="professional-card"
              key={professional.id}
            >

              <div className="professional-top">

                <div className="professional-avatar">
                  {professional.icon}
                </div>

                <span className="verified">
                  ✓ VERIFIED
                </span>

              </div>

              <h2>
                {professional.name}
              </h2>

              <p className="professional-category">
                {professional.category}
              </p>

              <p>
                ⭐ {professional.rating}
              </p>

              <div className="professional-details">
                <span>📍 {professional.location}</span>
                <span>💼 {professional.experience}</span>
              </div>

              <div className="professional-bottom">

                <strong>
                  {professional.price}
                </strong>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={() =>
                    alert(
                      `Booking selected for ${professional.name}`
                    )
                  }
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

        {filteredProfessionals.length === 0 && (
          <div className="empty-state">
            <h2>
              No professionals found
            </h2>

            <p>
              Please select another service category.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

/* =========================
   APP ROUTES
========================= */

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/professionals"
        element={<Professionals />}
      />

    </Routes>
  );
}

export default App;