import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type Listings = {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    created_at: Date;
    status: string;
    producent?: string;
    image?: string;
  };

const ListingDetails: React.FC = () => {
    const{id} = useParams() 
    const [listing, setListing] = useState<Listings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      fetch(`http://localhost:8000/api/listings/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          setListing(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Błąd podczas pobierania danych ogłoszenia.");
          setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p>{error}</p>;
    if (!listing) return <p>Nie znaleziono ogłoszenia.</p>;

    return (
     <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>{listing.title}</h2>
  
        <div style={styles.main}>
          {/* Lewa kolumna */}
          <div style={styles.left}>
            {listing.image ? (
            <img src={listing.image} alt={listing.title} style={styles.image} />
          ) : (
            <div style={styles.imagePlaceholder}>Brak zdjęcia</div>
          )}

          </div>
  
          {/* Prawa kolumna */}
          <div style={styles.right}>
            <p style={styles.infoText}><strong>Cena:</strong> {listing.price} zł</p>
            <p style={styles.infoText}><strong>Stan:</strong> {listing.status}</p>
            <p style={styles.infoText}><strong>Producent:</strong> {listing.producent || "Nieznany"}</p>
  
            <button style={styles.button}>Zamów</button>
  
            <div style={styles.seller}>
              <p style={styles.infoText}><strong>Sprzedawca:</strong> Jan Kowalski</p>
              {/* Przyciski kontaktowe można dodać później */}
            </div>
          </div>
        </div>
  
        {/* Sekcja opisu */}
        <div style={styles.descriptionBox}>
          <h3>Opis</h3>
          <p>{listing.description}</p>
        </div>
      </div>
      </div> 
    );
  };

  export default ListingDetails;

// Stylizacja
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "white"
  },
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "2rem",
    textAlign: "left",
  },
  main: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
  },
  left: {
    flex: "1",
    minWidth: "250px",
  },
  infoText: {
    fontSize: "16px", // <- zmień na dowolną wartość
    marginBottom: "1px", // <- ustala odstęp między wierszami
  },
  imagePlaceholder: {
    width: "100%",
    height: "250px",
    backgroundColor: "#e5e5e5",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
    fontSize: "14px",
  },
  right: {
    flex: "1",
    minWidth: "250px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  button: {
    marginTop: "25px",
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#1d4a94",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    width: "250px"
    // alignSelf: "flex-start"
  },
  seller: {
    marginTop: "10px",
    fontSize: "14px",
  },
  descriptionBox: {
    backgroundColor: "#f0f7ff",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "30px",
  },
  image: {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "8px",
},
  
};


