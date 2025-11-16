# 🏢 Employee Floor Management App

Application web interactive permettant de gérer, visualiser et organiser les employés dans les différentes zones d’un bâtiment, tout en respectant les règles métiers liées à leurs rôles.

---

## 📌 Objectifs du projet

- Permettre l’ajout, la suppression et le déplacement des employés via une interface graphique.
- Assurer le respect des règles métiers : chaque rôle a accès uniquement à certaines zones.
- Offrir une interface moderne, responsive et intuitive.
- Centraliser la gestion du personnel et leur emplacement dans une seule plateforme.
- (Bonus) Ajouter le drag & drop, la recherche, et la sauvegarde dans le localStorage.

---

## 🗂️ Fonctionnalités principales

### 👤 **Gestion des employés**
- Ajout d’un employé via une modal (Nom, Rôle, Email, Téléphone, Photo, Expériences).
- Prévisualisation de la photo.
- Liste des employés non assignés ("Unassigned Staff").
- Suppression ou ré-assignation via un bouton **X**.
- Affichage d’un **profil détaillé** au clic :
  - Photo grand format
  - Nom
  - Rôle
  - Contact
  - Expériences
  - Localisation actuelle

---

### 🏢 **Gestion des zones du bâtiment**
Zones disponibles :
1. Salle de conférence
2. Réception
3. Salle des serveurs
4. Salle de sécurité
5. Salle du personnel
6. Salle d’archives

Chaque zone contient :
- Liste des employés assignés
- Bouton "+" pour ajouter un employé autorisé
- Indication visuelle si la zone obligatoire est vide

---

### 🔐 **Règles d'accès selon les rôles**
| Rôle              | Accès autorisé                                                          |
|-------------------|--------------------------------------------------------------------------|
| Réceptionniste    | Réception uniquement                                                     |
| Technicien IT     | Salle des serveurs uniquement                                           |
| Agent de sécurité | Salle de sécurité uniquement                                            |
| Manager           | Toutes les zones                                                         |
| Nettoyage         | Toutes les zones sauf Salle d’archives                                  |
| Autres rôles      | Toutes zones sauf zones restreintes                                      |

---

## 💡 Fonctionnalités Bonus (optionnel)
- Drag & Drop des employés dans les zones.
- Édition d’un employé dans la liste Unassigned.
- Recherche et filtrage par nom ou rôle.
- Sauvegarde automatique dans localStorage.
- Réorganisation automatique des employés selon les règles.
- Photo par défaut si aucune image n’est fournie.

---

## 🧰 Technologies utilisées

- **HTML5**
- **CSS3** (Flexbox, Grid, Responsive, Animations)
- **JavaScript Vanilla**
- **LocalStorage** (optionnel)
- **Git & GitHub**
- **Trello / GitHub Projects** (gestion de projet)

---

## 📱 Responsive Design

Tailles d’écran prises en charge :
- Desktop > 1280px  
- Small Desktop : 1024px – 1279px  
- Tablet : 768px – 1023px  
- Mobile : < 767px  
- Landscape modes pour mobile et tablette  

---

## 🧪 Validation

- Code HTML et CSS validé via **W3C Validator**
- Tests manuels fonctionnels :
  - Ajout / Suppression / Mise à jour
  - Navigation mobile
  - Respect des règles métiers
  - Compatibilité multi-écran

---

## 🚀 Déploiement

Le projet peut être déployé via :
- **GitHub Pages**
- **Vercel**

---
/
│── index.html
│── /css
│     └── style.css
│── /js
│     └── main.js
│── /img
│     └── default-avatar.png
│── README.md

