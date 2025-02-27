//Créer un composant PlantDetails et brancher une API externe
//Développez un composant PlantDetails qui affichera les détails d'une plante spécifique. Ce composant doit :
//Utiliser useEffect() pour charger les détails de la plante à partir de l’API Trefle.io en utilisant fetch (ou axios). Voir dans le cours
//Afficher les informations de la plante (nom, espèce, description, image, etc.)

// exercice 4

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";

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
      <Link to={`/plant/${plant.id}`}>Voir détails</Link>
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
    setPlants([...plants, { ...newPlant, id: plants.length + 1 }]);
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

function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    axios.get(`https://trefle.io/api/v1/plants/${id}?token=YOUR_API_KEY`)
      .then(response => {
        setPlant(response.data.data);
      })
      .catch(error => console.error("Erreur lors du chargement de la plante", error));
  }, [id]);

  if (!plant) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{plant.common_name}</h2>
      <p><strong>Espèce:</strong> {plant.scientific_name}</p>
      <p>{plant.family}</p>
      {plant.image_url && <img src={plant.image_url} alt={plant.common_name} style={{ maxWidth: "100%" }} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PlantCollection />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

