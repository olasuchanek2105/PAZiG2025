import React, { useState } from "react";

const CreateListing: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    status: "",
    producer: "",
    description: "",
    category: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, image: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // Tu wstaw fetch do API
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nazwa:
          <input type="text" name="title" value={form.title} onChange={handleChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Cena:
          <input type="number" name="price" value={form.price} onChange={handleChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Stan:
          <input type="text" name="status" value={form.status} onChange={handleChange} style={styles.input} required />
        </label>

        <label style={styles.label}>
          Producent:
          <input type="text" name="producer" value={form.producer} onChange={handleChange} style={styles.input} />
        </label>

        <label style={styles.label}>
          Opis:
          <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea} />
        </label>

        <label style={styles.label}>
          Kategoria
          <input type="text" name="category" value={form.category} onChange={handleChange} style={styles.input} />
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
        </label>

        <button type="submit" style={styles.button}>Dodaj ogłoszenie</button>
      </form>
    </div>
  );
};

export default CreateListing;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#1d4a94",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  form: {
    backgroundColor: "#eef6ff",
    borderRadius: "20px",
    padding: "30px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#1d4a94",
  },
  input: {
    marginTop: "6px",
    padding: "8px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#fff",
  },
  textarea: {
    marginTop: "6px",
    padding: "8px",
    borderRadius: "10px",
    border: "none",
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
};
