//Gérer le thème global avec Redux (voir ressources du cours)
//Créer un store Redux pour gérer le thème clair / sombre
//Créer des actions pour changer le thème
//Connecter votre application au store Redux pour appliquer le thème globalement

// exercice 5

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";
import { legacy_createStore as createStore} from 'redux'

const initialState = { theme: "light" };

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

const store = createStore(themeReducer);

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
      </ul>
    </nav>
  );
}

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  return (
    <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
      Mode {theme === "light" ? "Sombre" : "Clair"}
    </button>
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
      <ThemeToggle />
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
    <Provider store={store}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<PlantCollection />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
