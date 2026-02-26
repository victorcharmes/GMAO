// URLs des endpoints backend
const API_PIECE = "http://localhost:8081/stock";
/*
  Fonctions génériques de récupération des données.
  Chaque fonction :
  - appelle l'API
  - vérifie la réponse
  - retourne le JSON
*/

export const getPieces = async () => {
  const response = await fetch(API_PIECE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};