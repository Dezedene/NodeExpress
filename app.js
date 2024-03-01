const express = require('express')
const mongoose = require('mongoose');
const app = express()

const stuffRoutes = require('./routes/stuff')

require('dotenv').config();
const mongoPassword = process.env.MONGO_PASSWORD

// intercepte les requests qui contiennent du json et nous mettent à dispo ce contenu sur l'object request dans req.body
app.use(express.json())

// CRUD = "Create Read Update Delete"
// CORS = « Cross Origin Resource Sharing », définit comment les serveurs et les navigateurs interagissent
// app.use() permet d'attribuer un middleware à une route spécifique de l'appli, requêtes AJAX interdites par défaut

// Headers pour permettre les request cross origin et empecher les erreurs CORS:
// - Accéder à notre API depuis n'importe quelle origine ( '*' )
// - Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
// - Envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect(`mongodb+srv://dezedene:${mongoPassword}@cluster0.3p0leyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/stuff', stuffRoutes)

module.exports = app