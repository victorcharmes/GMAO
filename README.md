# GMAO - Gestion de Maintenance Assistée par Ordinateur

## Fonctionnalités

- CRUD pour la gestion des machines, pièces, pannes et interventions
- Tableau de bord avec indicateurs de maintenance (basés uniquement sur les pannes terminées, état = 200)
- Calcul automatique de la durée d'intervention
- Identité utilisateur lors de la création d'une panne (remplacée par l'id de connexion)

## Règles métier

- Si une panne n'est pas à l'arrêt, une date de fin est obligatoire
- Les dates de début et de fin de panne doivent se situer dans la plage d'ouverture du site
- Lors de l'ajout ou la modification d'une intervention, la durée d'intervention est recalculée automatiquement
- La modification d'une panne déclenche le recalcul de la durée d'intervention associée
- Le calcul des indicateurs utilise uniquement les pannes terminées (état = 200)

## Améliorations futures

### Refactoring

- Les fonctionnalités CRUD de Machine et Stock sont dupliquées : créer des composants génériques réutilisables
- Favoriser l'utilisation du CSS plutôt que Thymeleaf pour éviter les répétitions de style
- Regrouper les appels API utilisés dans plusieurs composants dans un service de niveau supérieur
- Séparer correctement Machine et MachineView : revoir la fonction `findAll()`

### Nouvelles fonctionnalités

- Ajouter un export PDF pour la sélection des pannes et interventions
- Ajouter une table Horaire (horaire par jour) pour gérer les cas comme les 3EVSD
- Implémenter la double vérification des données (validation frontend + backend)