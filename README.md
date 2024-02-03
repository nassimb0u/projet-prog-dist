# Projet Prog-Dist

Ce projet Prog-Dist est une application distribuée composée de plusieurs services interconnectés pour la prédiction des prix immobiliers. Il utilise une architecture basée sur des microservices déployés dans un environnement Kubernetes.

## Structure du Projet

Le projet est organisé en plusieurs composants, chacun ayant son propre rôle dans le système :

- **db-api:** Fournit une API pour interagir avec la base de données, stockant et récupérant des informations sur les maisons.
- **ui:** Interface utilisateur basée sur Streamlit, permettant aux utilisateurs de saisir des données pour prédire les prix immobiliers et affichant les propriétés récentes.
- **ml-api:** Service de machine learning utilisé pour prédire les prix immobiliers en fonction des données d'entrée.
- **model-dev:** Cette section est dédiée au développement des modèles de prédiction des prix immobiliers.

### db-api

- **main.py:** Fichier principal contenant le code FastAPI pour l'API de la base de données.
- **models.py:** Fichier contenant les modèles de données utilisés dans l'API de la base de données.
- **Dockerfile:** Fichier Docker pour construire l'image de l'API de la base de données.
- **requirements.txt:** Fichier listant les dépendances nécessaires.
### ui

- **main.py:** Fichier principal contenant le code Streamlit pour l'interface utilisateur.
- **Dockerfile:** Fichier Docker pour construire l'image de l'interface utilisateur.
- **requirements.txt:** Fichier listant les dépendances nécessaires.

### ml-api

- **main.py:** Fichier principal contenant le code FastAPI pour l'API de machine learning.
- **Dockerfile:** Fichier Docker pour construire l'image de l'API de machine learning.
- **boston_housing_lin_model.joblib:** Modèle linéaire entraîné pour la prédiction des prix immobiliers.
- **requirements.txt:** Fichier listant les dépendances nécessaires.

### model-dev

Cette section est dédiée au développement des modèles de prédiction des prix immobiliers.

- **Linear_Regression.ipynb:** Notebook Jupyter contenant le code pour le développement du modèle de régression linéaire.
- **Polynomial_Regression.ipynb:** Notebook Jupyter contenant le code pour le développement du modèle de régression polynomiale.
- **boston_housing_lin_model.joblib:** Modèle linéaire entraîné pour la prédiction des prix immobiliers.
- **boston_housing_poly_model.joblib:** Modèle polynomial entraîné pour la prédiction des prix immobiliers.
- **dataset.txt:** Jeu de données utilisé pour l'entraînement des modèles.

## Déploiement Kubernetes

Le projet utilise Kubernetes pour l'orchestration et le déploiement des services. Les fichiers de déploiement Kubernetes sont disponibles dans le répertoire principal du projet.

- `deployment.yaml`: Fichier de configuration pour déployer les services dans un cluster Kubernetes.

## Comment Utiliser

Suivez ces étapes pour déployer et utiliser l'application :

1. Assurez-vous que vous avez un cluster Kubernetes opérationnel.
2. Appliquez les fichiers de déploiement à l'aide de la commande `kubectl apply -f deployment.yaml`.
3. Les services seront exposés sur les ports spécifiés dans les fichiers de déploiement.
4. Accédez à l'interface utilisateur en utilisant le service Streamlit.
## Images Docker Utilisées

- **db-api:** `nassimb/projet-prog-dist-db-api:1.3`
- **ui:** `mohamedaminebentayeb/ui-app:2.2`
- **ml-api:** `nassimb/projet-prog-dist-ml-api:1.3`

## Auteurs

- Mohamed Amine Bentayeb (jm_bentayeb@esi.dz)
- Nassim Boulechfa (in_boulechfar@esi.dz)

## Déploiement sur le cloud

Le projet est déployé sur Google Cloud Kubernetes Engine (GKE), garantissant une mise à l'échelle efficace et une disponibilité continue des services.


L'application est accessible via la [web app](http://34.42.151.225/). Veuillez noter que cette adresse ne sera plus disponible une fois l'offre gratuite de Google Cloud terminée.



