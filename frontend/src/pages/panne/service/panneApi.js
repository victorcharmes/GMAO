// URLs des endpoints backend
const API_PANNE = "http://localhost:8081/panne";

/*
  Fonctions génériques de récupération des données.
  Chaque fonction :
  - appelle l'API
  - vérifie la réponse
  - retourne le JSON
*/

export const getPannes = async () => {
  const response = await fetch(API_PANNE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};