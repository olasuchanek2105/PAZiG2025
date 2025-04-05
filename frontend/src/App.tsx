import React from 'react';
import './App.css';
import UsersList from "./users/UsersList";

function App() {
  return (
    <div className="App">
      <h1>Panel użytkowników</h1>
      <UsersList />
    </div>
  );
}

export default App;
