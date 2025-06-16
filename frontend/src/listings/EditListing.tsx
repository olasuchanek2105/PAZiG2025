import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditListing: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Sprzęt ortopedyczny i rehabilitacyjny" },
    { id: 2, name: "Diagnostyka i pomiary" },
    { id: 3, name: "Wyposażenie domowe" },
    { id: 4, name: "Higiena i ochrona osobista" },
    { id: 5, name: "Sprzęt pomocniczy" },
    { id: 6, name: "Pielęgnacja" },
  ]);

  const { listingId } = useParams<{ listingId: string }>();
  const [form, setForm] = useState<any>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Pobranie ogłoszenia
    fetch(`http://localhost:8000/api/listings/${listingId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setPreviewUrl(data.image);
      })
      .catch((err) => console.error("Błąd ładowania ogłoszenia:", err));

    // Pobranie kategorii
    fetch("http://localhost:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Błąd ładowania kategorii:", err));
  }, [listingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
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
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edytuj Ogłoszenie</h2>

        <label style={styles.label}>
          Tytuł:
          <input name="title" value={form.title || ""} onChange={handleChange} style={styles.input} />
        </label>

        <label style={styles.label}>
          Opis:
          <textarea name="description" value={form.description || ""} onChange={handleChange} style={styles.textarea} />
        </label>

        <label style={styles.label}>
          Cena zł:
          <input
            name="price"
            type="number"
            value={form.price || ""}
            onChange={handleChange}
            style={styles.input}
            min="0"
            max="999999"
          />
        </label>

        <label style={styles.label}>
          Producent:
          <input name="producent" value={form.producent || ""} onChange={handleChange} style={styles.input} />
        </label>




        <label style={styles.label}>
          Kategoria:
          <select
            name="category"
            value={form.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setForm({ ...form, category: e.target.value })
            }
            style={styles.input}
            required
          >
            <option value="">-- wybierz kategorię --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>


        <label style={styles.label}>
          Zmień obraz:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Podgląd zdjęcia"
            style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "10px" }}
          />
        )}

        <button type="submit" style={styles.button}>Zapisz zmiany</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "5px",
    minHeight: "80px",
  },
  button: {
    backgroundColor: "#1d4a94",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
};

export default EditListing;
