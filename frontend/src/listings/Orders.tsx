import React, { useEffect, useState } from "react"; // Importujemy React i hook useState
import { Link } from "react-router-dom";




// Deklaracja komponentu Register jako funkcjonalny komponent Reacta
const Orders: React.FC = () => {
  // Stany do przechowywania danych z formularza
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

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
            setListings(data);
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
        <h2>Ogłoszenia</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {listings.map((listing: any) => (
            <li key={listing.order_id}>
              <h3>
                 <Link to={`/listings/${listing.order_id}`}>
                 {listing.title}
                 </Link>
              </h3>

              <p>Kategoria: {listing.category_id}</p>
              <p>Tytuł: {listing.title}</p>
              <p>Opis: {listing.description}</p>
              <p>Cena: {listing.price} zł</p>
              <p>Adres: {listing.address}</p>
              <p>Status: {listing.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
    
    // Stylizacja komponentu (prosty system stylów jako obiekt JS)
    const styles = {
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
    };
    
export default Orders;
