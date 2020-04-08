import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Love Pet Sitter ${Date.now()}`,
	    url: "https://github.com/lebarreto/LovePetSitter",
	    techs: ["Node.js", "Expo", "ReactJS", "React Native"]
    });
    
    const list = [...repositories, response.data];
    setRepositories(list);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const list = repositories.filter(repository => repository.id !== id);
    setRepositories(list);
  }

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories ? repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )) : null}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
