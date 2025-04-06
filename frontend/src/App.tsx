import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from "./auth/Login";
import Orders from "./auth/Orders"

function App() {
  return (
    <Router>
      <div className="App">
        {/* Nawigacja */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Strona główna</Link>
          <Link to="/register" style={styles.link}>Rejestracja</Link>
          <Link to="/login" style={styles.link}>Logowanie</Link>
          <Link to="/listings" style={styles.link}>Ogłoszenia</Link>
        </nav>

        {/* Ścieżki (routing) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

// Prosty komponent strony głównej
const Home = () => (
  <div>
    <h1>Witaj w aplikacji!</h1>
    <p>Wybierz zakładkę z menu powyżej.</p>
  </div>
);

// Styl nawigacji (opcjonalny)
const styles = {
  nav: {
    backgroundColor: "#1d4a94",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  }
};

export default App;
