//Créer le composant principal PlantCollection qui servira de conteneur principal de l’application web. Ce composant doit :
//Utiliser useState pour gérer l'état des plantes (un tableau d'objets plante)
//Implémenter une fonction addPlant pour ajouter une nouvelle plante
//Rendre un formulaire simple pour ajouter une plante (nom, espèce, description)
// Exercice 1 

import React, { useState } from "react";

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
      <h1>La  Collection de Plantes de Iyad </h1>
      <form onSubmit={addPlant}>
        <input type="text" name="name" placeholder="Nom" value={newPlant.name} onChange={handleChange} required />
        <input type="text" name="species" placeholder="Espèce" value={newPlant.species} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={newPlant.description} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default PlantCollection;
