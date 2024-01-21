

# Utiliser une image de node.js comme base
FROM node:14

# Créer le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application lorsqu'un conteneur basé sur cette image est lancé
CMD ["npm", "start"]
