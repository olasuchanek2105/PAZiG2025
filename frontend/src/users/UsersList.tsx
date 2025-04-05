import React, { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
};

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.127:8000/api/users/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dane z API:", data); // 🔍 Dodaj to
        setUsers(data);
      })
      .catch((err) => console.error("Błąd pobierania użytkowników:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista użytkowników</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.username}</strong> – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
