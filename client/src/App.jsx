import React, { useMemo, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

const API = "https://sitesetu.onrender.com/api";

const KEY = {
  user: "sitesetuUser",
  bookings: "sitesetuBookings",
  projects: "sitesetuProjects",
  messages: "sitesetuMessages",
  notes: "sitesetuNotifications",
  profiles: "sitesetuProfiles",
};

const demoProfessionals = [
  {
    id: 1,
    name: "Rahul Sharma",
    category: "Architect",
    location: "Udaipur",
    experience: "8 Years",
    rating: "4.9",
    projects: "120+",
    price: 1500,
    icon: "🏛️",
    verified: true,
    about:
      "Residential architect specialising in modern homes, planning and 3D design.",
  },
  {
    id: 2,
    name: "Amit Verma",
    category: "Civil Engineer",
    location: "Jaipur",
    experience: "10 Years",
    rating: "4.8",
    projects: "180+",
    price: 1800,
    icon: "🏗️",
    verified: true,
    about:
      "Civil and structural consultant for residential construction and estimation.",
  },
  {
    id: 3,
    name: "Priya Mehta",
    category: "Interior Designer",
    location: "Delhi",
    experience: "6 Years",
    rating: "4.9",
    projects: "90+",
    price: 1200,
    icon: "🛋️",
    verified: true,
    about:
      "Interior designer focused on functional, premium and budget-friendly spaces.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    category: "Architect",
    location: "Jaipur",
    experience: "7 Years",
    rating: "4.7",
    projects: "75+",
    price: 1400,
    icon: "🏛️",
    verified: true,
    about:
      "Contemporary residential architect with end-to-end design support.",
  },
  {
    id: 5,
    name: "Neha Gupta",
    category: "Interior Designer",
    location: "Udaipur",
    experience: "5 Years",
    rating: "4.8",
    projects: "65+",
    price: 1100,
    icon: "🛋️",
    verified: true,
    about:
      "Home interiors, modular kitchens, furniture layouts and styling.",
  },
  {
    id: 6,
    name: "Rakesh Patel",
    category: "Civil Engineer",
    location: "Delhi",
    experience: "9 Years",
    rating: "4.8",
    projects: "140+",
    price: 1600,
    icon: "🏗️",
    verified: true,
    about:
      "Construction supervision, BOQ, estimation and structural coordination.",
  },
];

const serviceData = {
  Architect: {
    icon: "🏛️",
    title: "Architect Consultation",
    description:
      "Planning, design and residential consultation.",
    longDescription:
      "Connect with experienced architects for residential planning, floor plans, elevations, 3D concepts and complete design guidance for your project.",
  },
  "Civil Engineer": {
    icon: "🏗️",
    title: "Civil Engineering Inspection",
    description:
      "Construction quality and site inspection support.",
    longDescription:
      "Get professional civil engineering support for construction supervision, structural guidance, estimation, BOQ and quality inspection.",
  },
  "Interior Designer": {
    icon: "🛋️",
    title: "Interior Design Consultation",
    description:
      "Interior planning, finishing and design guidance.",
    longDescription:
      "Find interior designers for home interiors, furniture layouts, modular kitchens, materials, finishing and complete styling guidance.",
  },
};

function get(key, fallback = []) {
  try {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(fallback)
    );
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function currentUser() {
  return get(KEY.user, null);
}

/* =========================
   NAVBAR
========================= */

function Nav() {
  const user = currentUser();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <span className="logo-icon">S</span>
        SiteSetu
      </Link>

      <div className="navlinks">
        <Link to="/#services">Services</Link>
        <Link to="/#how">How It Works</Link>

        {user ? (
          <Link
            className="login-btn"
            to={
              user.role === "Professional"
                ? "/professional-dashboard"
                : "/homeowner-dashboard"
            }
          >
            Dashboard
          </Link>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}

        <Link className="primary-btn" to="/register">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

/* =========================
   HOME
========================= */

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    axios
      .get(`${API}/services`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServices(res.data);
        }
      })
      .catch(() => {
        // Demo services are used below
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const serviceCards =
    services.length > 0
      ? services.map((service) => ({
          category: service.category,
          title: service.title,
          description: service.description,
          icon:
            service.category === "Architect"
              ? "🏛️"
              : service.category === "Civil Engineer"
              ? "🏗️"
              : "🛋️",
        }))
      : [
          {
            category: "Architect",
            title: "Architect Consultation",
            description:
              "Planning, design and residential consultation.",
            icon: "🏛️",
          },
          {
            category: "Civil Engineer",
            title: "Civil Engineering Inspection",
            description:
              "Construction quality and site inspection support.",
            icon: "🏗️",
          },
          {
            category: "Interior Designer",
            title: "Interior Design Consultation",
            description:
              "Interior planning, finishing and design guidance.",
            icon: "🛋️",
          },
        ];

  return (
    <div>
      <Nav />

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
              href="#how"
              className="secondary-btn large"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-top">
            <span className="status-dot"></span>
            Trusted professionals
          </div>

          <div className="metric">3+</div>

          <div className="muted">
            Professional categories
          </div>

          <div className="mini-grid">
            <div>
              🏛️ <b>Architects</b>
            </div>

            <div>
              🏗️ <b>Civil Engineers</b>
            </div>

            <div>
              🛋️ <b>Interior Designers</b>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="section-heading">
          <span className="eyebrow">SERVICES</span>

          <h2>
            Everything for your next project.
          </h2>

          <p>
            From concept to construction, find the right
            professional and manage consultations in one place.
          </p>
        </div>

        {loading ? (
          <div className="loading">
            Loading services...
          </div>
        ) : (
          <div className="service-grid">
            {serviceCards.map((service) => (
              <article
                className="service-card"
                key={service.category}
              >
                <div className="icon">
                  {service.icon}
                </div>

                <span className="service-category">
                  {service.category}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                {/* IMPORTANT: SERVICE PAGE */}
                <Link
                  to={`/service/${encodeURIComponent(
                    service.category
                  )}`}
                  className="primary-btn"
                >
                  View Professionals →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section process">
        <div className="section-heading">
          <span className="eyebrow">
            HOW IT WORKS
          </span>

          <h2>
            Simple from start to finish.
          </h2>
        </div>

        <div className="steps">
          {[
            [
              "01",
              "Create your account",
              "Register as a homeowner or professional.",
            ],
            [
              "02",
              "Find a professional",
              "Search by category, name or location.",
            ],
            [
              "03",
              "Book a consultation",
              "Send your requirements and track the request.",
            ],
          ].map((step) => (
            <div key={step[0]}>
              <span>{step[0]}</span>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <b>SiteSetu</b>

        <span>
          Connecting homeowners with construction & design
          professionals.
        </span>
      </footer>
    </div>
  );
}

/* =========================
   SERVICE DETAILS PAGE
========================= */

function ServiceDetails() {
  const { category } = useParams();

  const serviceCategory = decodeURIComponent(category || "");

  const service =
    serviceData[serviceCategory] ||
    serviceData.Architect;

  return (
    <div className="dashboard-page">
      <Nav />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              SERVICE
            </span>

            <h1>
              {service.icon} {service.title}
            </h1>

            <p>
              {service.description}
            </p>
          </div>
        </div>

        <section className="dashboard-section-card">
          <div
            style={{
              fontSize: "64px",
              marginBottom: "15px",
            }}
          >
            {service.icon}
          </div>

          <h2>
            {service.title}
          </h2>

          <p
            style={{
              maxWidth: "750px",
              lineHeight: "1.8",
              fontSize: "17px",
            }}
          >
            {service.longDescription}
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            {/* NOW GO TO FILTERED PROFESSIONALS */}
            <Link
              to={`/professionals?category=${encodeURIComponent(
                serviceCategory
              )}`}
              className="primary-btn"
            >
              View {serviceCategory}s →
            </Link>

            <Link
              to="/services"
              className="secondary-btn"
            >
              All Services
            </Link>
          </div>
        </section>

        <section className="dashboard-section-card">
          <h2>
            What you can get
          </h2>

          <div className="steps">
            {serviceCategory === "Architect" && (
              <>
                <div>
                  <span>01</span>
                  <h3>Planning</h3>
                  <p>
                    Residential planning and floor plan
                    guidance.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <h3>Design</h3>
                  <p>
                    Elevations, concepts and 3D design
                    support.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <h3>Consultation</h3>
                  <p>
                    Discuss your project requirements with
                    an architect.
                  </p>
                </div>
              </>
            )}

            {serviceCategory === "Civil Engineer" && (
              <>
                <div>
                  <span>01</span>
                  <h3>Site Inspection</h3>
                  <p>
                    Construction quality and site
                    inspection support.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <h3>Estimation</h3>
                  <p>
                    BOQ, estimation and construction
                    guidance.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <h3>Supervision</h3>
                  <p>
                    Professional construction supervision
                    support.
                  </p>
                </div>
              </>
            )}

            {serviceCategory === "Interior Designer" && (
              <>
                <div>
                  <span>01</span>
                  <h3>Interior Planning</h3>
                  <p>
                    Functional room layouts and planning.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <h3>Materials</h3>
                  <p>
                    Material, furniture and finishing
                    guidance.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <h3>Styling</h3>
                  <p>
                    Complete interior styling and design
                    support.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================
   AUTH
========================= */

function Auth({ register = false }) {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Homeowner",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/auth/${register ? "register" : "login"}`,
        form
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Request failed"
        );
      }

      if (response.data.user) {
        save(KEY.user, response.data.user);
      }

      if (response.data.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      alert(
        register
          ? "Registration successful!"
          : "Login successful!"
      );

      const role =
        response.data.user?.role || form.role;

      if (role === "Professional") {
        nav("/professional-dashboard");
      } else if (role === "Admin") {
        nav("/admin");
      } else {
        nav("/homeowner-dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Request failed. Check backend."
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

        <h1>
          {register
            ? "Create Account"
            : "Welcome Back"}
        </h1>

        <p className="auth-subtitle">
          {register
            ? "Create your account to get started."
            : "Login to continue to your SiteSetu account."}
        </p>

        <form onSubmit={submit}>
          {register && (
            <>
              <label>Full Name</label>

              <input
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </>
          )}

          <label>Email Address</label>

          <input
            required
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <label>Password</label>

          <input
            required
            minLength="6"
            type="password"
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          {register && (
            <>
              <label>Account Type</label>

              <div className="role-grid">
                <button
                  type="button"
                  className={`role ${
                    form.role === "Homeowner"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "Homeowner",
                    })
                  }
                >
                  🏠
                  <strong>Homeowner</strong>
                  <small>Find professionals</small>
                </button>

                <button
                  type="button"
                  className={`role ${
                    form.role === "Professional"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setForm({
                      ...form,
                      role: "Professional",
                    })
                  }
                >
                  👷
                  <strong>Professional</strong>
                  <small>Offer your services</small>
                </button>
              </div>
            </>
          )}

          <button
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : register
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="auth-bottom">
          {register
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <Link
            to={register ? "/login" : "/register"}
          >
            {register ? "Login" : "Create Account"}
          </Link>
        </p>
      </div>
    </div>
  );
}

/* =========================
   PROFESSIONAL DIRECTORY
========================= */

function Professionals() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] =
    useState(initialCategory);

  const filtered = useMemo(() => {
    return demoProfessionals.filter(
      (professional) =>
        (category === "All" ||
          professional.category === category) &&
        `${professional.name} ${professional.category} ${professional.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, category]);

  const changeCategory = (value) => {
    setCategory(value);

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value,
      });
    }
  };

  return (
    <div className="dashboard-page">
      <Nav />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              PROFESSIONAL DIRECTORY
            </span>

            <h1>
              {category === "All"
                ? "Find your expert."
                : `Find a ${category}.`}
            </h1>

            <p>
              Compare verified professionals by
              expertise and location.
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="search-panel">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search name, category or location..."
          />

          <select
            value={category}
            onChange={(e) =>
              changeCategory(e.target.value)
            }
          >
            <option>All</option>
            <option>Architect</option>
            <option>Civil Engineer</option>
            <option>Interior Designer</option>
          </select>
        </div>

        {/* CATEGORY TITLE */}
        {category !== "All" && (
          <section
            className="dashboard-section-card"
            style={{
              marginBottom: "25px",
            }}
          >
            <h2>
              {serviceData[category]?.icon}{" "}
              {serviceData[category]?.title}
            </h2>

            <p>
              {serviceData[category]?.description}
            </p>
          </section>
        )}

        {/* PROFESSIONALS */}
        <div className="professional-grid">
          {filtered.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              p={professional}
            />
          ))}
        </div>

        {!filtered.length && (
          <Empty
            title="No professionals found"
            text="Try another search or category."
            icon="🔍"
          />
        )}
      </main>
    </div>
  );
}

/* =========================
   PROFESSIONAL CARD
========================= */

function ProfessionalCard({ p }) {
  return (
    <article className="professional-card">
      <div className="professional-top">
        <div className="professional-avatar">
          {p.icon}
        </div>

        {p.verified && (
          <span className="verified">
            ✓ Verified
          </span>
        )}
      </div>

      <h2>{p.name}</h2>

      <p className="professional-category">
        {p.category}
      </p>

      <p>{p.about}</p>

      <div className="professional-details">
        <span>📍 {p.location}</span>
        <span>⭐ {p.rating}</span>
        <span>💼 {p.experience}</span>
      </div>

      <div className="professional-bottom">
        <strong>
          ₹{p.price}
          <small>/consultation</small>
        </strong>

        <Link
          to={`/book/${p.id}`}
          className="primary-btn"
        >
          Book
        </Link>
      </div>
    </article>
  );
}

/* =========================
   BOOKING
========================= */

function Booking() {
  const { id } = useParams();

  const professional =
    demoProfessionals.find(
      (x) => x.id === Number(id)
    ) || demoProfessionals[0];

  const user = currentUser();
  const nav = useNavigate();

  const [form, setForm] = useState({
    date: "",
    time: "",
    description: "",
    budget: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (!user) {
      alert(
        "Please login before booking."
      );

      nav("/login");
      return;
    }

    const booking = {
      id: Date.now(),
      professionalId: professional.id,
      professional: professional.name,
      professionalEmail:
        `${professional.name
          .toLowerCase()
          .replace(/ /g, ".")}@sitesetu.demo`,
      homeowner: user.name,
      homeownerEmail: user.email,
      service: professional.category,
      date: form.date,
      time: form.time,
      description: form.description,
      budget: form.budget,
      status: "Pending",
      created: new Date().toLocaleDateString(),
    };

    const bookings = get(KEY.bookings, []);

    bookings.push(booking);

    save(KEY.bookings, bookings);

    const notifications = get(
      KEY.notes,
      []
    );

    notifications.push({
      id: Date.now() + 1,
      email: user.email,
      title: "Booking request sent",
      message: `Your consultation request was sent to ${professional.name}.`,
      time: new Date().toLocaleString(),
    });

    save(KEY.notes, notifications);

    alert(
      "Consultation request sent successfully!"
    );

    nav(
      "/homeowner-dashboard?tab=bookings"
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-card booking-form">
        <Link
          to={`/professionals?category=${encodeURIComponent(
            professional.category
          )}`}
          className="auth-logo"
        >
          ← Back to Professionals
        </Link>

        <div className="professional-avatar big">
          {professional.icon}
        </div>

        <h1>
          Book {professional.name}
        </h1>

        <p className="auth-subtitle">
          {professional.category} •{" "}
          {professional.location} • ⭐{" "}
          {professional.rating}
        </p>

        <form onSubmit={submit}>
          <label>
            Preferred Date
          </label>

          <input
            type="date"
            required
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          <label>
            Preferred Time
          </label>

          <input
            type="time"
            required
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
          />

          <label>
            Project Requirements
          </label>

          <textarea
            required
            placeholder="Tell the professional about your project..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <label>
            Budget (optional)
          </label>

          <input
            placeholder="e.g. ₹5,00,000"
            value={form.budget}
            onChange={(e) =>
              setForm({
                ...form,
                budget: e.target.value,
              })
            }
          />

          <button className="auth-button">
            Request Consultation
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================
   DASHBOARD SHELL
========================= */

function DashboardShell({
  children,
  title = "Professional Panel",
}) {
  const nav = useNavigate();
  const user = currentUser() || {};

  const logout = () => {
    localStorage.removeItem(
      KEY.user
    );

    localStorage.removeItem(
      "token"
    );

    nav("/");
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <Link
          to="/"
          className="brand"
        >
          <span className="logo-icon">
            S
          </span>
          SiteSetu
        </Link>

        <div className="dashboard-user">
          <span>
            👤 {user.name || "User"}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-title">
        <h2>{title}</h2>
      </div>

      <div className="dashboard-tabs">
        <Link
          to={
            user.role === "Professional"
              ? "/professional-dashboard"
              : "/homeowner-dashboard"
          }
        >
          Overview
        </Link>

        <Link
          to={
            user.role === "Professional"
              ? "/professional-dashboard?tab=profile"
              : "/homeowner-dashboard?tab=profile"
          }
        >
          My Profile
        </Link>

        <Link
          to={
            user.role === "Professional"
              ? "/professional-dashboard?tab=projects"
              : "/homeowner-dashboard?tab=projects"
          }
        >
          Projects
        </Link>

        <Link
          to={
            user.role === "Professional"
              ? "/professional-dashboard?tab=bookings"
              : "/homeowner-dashboard?tab=bookings"
          }
        >
          Bookings
        </Link>

        <Link
          to="/homeowner-dashboard?tab=messages"
        >
          Messages
        </Link>

        <Link
          to="/homeowner-dashboard?tab=notifications"
        >
          Notifications
        </Link>
      </div>

      {children}
    </div>
  );
}

/* =========================
   PROFESSIONAL DASHBOARD
========================= */

function ProfessionalDashboard() {
  const user = currentUser() || {};

  const [tab, setTab] = useState(
    new URLSearchParams(
      window.location.search
    ).get("tab") || "overview"
  );

  const [profile, setProfile] =
    useState(() => {
      const profiles = get(
        KEY.profiles,
        {}
      );

      return (
        profiles[user.email] || {
          category: "Architect",
          experience: "5+ Years",
          location: "Udaipur",
          phone: "",
          skills:
            "Residential Design, Planning, 3D Design",
          about:
            "Experienced construction and design professional helping homeowners with residential projects.",
        }
      );
    });

  const [saved, setSaved] =
    useState(false);

  const bookings = get(
    KEY.bookings,
    []
  ).filter(
    (b) =>
      b.professionalEmail ===
      user.email
  );

  const projects = get(
    KEY.projects,
    []
  ).filter(
    (p) =>
      p.professionalEmail ===
      user.email
  );

  const notes = get(
    KEY.notes,
    []
  ).filter(
    (n) =>
      n.email === user.email
  );

  const setTab2 = (value) => {
    setTab(value);

    window.history.replaceState(
      {},
      "",
      `/professional-dashboard${
        value === "overview"
          ? ""
          : `?tab=${value}`
      }`
    );
  };

  const saveProfile = () => {
    const all = get(
      KEY.profiles,
      {}
    );

    all[user.email] = profile;

    save(KEY.profiles, all);

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      1800
    );
  };

  const status = (
    bookingId,
    newStatus
  ) => {
    const all = get(
      KEY.bookings,
      []
    );

    const booking = all.find(
      (b) =>
        b.id === bookingId
    );

    if (booking) {
      booking.status =
        newStatus;
    }

    save(KEY.bookings, all);

    window.location.reload();
  };

  return (
    <DashboardShell>
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              PROFESSIONAL DASHBOARD
            </span>

            <h1>
              Welcome,{" "}
              {user.name ||
                "Professional"}{" "}
              👋
            </h1>

            <p>
              Manage your profile,
              projects and consultation
              requests.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setTab2("profile")
            }
          >
            Edit Profile
          </button>
        </div>

        <div className="dashboard-grid">
          <Stat
            icon="📁"
            n={projects.length}
            t="Active Projects"
          />

          <Stat
            icon="📅"
            n={bookings.length}
            t="Bookings"
          />

          <Stat
            icon="💬"
            n={notes.length}
            t="Messages"
          />
        </div>

        <div className="dashboard-tabs inner-tabs">
          {[
            ["overview", "Overview"],
            ["profile", "My Profile"],
            ["projects", "Projects"],
            ["bookings", "Bookings"],
            ["notifications", "Notifications"],
          ].map((item) => (
            <button
              key={item[0]}
              className={
                tab === item[0]
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTab2(item[0])
              }
            >
              {item[1]}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <section className="dashboard-section-card">
              <h2>
                Quick Actions
              </h2>

              <div className="quick-grid">
                <button
                  onClick={() =>
                    setTab2("profile")
                  }
                >
                  ✏️ Update Profile
                </button>

                <button
                  onClick={() =>
                    setTab2("projects")
                  }
                >
                  📁 Manage Projects
                </button>

                <button
                  onClick={() =>
                    setTab2("bookings")
                  }
                >
                  📅 Review Bookings
                </button>
              </div>
            </section>

            <section className="dashboard-section-card">
              <h2>
                Recent Requests
              </h2>

              {bookings.length ? (
                <BookingList
                  bookings={bookings}
                  professional
                  onStatus={status}
                />
              ) : (
                <Empty
                  title="No consultation requests"
                  text="New homeowner requests will appear here."
                  icon="📅"
                />
              )}
            </section>
          </>
        )}

        {tab === "profile" && (
          <section className="dashboard-section-card">
            <h2>
              Professional Profile
            </h2>

            <div className="profile-form">
              <Field
                label="Full Name"
                value={user.name || ""}
                disabled
              />

              <Field
                label="Email"
                value={user.email || ""}
                disabled
              />

              <label>
                Professional Category

                <select
                  value={profile.category}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      category:
                        e.target.value,
                    })
                  }
                >
                  <option>
                    Architect
                  </option>

                  <option>
                    Civil Engineer
                  </option>

                  <option>
                    Interior Designer
                  </option>
                </select>
              </label>

              <label>
                Experience

                <select
                  value={
                    profile.experience
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      experience:
                        e.target.value,
                    })
                  }
                >
                  <option>
                    1-2 Years
                  </option>

                  <option>
                    3-5 Years
                  </option>

                  <option>
                    5+ Years
                  </option>

                  <option>
                    10+ Years
                  </option>
                </select>
              </label>

              <Field
                label="Location"
                value={
                  profile.location
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    location:
                      e.target.value,
                  })
                }
              />

              <Field
                label="Phone"
                value={
                  profile.phone
                }
                placeholder="Enter phone number"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone:
                      e.target.value,
                  })
                }
              />

              <label className="full-width">
                Skills

                <input
                  value={
                    profile.skills
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills:
                        e.target.value,
                    })
                  }
                />
              </label>

              <label className="full-width">
                About

                <textarea
                  value={
                    profile.about
                  }
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      about:
                        e.target.value,
                    })
                  }
                />
              </label>

              <div className="full-width">
                <button
                  className="save-profile-btn"
                  onClick={
                    saveProfile
                  }
                >
                  {saved
                    ? "✓ Profile Saved"
                    : "Save Profile"}
                </button>
              </div>
            </div>
          </section>
        )}

        {tab === "projects" && (
          <Projects
            professionalEmail={
              user.email
            }
          />
        )}

        {tab === "bookings" && (
          <section className="dashboard-section-card">
            <h2>
              Consultation Bookings
            </h2>

            {bookings.length ? (
              <BookingList
                bookings={bookings}
                professional
                onStatus={status}
              />
            ) : (
              <Empty
                title="No bookings yet"
                text="Homeowner requests will appear here."
                icon="📅"
              />
            )}
          </section>
        )}

        {tab === "notifications" && (
          <section className="dashboard-section-card">
            <h2>
              Notifications
            </h2>

            {notes.length ? (
              notes.map((note) => (
                <div
                  className="notification"
                  key={note.id}
                >
                  <b>
                    {note.title}
                  </b>

                  <p>
                    {note.message}
                  </p>

                  <small>
                    {note.time}
                  </small>
                </div>
              ))
            ) : (
              <Empty
                title="All caught up"
                text="New bookings, messages and platform updates will appear here."
                icon="🔔"
              />
            )}
          </section>
        )}
      </main>
    </DashboardShell>
  );
}

/* =========================
   HOMEOWNER DASHBOARD
========================= */

function HomeownerDashboard() {
  const user = currentUser() || {};

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [tab, setTab] =
    useState(
      new URLSearchParams(
        window.location.search
      ).get("tab") || "overview"
    );

  const bookings = get(
    KEY.bookings,
    []
  ).filter(
    (b) =>
      b.homeownerEmail ===
      user.email
  );

  const notes = get(
    KEY.notes,
    []
  ).filter(
    (n) =>
      n.email === user.email
  );

  const filtered =
    demoProfessionals.filter(
      (p) =>
        (category === "All" ||
          p.category === category) &&
        `${p.name} ${p.category} ${p.location}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const setTab2 = (value) => {
    setTab(value);

    window.history.replaceState(
      {},
      "",
      `/homeowner-dashboard${
        value === "overview"
          ? ""
          : `?tab=${value}`
      }`
    );
  };

  return (
    <DashboardShell title="Homeowner Panel">
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              HOMEOWNER DASHBOARD
            </span>

            <h1>
              Find the right
              professional.
            </h1>

            <p>
              Search, compare and book
              trusted construction experts.
            </p>
          </div>

          <Link
            className="primary-btn"
            to="/professionals"
          >
            Browse Professionals
          </Link>
        </div>

        <div className="dashboard-grid">
          <Stat
            icon="📁"
            n={
              bookings.filter(
                (b) =>
                  b.status ===
                  "Accepted"
              ).length
            }
            t="Active Projects"
          />

          <Stat
            icon="📅"
            n={bookings.length}
            t="Bookings"
          />

          <Stat
            icon="💬"
            n={notes.length}
            t="Messages"
          />
        </div>

        <div className="dashboard-tabs inner-tabs">
          {[
            ["overview", "Overview"],
            ["profile", "My Profile"],
            ["projects", "Projects"],
            ["bookings", "Bookings"],
            ["messages", "Messages"],
            ["notifications", "Notifications"],
          ].map((item) => (
            <button
              key={item[0]}
              className={
                tab === item[0]
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTab2(item[0])
              }
            >
              {item[1]}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="search-panel">
              <input
                placeholder="Search by name, category or location..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >
                <option>
                  All
                </option>

                <option>
                  Architect
                </option>

                <option>
                  Civil Engineer
                </option>

                <option>
                  Interior Designer
                </option>
              </select>
            </div>

            <section className="dashboard-section-card">
              <h2>
                Recommended Professionals
              </h2>

              <div className="professional-grid">
                {filtered.map(
                  (professional) => (
                    <ProfessionalCard
                      key={
                        professional.id
                      }
                      p={professional}
                    />
                  )
                )}
              </div>

              {!filtered.length && (
                <Empty
                  title="No professionals found"
                  text="Try another search or category."
                />
              )}
            </section>
          </>
        )}

        {tab === "profile" && (
          <section className="dashboard-section-card">
            <h2>
              My Profile
            </h2>

            <p>
              Your account is ready.
              You can update your
              professional preferences
              during booking.
            </p>

            <div className="profile-summary">
              <b>{user.name}</b>
              <span>{user.email}</span>
              <span>
                🏠 Homeowner
              </span>
            </div>
          </section>
        )}

        {tab === "projects" && (
          <Projects
            homeownerEmail={
              user.email
            }
          />
        )}

        {tab === "bookings" && (
          <section className="dashboard-section-card">
            <h2>
              My Bookings
            </h2>

            {bookings.length ? (
              <BookingList
                bookings={bookings}
              />
            ) : (
              <Empty
                title="No bookings yet"
                text="Find a professional and request your first consultation."
                icon="📅"
              />
            )}
          </section>
        )}

        {tab === "messages" && (
          <Messages
            email={user.email}
          />
        )}

        {tab === "notifications" && (
          <section className="dashboard-section-card">
            <h2>
              Notifications
            </h2>

            {notes.length ? (
              notes.map((note) => (
                <div
                  className="notification"
                  key={note.id}
                >
                  <b>
                    {note.title}
                  </b>

                  <p>
                    {note.message}
                  </p>

                  <small>
                    {note.time}
                  </small>
                </div>
              ))
            ) : (
              <Empty
                title="All caught up"
                text="New bookings, messages and platform updates will appear here."
                icon="🔔"
              />
            )}
          </section>
        )}
      </main>
    </DashboardShell>
  );
}

/* =========================
   BOOKING LIST
========================= */

function BookingList({
  bookings,
  professional,
  onStatus,
}) {
  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <div
          className="booking-item"
          key={booking.id}
        >
          <div>
            <h3>
              {professional
                ? booking.homeowner
                : booking.professional}
            </h3>

            <p>
              {booking.service} •{" "}
              {booking.date} at{" "}
              {booking.time}
            </p>

            <p>
              {booking.description}
            </p>

            {booking.budget && (
              <small>
                Budget:{" "}
                {booking.budget}
              </small>
            )}
          </div>

          <div className="booking-actions">
            <span
              className={`status ${booking.status.toLowerCase()}`}
            >
              {booking.status}
            </span>

            {professional &&
              booking.status ===
                "Pending" && (
                <>
                  <button
                    className="small-btn"
                    onClick={() =>
                      onStatus(
                        booking.id,
                        "Accepted"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="small-btn danger"
                    onClick={() =>
                      onStatus(
                        booking.id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                </>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================
   PROJECTS
========================= */

function Projects({
  homeownerEmail,
  professionalEmail,
}) {
  const [items, setItems] =
    useState(() =>
      get(
        KEY.projects,
        []
      ).filter(
        (project) =>
          (homeownerEmail &&
            project.homeownerEmail ===
              homeownerEmail) ||
          (professionalEmail &&
            project.professionalEmail ===
              professionalEmail)
      )
    );

  const [name, setName] =
    useState("");

  const add = () => {
    if (!name.trim()) return;

    const project = {
      id: Date.now(),
      name,
      status: "Planning",
      progress: 10,
      homeownerEmail,
      professionalEmail,
    };

    const all = get(
      KEY.projects,
      []
    );

    all.push(project);

    save(KEY.projects, all);

    setItems([
      ...items,
      project,
    ]);

    setName("");
  };

  return (
    <section className="dashboard-section-card">
      <div className="section-row">
        <div>
          <h2>
            Projects
          </h2>

          <p>
            Track your construction
            and design projects.
          </p>
        </div>

        <div className="add-row">
          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="New project name"
          />

          <button
            className="primary-btn"
            onClick={add}
          >
            + Add Project
          </button>
        </div>
      </div>

      {items.length ? (
        <div className="project-list">
          {items.map((project) => (
            <div
              className="project-item"
              key={project.id}
            >
              <div>
                <h3>
                  {project.name}
                </h3>

                <span>
                  {project.status}
                </span>
              </div>

              <div className="progress">
                <i
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>

              <b>
                {project.progress}%
              </b>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          title="No projects yet"
          text="Create a project to start tracking progress."
          icon="📁"
        />
      )}
    </section>
  );
}

/* =========================
   MESSAGES
========================= */

function Messages({ email }) {
  const [text, setText] =
    useState("");

  const [messages, setMessages] =
    useState(() =>
      get(
        KEY.messages,
        []
      ).filter(
        (message) =>
          message.email ===
          email
      )
    );

  const send = () => {
    if (!text.trim()) return;

    const message = {
      id: Date.now(),
      email,
      text,
      from: "You",
      time: new Date().toLocaleTimeString(),
    };

    const all = get(
      KEY.messages,
      []
    );

    all.push(message);

    save(KEY.messages, all);

    setMessages([
      ...messages,
      message,
    ]);

    setText("");
  };

  return (
    <section className="dashboard-section-card">
      <h2>
        Messages
      </h2>

      <div className="chat-box">
        {messages.length ? (
          messages.map(
            (message) => (
              <div
                className="chat-msg"
                key={message.id}
              >
                <b>
                  {message.from}
                </b>

                <p>
                  {message.text}
                </p>

                <small>
                  {message.time}
                </small>
              </div>
            )
          )
        ) : (
          <Empty
            title="No messages"
            text="Your professional conversations will appear here."
            icon="💬"
          />
        )}
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Write a message..."
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              send();
            }
          }}
        />

        <button
          className="primary-btn"
          onClick={send}
        >
          Send
        </button>
      </div>
    </section>
  );
}

/* =========================
   ADMIN
========================= */

function Admin() {
  const [list, setList] =
    useState(
      demoProfessionals
    );

  const verify = (id) => {
    setList(
      list.map((professional) =>
        professional.id === id
          ? {
              ...professional,
              verified: true,
            }
          : professional
      )
    );
  };

  return (
    <DashboardShell title="Admin Panel">
      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">
              ADMIN PANEL
            </span>

            <h1>
              Verification Dashboard
            </h1>

            <p>
              Review professional
              profiles and platform
              activity.
            </p>
          </div>
        </div>

        <div className="dashboard-grid">
          <Stat
            icon="👷"
            n={list.length}
            t="Professionals"
          />

          <Stat
            icon="✓"
            n={
              list.filter(
                (p) => p.verified
              ).length
            }
            t="Verified"
          />

          <Stat
            icon="⏳"
            n={
              list.filter(
                (p) => !p.verified
              ).length
            }
            t="Pending Review"
          />
        </div>

        <section className="dashboard-section-card">
          <h2>
            Professional Verification
          </h2>

          <div className="booking-list">
            {list.map(
              (professional) => (
                <div
                  className="booking-item"
                  key={professional.id}
                >
                  <div>
                    <h3>
                      {
                        professional.name
                      }
                    </h3>

                    <p>
                      {
                        professional.category
                      }{" "}
                      •{" "}
                      {
                        professional.location
                      }{" "}
                      •{" "}
                      {
                        professional.experience
                      }
                    </p>
                  </div>

                  {professional.verified ? (
                    <span className="status accepted">
                      ✓ Verified
                    </span>
                  ) : (
                    <button
                      className="primary-btn"
                      onClick={() =>
                        verify(
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
    </DashboardShell>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function Stat({ icon, n, t }) {
  return (
    <div className="dashboard-card">
      <span className="dashboard-icon">
        {icon}
      </span>

      <strong>{n}</strong>

      <h3>{t}</h3>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <label>
      {label}

      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </label>
  );
}

function Empty({
  title,
  text,
  icon,
}) {
  return (
    <div className="empty-state">
      {icon && (
        <div className="empty-section-icon">
          {icon}
        </div>
      )}

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

/* =========================
   ROUTES
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
        element={<Auth />}
      />

      <Route
        path="/register"
        element={<Auth register />}
      />

      {/* NEW SERVICE PAGES */}
      <Route
        path="/service/:category"
        element={<ServiceDetails />}
      />

      {/* PROFESSIONAL DIRECTORY */}
      <Route
        path="/professionals"
        element={<Professionals />}
      />

      {/* BOOKING */}
      <Route
        path="/book/:id"
        element={<Booking />}
      />

      {/* DASHBOARDS */}
      <Route
        path="/professional-dashboard"
        element={<ProfessionalDashboard />}
      />

      <Route
        path="/homeowner-dashboard"
        element={<HomeownerDashboard />}
      />

      <Route
        path="/dashboard"
        element={<HomeownerDashboard />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      {/* ALL SERVICES */}
      <Route
        path="/services"
        element={<Professionals />}
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={<Home />}
      />
    </Routes>
  );
}

export default App;