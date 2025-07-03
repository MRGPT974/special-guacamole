CREATE DATABASE IF NOT EXISTS tatienounou;
USE tatienounou;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('PARENT', 'PRO', 'ADMIN') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE pros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  type ENUM('ASSMAT', 'MAM', 'STRUCTURE'),
  adresse VARCHAR(255),
  agrement_pdf VARCHAR(255),
  capacite INT,
  description TEXT,
  abonnement_actif BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_pro INT,
  date_debut DATE,
  date_fin DATE,
  statut ENUM('ACTIF', 'EXPIRE', 'EN_ATTENTE'),
  FOREIGN KEY (id_pro) REFERENCES pros(id)
);

CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_parent INT,
  age_enfant INT,
  adresse VARCHAR(255),
  type VARCHAR(50),
  capacite INT,
  date_debut DATE,
  date_fin DATE,
  commentaires TEXT,
  statut ENUM('EN_COURS', 'ATTRIBUEE', 'TERMINEE', 'SUPPRIMEE'),
  FOREIGN KEY (id_parent) REFERENCES users(id)
);

CREATE TABLE password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expiresAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO users (nom, prenom, email, password, role) VALUES
('Admin', 'Admin', 'admin@example.com', '$2b$10$abcdef', 'ADMIN'),
('Parent', 'Test', 'parent@example.com', '$2b$10$abcdef', 'PARENT'),
('Pro', 'Test', 'pro@example.com', '$2b$10$abcdef', 'PRO');

INSERT INTO pros (id_user, type, adresse, capacite, description, abonnement_actif)
VALUES (3, 'ASSMAT', '1 rue de Paris', 3, 'Professionnel test', true);

INSERT INTO requests (id_parent, age_enfant, adresse, type, capacite, date_debut, date_fin, commentaires, statut)
VALUES (2, 3, '1 rue de Lyon', 'ASSMAT', 1, '2024-01-01', '2024-06-01', 'Besoin de garde', 'EN_COURS');
