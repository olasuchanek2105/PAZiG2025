import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Zalogowano pomyślnie 🎉");

      // (Opcjonalnie) zapisz token np. do localStorage:
      if (data.key) {
        localStorage.setItem("authToken", data.key);
      }

      setUsername("");
      setPassword("");
    } else {
      // Obsługa błędów – np. złe hasło, brak użytkownika
      if (data.non_field_errors) {
        setMessage(data.non_field_errors[0]);
      } else {
        setMessage("Błąd logowania.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Zaloguj się</h2>

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

        <label>
          Hasło
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <button type="submit" style={styles.button}>
          Zaloguj
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#eaf8ff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "300px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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

export default Login;
