import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

/* =========================
   HOME
========================= */

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/services`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        } else {
          setDefaultServices();
        }
      })
      .catch(() => {
        setDefaultServices();
      });
  }, []);

  const setDefaultServices = () => {
    setServices([
      {
        id: 1,
        title: "Architect Consultation",
        category: "Architect",
        description:
          "Planning, design and residential consultation."
      },
      {
        id: 2,
        title: "Civil Engineering Inspection",
        category: "Civil Engineer",
        description:
          "Construction quality and site inspection support."
      },
      {
        id: 3,
        title: "Interior Design Consultation",
        category: "Interior Designer",
        description:
          "Interior planning, finishing and design guidance."
      }
    ]);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link className="brand" to="/">
            <span className="logo-icon">S</span>
            SiteSetu
          </Link>

          <div className="navlinks">
            <Link to="/">Home</Link>
            <a href="/#services">Services</a>
            <a href="/#how">How It Works</a>
            <a href="/#about">About</a>

            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              YOUR CONSTRUCTION COMPANION
            </span>

            <h1>
              Build with confidence.
              <br />
              <span>Find the right expert.</span>
            </h1>

            <p>
              Connect with verified architects, civil engineers and
              interior designers for your residential construction
              project.
            </p>

            <div className="hero-actions">
              <Link
                to="/professionals"
                className="primary-btn large"
              >
                Find a Professional →
              </Link>

              <a
                href="/#how"
                className="secondary-btn large"
              >
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
            <div className="hero-card-icon">🏠</div>

            <h2>Start Your Project</h2>

            <p>
              Get connected with the right professional for your
              project.
            </p>

            <div className="hero-feature">
              <span>👷</span>
              <div>
                <strong>Verified Experts</strong>
                <small>Professionals you can trust</small>
              </div>
            </div>

            <div className="hero-feature">
              <span>📍</span>
              <div>
                <strong>Local Professionals</strong>
                <small>Find experts near you</small>
              </div>
            </div>

            <div className="hero-feature">
              <span>⭐</span>
              <div>
                <strong>Quality Services</strong>
                <small>Rated by customers</small>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="section-heading">
            <span className="eyebrow">OUR SERVICES</span>

            <h2>Find the Right Professional</h2>

            <p>
              Whatever your construction requirement, SiteSetu helps
              you connect with the right expert.
            </p>
          </div>

          <div className="service-grid">
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

                {/* CATEGORY-WISE NAVIGATION */}
                <Link
                  to={`/professionals?category=${encodeURIComponent(
                    service.category
                  )}`}
                  className="service-btn"
                >
                  View Professionals →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section process">
          <div className="section-heading">
            <span className="eyebrow">SIMPLE PROCESS</span>

            <h2>How SiteSetu Works</h2>

            <p>Finding the right professional is simple.</p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon">🔍</div>
              <h3>Search</h3>
              <p>
                Select the type of professional you need.
              </p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon">👷</div>
              <h3>Choose</h3>
              <p>
                Compare professionals based on experience and rating.
              </p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon">🤝</div>
              <h3>Connect</h3>
              <p>
                Discuss your project requirements.
              </p>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <div className="step-icon">🏠</div>
              <h3>Build</h3>
              <p>
                Start your project with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="section-heading">
            <span className="eyebrow">ABOUT SITESETU</span>

            <h2>Making Construction Simple & Reliable</h2>

            <p>
              SiteSetu connects homeowners with trusted construction
              professionals. Whether you are building a new home,
              renovating an existing property or designing an
              interior, we help you find the right expert.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <div>
            <Link to="/" className="footer-logo">
              <span className="logo-icon">S</span>
              SiteSetu
            </Link>

            <p>
              Connecting homeowners with trusted construction and
              design professionals.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/professionals">Professionals</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer-links">
            <h4>Services</h4>

            <Link to="/professionals?category=Architect">
              Architect
            </Link>

            <Link to="/professionals?category=Civil%20Engineer">
              Civil Engineer
            </Link>

            <Link to="/professionals?category=Interior%20Designer">
              Interior Designer
            </Link>
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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/login`, {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem(
          "sitesetuUser",
          JSON.stringify(res.data.user)
        );

        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
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

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

/* =========================
   REGISTER
========================= */

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Homeowner");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        role
      });

      if (res.data.success) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <Link to="/" className="auth-logo">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join SiteSetu and get started with your project.
        </p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Select Account Type</label>

          <div className="role-grid">
            <button
              type="button"
              className={
                role === "Homeowner"
                  ? "role active"
                  : "role"
              }
              onClick={() => setRole("Homeowner")}
            >
              🏠
              <strong>Homeowner</strong>
              <small>Find professionals</small>
            </button>

            <button
              type="button"
              className={
                role === "Professional"
                  ? "role active"
                  : "role"
              }
              onClick={() => setRole("Professional")}
            >
              👷
              <strong>Professional</strong>
              <small>Offer your services</small>
            </button>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("sitesetuUser") || "null"
  );

  const [bookings] = useState(() => {
    return JSON.parse(
      localStorage.getItem("sitesetuBookings") || "[]"
    );
  });

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Please Login</h1>

          <p>
            You need to login to access your dashboard.
          </p>

          <Link to="/login" className="primary-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem("sitesetuUser");
    navigate("/");
  };

  const myBookings = bookings.filter(
    (booking) => booking.email === user.email
  );

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <Link to="/" className="brand">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <div>
          <span className="dashboard-user">
            {user.name}
          </span>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">DASHBOARD</span>

            <h1>Welcome, {user.name}</h1>

            <p>
              Manage your SiteSetu activities from one place.
            </p>
          </div>

          <Link
            to="/professionals"
            className="primary-btn"
          >
            Find Professionals
          </Link>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <span className="dashboard-icon">👤</span>
            <h3>Account Type</h3>
            <strong>{user.role}</strong>
          </div>

          <div className="dashboard-card">
            <span className="dashboard-icon">📅</span>
            <h3>Bookings</h3>
            <strong>{myBookings.length}</strong>
          </div>

          <div className="dashboard-card">
            <span className="dashboard-icon">🔔</span>
            <h3>Notifications</h3>
            <strong>3</strong>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <span className="eyebrow">
              RECENT ACTIVITY
            </span>

            <h2>Your Consultation Requests</h2>
          </div>

          {myBookings.length === 0 ? (
            <div className="empty-state">
              <h3>No bookings yet</h3>

              <p>
                Find a professional and request your first
                consultation.
              </p>

              <Link
                to="/professionals"
                className="primary-btn"
              >
                Browse Professionals
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {myBookings.map((booking) => (
                <div
                  className="booking-card"
                  key={booking.id}
                >
                  <div>
                    <h3>{booking.professional}</h3>

                    <p>{booking.service}</p>

                    <small>
                      {booking.date} at {booking.time}
                    </small>
                  </div>

                  <span className="status pending">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/* =========================
   PROFESSIONAL DATA
========================= */

const professionals = [
  {
    id: 1,
    name: "Rahul Sharma",
    category: "Architect",
    location: "Udaipur",
    experience: 8,
    rating: 4.8,
    price: 700,
    verified: true,
    description:
      "Residential architect specializing in modern home planning and design."
  },
  {
    id: 2,
    name: "Amit Verma",
    category: "Civil Engineer",
    location: "Jaipur",
    experience: 10,
    rating: 4.9,
    price: 900,
    verified: true,
    description:
      "Civil engineering consultant specializing in construction inspection."
  },
  {
    id: 3,
    name: "Priya Mehta",
    category: "Interior Designer",
    location: "Udaipur",
    experience: 6,
    rating: 4.7,
    price: 600,
    verified: true,
    description:
      "Interior designer focused on practical and modern residential spaces."
  },
  {
    id: 4,
    name: "Vikas Singh",
    category: "Architect",
    location: "Delhi",
    experience: 12,
    rating: 4.6,
    price: 1000,
    verified: false,
    description:
      "Architect providing residential planning and renovation guidance."
  },
  {
    id: 5,
    name: "Neha Gupta",
    category: "Civil Engineer",
    location: "Udaipur",
    experience: 7,
    rating: 4.8,
    price: 800,
    verified: true,
    description:
      "Civil engineer providing structural inspection and construction guidance."
  },
  {
    id: 6,
    name: "Kavita Joshi",
    category: "Interior Designer",
    location: "Jaipur",
    experience: 9,
    rating: 4.9,
    price: 750,
    verified: true,
    description:
      "Interior designer specializing in modern residential interiors."
  }
];

/* =========================
   PROFESSIONALS
========================= */

function Professionals() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const categoryFromUrl = params.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    categoryFromUrl || "All"
  );
  const [professionalLocation, setProfessionalLocation] =
    useState("All");

  useEffect(() => {
    if (
      categoryFromUrl &&
      [
        "Architect",
        "Civil Engineer",
        "Interior Designer"
      ].includes(categoryFromUrl)
    ) {
      setCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        professional.name
          .toLowerCase()
          .includes(searchText) ||
        professional.category
          .toLowerCase()
          .includes(searchText) ||
        professional.location
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        professional.category === category;

      const matchesLocation =
        professionalLocation === "All" ||
        professional.location === professionalLocation;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation
      );
    });
  }, [search, category, professionalLocation]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setProfessionalLocation("All");
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <Link to="/" className="brand">
          <span className="logo-icon">S</span>
          SiteSetu
        </Link>

        <div>
          <Link
            to="/dashboard"
            className="login-btn"
          >
            Dashboard
          </Link>

          <Link
            to="/register"
            className="primary-btn"
          >
            Register
          </Link>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              PROFESSIONAL DIRECTORY
            </span>

            <h1>Find the right professional</h1>

            <p>
              Search verified experts by category and
              location.
            </p>
          </div>
        </div>

        {/* ACTIVE CATEGORY */}
        {category !== "All" && (
          <div className="active-filter">
            Showing professionals for:
            <strong>{category}</strong>

            <button onClick={clearFilters}>
              Clear
            </button>
          </div>
        )}

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name, category or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Architect">
              Architect
            </option>

            <option value="Civil Engineer">
              Civil Engineer
            </option>

            <option value="Interior Designer">
              Interior Designer
            </option>
          </select>

          <select
            value={professionalLocation}
            onChange={(e) =>
              setProfessionalLocation(e.target.value)
            }
          >
            <option value="All">
              All Locations
            </option>

            <option value="Udaipur">
              Udaipur
            </option>

            <option value="Jaipur">
              Jaipur
            </option>

            <option value="Delhi">
              Delhi
            </option>
          </select>
        </div>

        <div className="professional-grid">
          {filteredProfessionals.map(
            (professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            )
          )}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="empty-state">
            <h3>No professionals found</h3>

            <p>
              Try changing your search or filters.
            </p>

            <button
              className="primary-btn"
              onClick={clearFilters}
            >
              Show All Professionals
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================
   PROFESSIONAL CARD
========================= */

function ProfessionalCard({ professional }) {
  return (
    <div className="professional-card">
      <div className="professional-top">
        <div className="professional-avatar">
          {professional.name.charAt(0)}
        </div>

        {professional.verified && (
          <span className="verified">
            ✓ Verified
          </span>
        )}
      </div>

      <h2>{professional.name}</h2>

      <p className="professional-category">
        {professional.category}
      </p>

      <p>{professional.description}</p>

      <div className="professional-details">
        <span>📍 {professional.location}</span>

        <span>⭐ {professional.rating}</span>

        <span>
          💼 {professional.experience} years
        </span>
      </div>

      <div className="professional-bottom">
        <strong>
          ₹{professional.price}
          <small>/consultation</small>
        </strong>

        <Link
          to={`/book/${professional.id}`}
          className="primary-btn"
        >
          Book
        </Link>
      </div>
    </div>
  );
}

/* =========================
   BOOKING
========================= */

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = Number(
    location.pathname.split("/").pop()
  );

  const professional =
    professionals.find(
      (p) => p.id === id
    ) || professionals[0];

  const user = JSON.parse(
    localStorage.getItem("sitesetuUser") || "null"
  );

  const [form, setForm] = useState({
    service: professional.category,
    date: "",
    time: "",
    description: "",
    budget: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login before booking.");
      navigate("/login");
      return;
    }

    if (!form.date || !form.time) {
      alert("Please select date and time.");
      return;
    }

    const oldBookings = JSON.parse(
      localStorage.getItem("sitesetuBookings") || "[]"
    );

    const newBooking = {
      id: Date.now(),
      email: user.email,
      professional: professional.name,
      service: form.service,
      date: form.date,
      time: form.time,
      description: form.description,
      budget: form.budget,
      status: "Pending"
    };

    localStorage.setItem(
      "sitesetuBookings",
      JSON.stringify([
        ...oldBookings,
        newBooking
      ])
    );

    alert(
      "Consultation request submitted successfully!"
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <Link
          to="/professionals"
          className="auth-logo"
        >
          ← SiteSetu
        </Link>

        <h1>Book Consultation</h1>

        <p className="auth-subtitle">
          Request a consultation with{" "}
          <strong>
            {professional.name}
          </strong>
          .
        </p>

        <div className="booking-summary">
          <strong>
            {professional.category}
          </strong>

          <span>
            📍 {professional.location}
          </span>

          <span>
            ⭐ {professional.rating}
          </span>

          <span>
            ₹{professional.price}/consultation
          </span>
        </div>

        <form onSubmit={handleBooking}>
          <label>Service</label>

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option>
              {professional.category}
            </option>

            <option>
              Site Inspection
            </option>

            <option>
              Design Consultation
            </option>

            <option>
              Construction Planning
            </option>
          </select>

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Time</label>

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <label>
            Project Description
          </label>

          <textarea
            name="description"
            placeholder="Describe your project..."
            value={form.description}
            onChange={handleChange}
            rows="4"
          />

          <label>
            Estimated Budget
          </label>

          <input
            type="number"
            name="budget"
            placeholder="Enter your budget"
            value={form.budget}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="auth-button"
          >
            Request Consultation
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================
   ADMIN
========================= */

function Admin() {
  const [professionalsList, setProfessionalsList] =
    useState(professionals);

  const verifyProfessional = (id) => {
    setProfessionalsList((current) =>
      current.map((professional) =>
        professional.id === id
          ? {
              ...professional,
              verified: true
            }
          : professional
      )
    );
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <Link to="/" className="brand">
          <span className="logo-icon">S</span>
          SiteSetu Admin
        </Link>

        <Link
          to="/"
          className="login-btn"
        >
          Home
        </Link>
      </nav>

      <main className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              ADMIN PANEL
            </span>

            <h1>
              Verification Dashboard
            </h1>

            <p>
              Review and verify professional profiles.
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Professionals</h3>

            <strong>
              {professionalsList.length}
            </strong>
          </div>

          <div className="dashboard-card">
            <h3>Verified</h3>

            <strong>
              {
                professionalsList.filter(
                  (p) => p.verified
                ).length
              }
            </strong>
          </div>

          <div className="dashboard-card">
            <h3>Pending Review</h3>

            <strong>
              {
                professionalsList.filter(
                  (p) => !p.verified
                ).length
              }
            </strong>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="booking-list">
            {professionalsList.map(
              (professional) => (
                <div
                  className="booking-card"
                  key={professional.id}
                >
                  <div>
                    <h3>
                      {professional.name}
                    </h3>

                    <p>
                      {professional.category}
                    </p>

                    <small>
                      {professional.location} •{" "}
                      {professional.experience} years
                    </small>
                  </div>

                  {professional.verified ? (
                    <span className="status accepted">
                      Verified
                    </span>
                  ) : (
                    <button
                      className="primary-btn"
                      onClick={() =>
                        verifyProfessional(
                          professional.id
                        )
                      }
                    >
                      Verify
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        </section>
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
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/professionals"
        element={<Professionals />}
      />

      <Route
        path="/book/:id"
        element={<Booking />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="*"
        element={<Home />}
      />
    </Routes>
  );
}

export default App;