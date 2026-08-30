import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://sitesetu.onrender.com/api";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>SiteSetu</h1>
      <p>Find trusted professionals for your construction needs.</p>

      <h2>Available Services</h2>

      {services.length === 0 ? (
        <p>Loading services...</p>
      ) : (
        services.map((service) => (
          <div key={service.id}>
            <h3>{service.title}</h3>
            <p>
              <strong>Category:</strong> {service.category}
            </p>
            <p>{service.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      setMessage(res.data.message || "Login successful");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed. Please check your details."
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;