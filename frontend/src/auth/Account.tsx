import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
// Importujemy React oraz hooki: useEffect (do efektu po załadowaniu komponentu) i useState (do przechowywania danych)

type User = {
  username: string;
  email: string;
};
// Definiujemy typ użytkownika (TS) – spodziewamy się tylko username i email

const Account: React.FC = () => {
  // Tworzymy stan dla danych użytkownika (user) i komunikatu (message)
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  
  useEffect(() => {

    
    // Po załadowaniu komponentu wykonujemy zapytanie do API

    const token = localStorage.getItem("authToken"); 
    // Pobieramy token z localStorage – musi być wcześniej zapisany przy logowaniu

    if (!token) {
      // Jeśli tokenu nie ma – znaczy, że użytkownik nie jest zalogowany
      setMessage("Nie jesteś zalogowany/a.");
      return;
    }

    // Wysyłamy zapytanie GET do Django: /api/auth/user/
    fetch("http://localhost:8000/api/auth/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`, 
        // Token autoryzacji musi być podany w nagłówku – tak Django sprawdza, kim jesteś
      },

    
      
    })
      .then((res) => res.json())  // Odpowiedź z backendu konwertujemy do JSON
      .then((data) => setUser(data)) // Jeśli wszystko OK, zapisujemy dane użytkownika do stanu
      .catch(() => setMessage("Błąd podczas pobierania danych użytkownika."));
      // Obsługa błędu – np. brak połączenia, błędny token itp.
  }, []); // Pusta tablica [] = efekt wykona się tylko raz po załadowaniu komponentu

  if (message) {
    // Jeśli wystąpił błąd lub użytkownik nie jest zalogowany – wyświetlamy komunikat
    return <p>{message}</p>;
  }

  if (!user) {
    // Jeśli dane jeszcze się nie załadowały – pokazujemy "ładowanie"
    return <p>Ładowanie danych użytkownika...</p>;
  }

  // Główna część: jeśli mamy dane – wyświetlamy je
  return (
    <div style={styles.container}>
      <h2>Twoje konto</h2>
      <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={handleLogout} style={styles.button}>
        Wyloguj się
      </button>
    </div>
  );

  
};

// Proste style (CSS-in-JS) dla kontenera
const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f4f8ff",
    borderRadius: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#d9534f",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold" as const,
  }
};

export default Account;
// Eksportujemy komponent, aby móc użyć go w App.tsx (np. pod ścieżką /account)
