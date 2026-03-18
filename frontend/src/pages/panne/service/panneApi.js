// URLs des endpoints backend
const API_PANNE = "http://localhost:8081/panne";
const API_UTILISATEUR = "http://localhost:8081/utilisateur";
const API_ETAT_PANNE = "http://localhost:8081/etatPanne";
const API_URGENCE_PANNE = "http://localhost:8081/urgencePanne";
const API_ITERVENTION = "http://localhost:8081/intervention";

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
export const getUtilisateurs = async () => {
  const response = await fetch(API_UTILISATEUR);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getEtatsPanne = async () => {
  const response = await fetch(API_ETAT_PANNE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getUrgencesPanne = async () => {
  const response = await fetch(API_URGENCE_PANNE);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};
export const getInterventions = async () => {
  const response = await fetch(API_ITERVENTION);
  if (!response.ok) throw new Error("Erreur API");
  return response.json();
};