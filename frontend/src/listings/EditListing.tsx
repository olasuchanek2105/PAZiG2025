import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditListing: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const [form, setForm] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:8000/api/listings/${listingId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error("Błąd ładowania ogłoszenia:", err));
  }, [listingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", form.title || "");
    formData.append("description", form.description || "");
    formData.append("price", form.price || "");
    formData.append("status", form.status || "");
    formData.append("producent", form.producent || "");
    formData.append("category", form.category || "");
    formData.append("address", form.address || "");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/listings/${listingId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Zaktualizowano!");
        navigate("/konto");
      } else {
        const err = await response.json();
        console.error(err);
        alert("Błąd podczas aktualizacji.");
      }
    } catch (err) {
      alert("Błąd sieci");
    }
  };

  if (!form) return <p>Ładowanie...</p>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Edytuj ogłoszenie</h2>
      <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Tytuł" />
      <textarea name="description" value={form.description || ""} onChange={handleChange} placeholder="Opis" />
      <input name="price" type="number" value={form.price || ""} onChange={handleChange} placeholder="Cena" />
      <input name="producent" value={form.producent || ""} onChange={handleChange} placeholder="Producent" />
      <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Adres" />
      <input name="status" value={form.status || ""} onChange={handleChange} placeholder="Status" />
      <input name="category" value={form.category || ""} onChange={handleChange} placeholder="Kategoria ID" />

      <label>
        Zmień obraz:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      <button type="submit">Zapisz zmiany</button>
    </form>
  );
};

export default EditListing;
