# Tatienounou Backend

API de mise en relation entre parents et professionnels de la garde d'enfants.

## Installation

```bash
npm install
```

Copiez `backend/.env.example` vers `backend/.env` et ajustez les variables.
Créez une base de données MySQL puis importez le fichier `backend/database.sql` **ou** lancez le script de seed.

Exécutez `npm install` avant `npm start` pour installer les dépendances.

## Démarrage

```bash
node backend/server.js
```

## Structure

- `backend/models` : définitions Sequelize
- `backend/controllers` : logique métier
- `backend/routes` : routes Express
- `backend/middlewares` : authentification et rôles
- `backend/utils` : outils (JWT, hash, email)
- `backend/seed` : données initiales

## Seed

Le fichier `backend/database.sql` insère un administrateur, un parent, un professionnel et une demande active.

Pour générer ces données via Sequelize, exécutez :

```bash
node backend/seed/seed.js
```
Ce script crée des comptes de test (admin, parent et pro).
