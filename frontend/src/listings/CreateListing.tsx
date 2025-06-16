import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [categories, setCategories] = useState([
  { id: 1, name: "Sprzęt ortopedyczny i rehabilitacyjny" },
  { id: 2, name: "Diagnostyka i pomiary" },
  { id: 3, name: "Wyposażenie domowe" },
  { id: 4, name: "Higiena i ochrona osobista" },
  { id: 5, name: "Sprzęt pomocniczy" },
  { id: 6, name: "Pielęgnacja" },
]);

 



  const [form, setForm] = useState({
    title: "",
    price: "",
    // status: "",
    producent: "",
    description: "",
    category: "",
    address: "",
    image: null as File | null,
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    // formData.append("status", form.status);
    formData.append("producent", form.producent);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("address", form.address || "");
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/listings/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        });

      if (response.ok) {
        
        navigate("/listings");
        localStorage.setItem("listingSuccess", "Ogłoszenie zostało dodane!");
        // czyszczenie formularza
        setForm({
          title: "",
          price: "",
          // status: "",
          producent: "",
          description: "",
          category: "",
          address: "",
          image: null,
        });
      } else {
        alert("Błąd podczas dodawania ogłoszenia.");
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      alert("Błąd sieci.");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Dodaj Ogłoszenie</h2>
        <label style={styles.label}>
          Nazwa:
          <input type="text" name="title" value={form.title} onChange={handleChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Cena zł:
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
            required
            min="0"
            max="999999"
          />
        </label>


        {/* <label style={styles.label}>
          status:
          <input type="text" name="status" value={form.status} onChange={handleChange} style={styles.input} required />
        </label> */}

        <label style={styles.label}>
          Producent:
          <input type="text" name="producent" value={form.producent} onChange={handleChange} style={styles.input} />
        </label>

        <label style={styles.label}>
          Opis:
          <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea} />
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
          Dodaj zdjęcia
          <div style={styles.uploadBox}>
            <label htmlFor="image-upload" style={styles.uploadLabel}>+</label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
                    {previewUrl && (
            <img
              src={previewUrl}
              alt="Podgląd zdjęcia"
              style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "10px" }}
            />
          )}
        </label>

        <button type="submit" style={styles.button}>Dodaj ogłoszenie</button>
      </form>
    </div>
  );
};

export default CreateListing;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#eaf8ff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "30px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    

  },
  input: {
    marginTop: "6px",
    padding: "8px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid #d9d9d9",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    
  },
  textarea: {
    marginTop: "6px",
    padding: "8px",
    borderRadius: "10px",
    border: "1px solid #d9d9d9",
    backgroundColor: "#fff",
    resize: "vertical",
  },
  uploadBox: {
    marginTop: "6px",
    width: "100px",
    height: "100px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid #d9d9d9",
  },
  uploadLabel: {
    fontSize: "36px",
    color: "#d3d3d3",
    cursor: "pointer",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#1d4a94",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    marginTop: "5px",
    color: "#1d4a94",
  }
};
