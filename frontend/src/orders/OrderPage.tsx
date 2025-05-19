import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Listing = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

const OrderPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/listings/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Błąd podczas ładowania ogłoszenia.");
        setLoading(false);
      });
  }, [id]);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Zamówienie dla ${name} (${phone}) złożone!`);
    navigate("/listings");
  };

  if (loading) return <p>Ładowanie...</p>;
  if (!listing) return <p>Nie znaleziono ogłoszenia.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Zamawiasz: {listing.title}</h2>
      <p style={styles.price}>Cena: {listing.price} zł</p>
      {listing.image && <img src={listing.image} alt={listing.title} style={styles.image} />}

      <form onSubmit={handleOrder} style={styles.form}>
        <label>
          Imię i nazwisko:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          Telefon:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Zamów</button>
      </form>
    </div>
  );
};

export default OrderPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    gap: "30px",
  },
  image: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    margin: "20px 0",
  },
   price: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "40px", // <-- to dodaj
    },

    form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "50px", // <-- zwiększ do 80px, żeby efekt był bardziej widoczny
    },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#1d4a94",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  title: {
    marginTop: "40px",     // odstęp od obrazka
    marginBottom: "30px",  // odstęp nad formularzem
    fontSize: "24px",
  }
};
