import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from "./auth/Login";
import Orders from "./listings/Orders";
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
          <Link to="/" style={styles.link}>
          <img
            src="/home-icon3.png"
            alt="Strona Główna"
            style = {styles.homeIcon}
          />
          <span>Strona Główna</span>
          </Link>

          <Link to="/listings" style={styles.link}>
          <img
            src="/list-icon2.png"
            alt="Ogłoszenia"
            style={styles.listIcon}
          />
          <span>Ogłoszenia</span>
        </Link>


          <div
              style={styles.dropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {isLoggedIn ? (
                <Link to="/account" style={styles.link}>
                  <img src="/user-icon.png" alt="Profil" style={styles.userIcon} />
                  <span>Moje konto</span>
                </Link>
              ) : (
                <div style={styles.link}>
                  <img src="/user-icon.png" alt="Profil" style={styles.userIcon} />
                  <span>Moje konto</span>
                </div>
              )}

              {!isLoggedIn && showDropdown && (
                <div style={styles.dropdownMenu}>
                  <Link to="/login" style={styles.dropdownItem}>Logowanie</Link>
                  <Link to="/register" style={styles.dropdownItem}>Rejestracja</Link>
                </div>
              )}
            </div>

        </nav>

        {/* Ścieżki */}
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

// Komponent strony głównej
const Home = () => (
  <div>
    <h1 style={styles.heading}>Witaj w aplikacji!</h1>
    <p style={styles.paragraph}>Wybierz zakładkę z menu powyżej.</p>
  </div>
);

// Stylizacja
const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: "#eaf6ff",
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "black",
    textDecoration: "none",
    fontWeight: "lighter",
    fontSize: "15px",
  },
  dropdown: {
    position: "relative",
  },
  heading: {
    color: "#ffffff",
    fontSize: "28px",
  },
  paragraph: {
    color: "#ffffff",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#ffffff",            // białe tło
    border: "1px solid #D1E2FF",           // cienka ramka
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
    width: "130px",
  },
  dropdownItem: {
    color: "black",
    backgroundColor: "white",
    textDecoration: "none",
    padding: "10px 10px",
    whiteSpace: "nowrap",
    outline: "none",         // <=== KLUCZOWE
    border: "none",          // na wypadek resetowania stylów
  },
  userIcon: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  listIcon: {
    width: "18px",
    height: "18px",
    objectFit: "cover",
  },
  homeIcon:{
    width: "21px",
    height: "21px",
    objectFit: "cover",
  },
  

};

export default App;
