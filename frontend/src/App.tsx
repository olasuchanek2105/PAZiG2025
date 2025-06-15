import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login from "./auth/Login";
import Listings from "./listings/Listings";
import Account from './auth/Account';
import ListingDetails from './listings/ListingDetails';
import CreateListing from "./listings/CreateListing";
import OrderPage from "./orders/OrderPage";
import EditListing from "./listings/EditListing";
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
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/listings/:id/order" element={<OrderPage />} />
          <Route path="/listings/edit/:listingId" element={<EditListing />} />
        </Routes>
      </div>
    </Router>
  );
}

// Komponent strony głównej


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  type Listing = {
  listing_id: string;
  title: string;
  price: string;
  image: string;
};

const [randomListings, setRandomListings] = useState<Listing[]>([]);
useEffect(() => {
  fetch("http://localhost:8000/api/listings/")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setRandomListings(shuffled.slice(0, 5));
      } else {
        console.error("Dane nie są tablicą:", data);
        setRandomListings([]); // fallback na pustą tablicę
      }
    })
    .catch((err) => {
      console.error("Błąd pobierania ogłoszeń:", err);
      setRandomListings([]); // fallback
    });
}, []);


  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/listings?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (


  <div>
    <div style={styles.heroWrapper}>
      {/* GÓRNA część – hero */}
      <div style={styles.hero}>
        <div style={styles.left}>
          <p style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <label>
            <strong style={{ color: "white", fontSize: "25px" }}>Znajdź produkt</strong>
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
          src="/Doctor.png"
          alt="Ciśnieniomierz"
          style={styles.heroImage}
        />
      </div>


    </div>

    <div style={styles.popularWrapper}>
      <img
        src="/homePageTlo.png"
        alt="Medical background"
        style={styles.fullWidthImage}
      />

      <div style={styles.popularOverlay}>
        <p style={styles.popularTitle}>Lub zobacz często wyszukiwane</p>
        <div style={styles.popularItems}>
          {[
            { label: "Sprzęt ortopedyczny i rehabilitacyjny", icon: "/orthopedics.png" },
            { label: "Diagnostyka i pomiary", icon: "/diagnostic.png" },
            { label: "Wyposażenie domowe", icon: "/nursing-home.png" },
            { label: "Higiena i ochrona osobista", icon: "/washing-hands.png" },
            { label: "Sprzęt pomocniczy", icon: "/hearing-aid.png" },
            { label: "Pielęgnacja", icon: "/healthcare.png" },
          ].map((item, i) => (
          <Link
            key={i}
            to={`/listings?category=${encodeURIComponent(item.label)}`}
            style={{ ...styles.popularItem, textDecoration: "none", color: "inherit" }}
          >
            <img src={item.icon} alt={item.label} style={styles.popularIcon} />
            <span>{item.label}</span>
          </Link>

          ))}
        </div>
            {/* Popularne ogłoszenia */}
            <div style={styles.popularListingsSection}>
              <h2 style={styles.popularListingsTitle}>Nowości</h2>
            <div style={styles.popularListingsItems}>
              {randomListings.map((item, i) => (
                <Link to={`/listings/${item.listing_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div key={i} style={styles.popularListingCard}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.popularListingImage}
                  />
                  <h4 style={styles.popularListingTitle}>{item.title}</h4>
                  <p style={styles.popularListingPrice}>{item.price} zł</p>
                </div>
                </Link>
              ))}
            </div>

          </div>      
      </div>
      
    </div>
</div>
  );
  
};


// Stylizacja
const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: "white",
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    borderRadius: "40px",
    width: "60%",
    margin: "20px auto 0 auto",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "black",
    textDecoration: "none",
    fontWeight: "lighter",
    fontSize: "20px",
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
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between", // wcześniej było space-between
    alignItems: "center",
    gap: "30px",
  },

  heroWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    padding: "40px",
    backgroundColor: "#237fd4",
    borderRadius: "0px",
    width: "90%",
    // maxWidth: "1200px",
    margin: "20px auto",
  },
  left: {
    flex: 1,
    color: "white",
    display: "flex",            
    flexDirection: "column",       
    alignItems: "flex-start",
    marginLeft: "60px"     
  },
  text: {
    marginBottom: "70px",
    lineHeight: "1.6",
    fontSize: "20px",
    textAlign: "justify",
    width: "70%",
  },
  search: {
    padding: "12px 20px",
    borderRadius: "20px",
    border: "none",
    fontSize: "14px",
    width: "50%",
    marginTop: "30px",
  },
  heroImage: {                   
    maxWidth: "600px",
    width: "100%",
    borderRadius: "16px",
    objectFit: "contain",
    marginRight: "160px",
    marginTop: "30px"
  },
  popularSection: {
    marginTop: "40px",
    textAlign: "left" as const,
    color: "white",
  },
  
  popularTitle: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
  },

  popularItems: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  
  popularItem: {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "15px 20px",
    color: "black",
    textAlign: "center" as const,
    width: "120px",
    height: "150px",
    fontSize: "13px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
 popularIcon: {
    width: "40px",
    height: "40px",
    marginBottom: "10px",
    objectFit: "contain",
  },
  fullWidthImage: {
    width: "100%",
    height: "auto",
    display: "block",
    opacity: 0.5,
  },
 popularWrapper: {
    position: "relative",
    width: "100%",
  },
popularOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "50px 30px",
    borderRadius: "25px",
    width: "90%",
    maxWidth: "1300px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    color: "black",
    textAlign: "center" as const,
  },

  popularListingsSection: {
  marginTop: "60px",
  padding: "40px 20px",
  backgroundColor: "#f4f9ff",
  borderRadius: "20px",
  textAlign: "center" as const,
},

popularListingsTitle: {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "30px",
},

popularListingsItems: {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
},

popularListingCard: {
  backgroundColor: "white",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  width: "200px",
  textAlign: "center" as const,
},
  popularListingImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  popularListingTitle: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "10px",
  },

  popularListingPrice: {
    color: "#1d4a94",
    fontWeight: "bold",
  },

};

export default App;
