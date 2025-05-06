import React, { useEffect, useState } from "react"; // Importujemy React i hook useState
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";




// Deklaracja komponentu Register jako funkcjonalny komponent Reacta
const Orders: React.FC = () => {
  // Stany do przechowywania danych z formularza
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";


    // Wysyłamy zapytanie POST do Django backendu (dj-rest-auth)
    useEffect(() => {
      const fetchListings = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/listings/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            const filtered = data.filter((listing: any) =>
              listing.title.toLowerCase().includes(searchQuery)
            );
            setListings(filtered);

          } else {
            const errorData = await response.json();
            setError("Błąd: " + JSON.stringify(errorData));
          }
        } catch (err) {
          setError("Błąd sieci: " + err);
        }
      };
  
      fetchListings();
    }, []);

    return (
      <div style={{ padding: "2rem" }}>
        <h2 style={styles.header}>
        Ogłoszenia
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <div style={styles.grid}>
          {listings.map((listing: any) => (
            <div key={listing.order_id} style={styles.card}>
              <h3>
                <Link to={`/listings/${listing.order_id}`} style={styles.link}>
                  {listing.title}
                </Link>
              </h3>
    
              <p style={styles.desc}>
                {listing.description.length > 80
                  ? listing.description.slice(0, 80) + "..."
                  : listing.description}
              </p>
              <p style={styles.price}>{listing.price} zł</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
    
    // Stylizacja komponentu (prosty system stylów jako obiekt JS)
    const styles = {
      header: {
        color: "white",
      },      
      page: {
        backgroundColor: "#1d4a94", // granatowe tło
        minHeight: "100vh",         // pełna wysokość ekranu
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      form: {
        backgroundColor: "#f4f8ff", // jasne tło formularza
        padding: "40px",
        borderRadius: "20px",
        width: "300px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "15px",
      },
      heading: {
        textAlign: "center" as const,
        marginBottom: "10px",
      },
      input: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
      },
      button: {
        padding: "10px",
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#1d4a94",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold" as const,
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "30px",
        marginTop: "20px",
        justifyItems: "center",
      },
      card: {
        border: "2px solid #1d4a94",
        borderRadius: "8px",
        padding: "12px",
        width: "180px",
        backgroundColor: "white",
        textAlign: "center" as const,
        transition: "transform 0.2s ease-in-out",
      },
      link: {
        textDecoration: "none",
        color: "#000",
        fontWeight: "bold" as const,
        fontSize: "15px",
      },
      desc: {
        fontSize: "12px",
        color: "#444",
        height: "60px",
        overflow: "hidden",
      },
      price: {
        fontWeight: "bold" as const,
        marginTop: "10px",
        color: "black",
      },
    };
    
export default Orders;
