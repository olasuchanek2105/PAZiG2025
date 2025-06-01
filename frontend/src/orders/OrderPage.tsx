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
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");


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

const handleOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("authToken");
  

  if (!token) {
    alert("Musisz być zalogowany, aby złożyć zamówienie.");
    return;
  }

  const orderData = {
    listing: listing?.id,
    name,
    phone,
    email,
    street,
    postal_code: postalCode,
    city,
    notes,
  };

  try {
    const response = await fetch("http://localhost:8000/api/orders/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("Zamówienie zostało złożone!");
      navigate("/konto"); // np. strona historii zamówień
    } else {
      const errorData = await response.json();
      console.error(errorData);
      alert("Nie udało się złożyć zamówienia.");
    }
  } catch (err) {
    console.error(err);
    alert("Wystąpił błąd sieci.");
  }
};


  if (loading) return <p>Ładowanie...</p>;
  if (!listing) return <p>Nie znaleziono ogłoszenia.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Zamawiasz: {listing.title}</h2>
      <p style={styles.price}>Cena: {listing.price} zł</p>
      {listing.image && <img src={listing.image} alt={listing.title} style={styles.image} />}

      <form onSubmit={handleOrder} style={styles.form}>

        <div style={styles.formGroup}>
        <label>
          Imię i nazwisko:
        </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        
        </div>

        <div style={styles.formGroup}>
        <label>
          Telefon:
        </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
        
        </div>


        <div style={styles.formGroup}>
        <label>
          Email:
        </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        
      </div>


        <div style={styles.formGroup}>
        <label>
          Ulica i numer:
        </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            style={styles.input}
          />
        
        </div>

        <div style={styles.formGroup}>
        <label>
          Kod pocztowy:
        </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            style={styles.input}
          />
        
        </div>

        <div style={styles.formGroup}>
        <label>
          Miasto:
        </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={styles.input}
          />
        
        </div>

        <div style={styles.formGroup}>
        <label>
          Uwagi do zamówienia:
        </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ ...styles.input, height: "80px", resize: "vertical" }}
          />
        
        </div>

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
    alignItems: "center", // wyśrodkuj formularz
    gap: "15px",
    marginTop: "50px",
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
    width: "200px"
  },
  title: {
    marginTop: "40px",     // odstęp od obrazka
    marginBottom: "30px",  // odstęp nad formularzem
    fontSize: "24px",
  },
  formGroup: {
  display: "flex",
  flexDirection: "column",
  width: "100%",         // pozwala inputom rozciągać się na całą szerokość kontenera
  maxWidth: "400px",     // ogranicz maksymalnie do 400px, żeby nie były za szerokie
  textAlign: "left",     // wyrównaj label do lewej
},
};
