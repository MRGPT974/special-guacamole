# Tatienounou Backend

API de mise en relation entre parents et professionnels de la garde d'enfants.

## Installation

```bash
npm install
```

Créez une base de données MySQL et importez le fichier `backend/database.sql`.
Copiez `.env.example` vers `.env` et ajustez les variables.

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
