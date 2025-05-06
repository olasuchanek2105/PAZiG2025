import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from "./auth/Login";
import Orders from "./listings/Orders";
import Account from './auth/Account';
import OrderDetails from './listings/OrderDetails';
import CreateListing from "./listings/CreateListing";
import { useNavigate } from "react-router-dom";

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

        <Link to="/create" style={styles.buttonAddListing}>
          Wystaw ogłoszenie
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
          <Route path="/create" element={<CreateListing />} />
        </Routes>
      </div>
    </Router>
  );
}

// Komponent strony głównej


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/listings?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div style={styles.heroWrapper}>
      {/* GÓRNA część – hero */}
      <div style={styles.hero}>
        <div style={styles.left}>
          <p style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <label>
            <strong style={{ color: "white" }}>Znajdź produkt</strong>
          </label>
          <input
            type="text"
            placeholder="🔍 Wyszukaj"
            style={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <img
          src="/homePage.png"
          alt="Ciśnieniomierz"
          style={styles.heroImage}
        />
      </div>

      {/* DOLNA część – popularne */}
      <div style={styles.popularSection}>
        <p style={styles.popularTitle}>Lub zobacz często wyszukiwane</p>
        <div style={styles.popularItems}>
          {[
            { label: "Kule medyczne", icon: "/popular/icon1.png" },
            { label: "Wózki inwalidzkie", icon: "/popular/icon2.png" },
            { label: "Chodzik", icon: "/popular/icon3.png" },
            { label: "Termometr", icon: "/popular/icon4.png" },
            { label: "Ciśnieniomierz", icon: "/popular/icon5.png" },
          ].map((item, i) => (
            <div key={i} style={styles.popularItem}>
              <img src={item.icon} alt={item.label} style={styles.popularIcon} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};


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
  buttonAddListing: {
    backgroundColor: "#1d4a94",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "40px",
  },
  heroWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    padding: "40px",
    backgroundColor: "#1d4a94",
    borderRadius: "20px",
    margin: "40px auto",
    width: "80%",
  },
  left: {
    flex: 1,
    color: "white",
    display: "flex",               // dodaj
    flexDirection: "column",       // dodaj
    alignItems: "flex-start",      // dodaj (żeby wyrównać do lewej)
  },
  text: {
    marginBottom: "35px",
    lineHeight: "1.6",
    fontSize: "13px",
    textAlign: "justify",
    width: "70%",
  },
  search: {
    padding: "12px 20px",
    borderRadius: "20px",
    border: "none",
    fontSize: "14px",
    width: "60%",
    marginTop: "20px",
  },
  heroImage: {
    flex: 1,
    maxWidth: "600px",
    borderRadius: "16px",
  },
  popularSection: {
    marginTop: "40px",
    textAlign: "left" as const,
    color: "white",
  },
  
  popularTitle: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  
  popularItems: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  
  popularItem: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "15px 20px",
    color: "black",
    textAlign: "center" as const,
    width: "100px",
    fontSize: "13px",
  },
  
  popularIcon: {
    width: "40px",
    height: "40px",
    marginBottom: "10px",
  },  
  

};

export default App;
