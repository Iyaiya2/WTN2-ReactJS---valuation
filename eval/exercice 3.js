import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
      </ul>
    </nav>
  );
}

function PlantCard({ plant }) {
  return (
    <div>
      <h3>{plant.name}</h3>
      <p><strong>Espèce:</strong> {plant.species}</p>
      <p>{plant.description}</p>
    </div>
  );
}

function PlantList({ plants }) {
  return (
    <div>
      {plants.map((plant, index) => (
        <PlantCard key={index} plant={plant} />
      ))}
    </div>
  );
}

function PlantCollection() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: "", species: "", description: "" });

  const addPlant = (event) => {
    event.preventDefault();
    if (!newPlant.name || !newPlant.species) return;
    setPlants([...plants, newPlant]);
    setNewPlant({ name: "", species: "", description: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  return (
    <div>
      <h1>Ma Collection de Plantes</h1>
      <form onSubmit={addPlant}>
        <input type="text" name="name" placeholder="Nom" value={newPlant.name} onChange={handleChange} required />
        <input type="text" name="species" placeholder="Espèce" value={newPlant.species} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newPlant.description} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>
      <PlantList plants={plants} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PlantCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
