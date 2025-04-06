import React, { useState } from "react"; // Importujemy React i hook useState

// Deklaracja komponentu Register jako funkcjonalny komponent Reacta
const Register: React.FC = () => {
  // Stany do przechowywania danych z formularza
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(""); // Komunikat o błędzie lub sukcesie

  // Funkcja obsługująca kliknięcie przycisku "Zarejestruj"
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Zapobiegamy przeładowaniu strony

    // Wysyłamy zapytanie POST do Django backendu (dj-rest-auth)
    const response = await fetch("http://localhost:8000/api/auth/registration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password1,
        password2,
      }),
    });

    const data = await response.json(); // Odbieramy odpowiedź jako JSON

    if (response.ok) {
      // Jeśli rejestracja zakończyła się sukcesem
      setMessage("Rejestracja zakończona sukcesem 🎉");
      setEmail("");       // Czyścimy pola formularza
      setUsername("");
      setPassword1("");
      setPassword2("");
    } else {
      // Jeśli wystąpił błąd (np. e-mail już zajęty)
      setMessage(`Błąd: ${JSON.stringify(data)}`);
    }
  };

  return (
    <div style={styles.page}> {/* Tło strony */}
      <form onSubmit={handleRegister} style={styles.form}> {/* Formularz rejestracji */}
        <h2 style={styles.heading}>Zarejestruj się</h2>

        {/* Pole e-mail */}
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        {/* Pole nazwy użytkownika */}
        <label>
          Nazwa użytkownika
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        {/* Pole hasła */}
        <label>
          Hasło
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        {/* Pole powtórzenia hasła */}
        <label>
          Powtórz hasło
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        {/* Przycisk wysłania formularza */}
        <button type="submit" style={styles.button}>
          Zarejestruj
        </button>

        {/* Komunikat zwrotny po rejestracji */}
        {message && <p>{message}</p>}
      </form>
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

export default Register; // Eksportujemy komponent, by użyć go w App.tsx
