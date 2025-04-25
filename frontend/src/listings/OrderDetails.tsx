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

    useEffect(() => {
      fetch(`http://localhost:8000/api/listings/${id}/`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Błąd podczas pobierania danych ogłoszenia.");
          setLoading(false);
        });
    }, []);

    if (loading) return <p>Ładowanie...</p>;
if (error) return <p>{error}</p>;
if (!order) return <p>Nie znaleziono ogłoszenia.</p>;

return (
  <div style={{ padding: "20px" }}>
    <h2>{order.title}</h2>
    <p>{order.description}</p>
    <p><strong>Cena:</strong> {order.price} zł</p>
    <p><strong>Adres:</strong> {order.address}</p>
    <p><strong>Dodano:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
  </div>
);

    

  }

  export default OrderDetails;

      


