import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from "./auth/Login";
import Orders from "./listings/Orders"
import Account from './auth/Account';
import OrderDetails from './listings/OrderDetails';


function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <Router>
      <div className="App">
        {/* Nawigacja */}
        <nav style={styles.nav}>
          
          <Link to="/" style={styles.link}>Strona główna</Link>
          <Link to="/listings" style={styles.link}>Ogłoszenia</Link>
          {isLoggedIn ? (
  // Jeśli zalogowany → link bezpośrednio do konta
  <Link to="/account" style={styles.link}>Moje konto</Link>
) : (
  // Jeśli NIE jest zalogowany → rozwijane menu
  <div
    style={styles.dropdown}
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
  >
    <span style={styles.link}>Moje konto ⌄</span>
    {showDropdown && (
      <div style={styles.dropdownMenu}>
        <Link to="/login" style={styles.dropdownItem}>Logowanie</Link>
        <Link to="/register" style={styles.dropdownItem}>Rejestracja</Link>
        
      </div>
    )}
  </div>
)}


        </nav>

        {/* Ścieżki (routing) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<Orders />} />
          <Route path="/listings/:id" element={<OrderDetails />} />
          <Route path="/account" element={<Account />} />
          
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
const styles: { [key: string]: React.CSSProperties } = {
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
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#1d4a94",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
  },
  dropdownItem: {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    whiteSpace: "nowrap",
  },

};

export default App;
