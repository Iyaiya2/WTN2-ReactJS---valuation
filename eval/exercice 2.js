//Créer un composant PlantList et PlantCard. Il affichera la liste des plantes. Il doit :
//Recevoir la liste des plantes via les props
//Utiliser la méthode .map() pour afficher chaque plante
//Utiliser un composant PlantCard pour afficher les détails de chaque plante individuellement

//Le composant PlantCard doit afficher le nom, l'espèce et une courte description de la plante.
//Mettez à jour PlantCollection pour inclure le composant PlantList.

// exercice 2 

import React, { useState } from "react";

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
      <h1>la  Collection de Plantes de iyad </h1>
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

export default PlantCollection;


