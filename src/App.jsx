import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", section: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://alzona-gndzdge6crfwd7aj.southeastasia-01.azurewebsites.net/students"
      ); // Update with your actual API endpoint
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.section) {
      alert("Name, Age, and Section are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://alzona-gndzdge6crfwd7aj.southeastasia-01.azurewebsites.net/students",
        formData
      ); // Update with your actual API endpoint
      setFormData({ name: "", age: "", section: "" });
      fetchStudents();
    } catch (err) {
      setError("Failed to submit data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Student Information</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            value={formData.section}
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {loading && <p>Loading students...</p>}
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Age: {student.age}, Section: {student.section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
