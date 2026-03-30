// URLs des endpoints backend
const API_ITERVENTION = "http://localhost:8081/intervention";
const API_PANNE = "http://localhost:8081/panne";
const API_MACHINE = "http://localhost:8081/machine";
const API_UTILISATEUR = "http://localhost:8081/utilisateur";
/*
  Fonctions génériques de récupération des données.
  Chaque fonction :
  - appelle l'API
  - vérifie la réponse
  - retourne le JSON
*/

export const getInterventions = async () => {
  const response = await fetch(API_ITERVENTION);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getPannes = async () => {
  const response = await fetch(API_PANNE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getMachines = async () => {
  const response = await fetch(API_MACHINE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getUtilisateurs = async () => {
  const response = await fetch(API_UTILISATEUR);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};