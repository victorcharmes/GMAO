// URLs des endpoints backend
const API_PIECE = "http://localhost:8081/stock";
const API_MAGASIN = "http://localhost:8081/magasin";
const API_SLOT = "http://localhost:8081/slot";
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
export const getMagasins = async () => {
  const response = await fetch(API_MAGASIN);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getSlots = async () => {
  const response = await fetch(API_SLOT);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};