const express = require('express')
const mongoose = require('mongoose');
const app = express()

const Thing = require('./models/Thing')

require('dotenv').config();
const mongoPassword = process.env.MONGO_PASSWORD

// intercepte les requests qui contiennent du json et nous mettent à dispo ce contenu sur l'object request dans req.body
app.use(express.json())

mongoose.connect(`mongodb+srv://dezedene:${mongoPassword}@cluster0.3p0leyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// CRUD signifie "Create Read Update Delete"
// CORS signifie « Cross Origin Resource Sharing »

// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être
// de contrôle d'accès doivent être précisés pour tous vos objets de réponse.

// Accéder à notre API depuis n'importe quelle origine ( '*' )
// Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
// Envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)

// Le CORS définit comment les serveurs et les navigateurs interagissent
// app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
// par défaut, les requêtes AJAX sont interdites.

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// 201 = création de ressource
// 400 = code erreur
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id
  const thing = new Thing({
    ...req.body
  })
  thing.save()
  .then(() => res.status(201).json({ message: 'object registered' }))
  .catch( error => res.status(400).json({ error }))
})

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}))
  });

module.exports = app