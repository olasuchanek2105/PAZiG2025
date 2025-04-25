import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type Order = {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    created_at: Date;
  };

const OrderDetails: React.FC = () => {
    const{id} = useParams() 





    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=> {
        fetch("http://localhost:8000/api/listings/{id}", {

            method: "GET",
        

    })
    .then((res) => res.json())  // Odpowiedź z backendu konwertujemy do JSON
    .then((data) => setOrder(data)) // Jeśli wszystko OK, zapisujemy dane użytkownika do stanu
    .catch(() => setError("Błąd podczas pobierania danych użytkownika."));
    }, [])}

      


