const express = require('express')

const app = express()

// intercepte les requests qui contiennent du json et nous mettent à dispo ce contenu sur l'object request dans req.body
app.use(express.json())

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

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({
        message: 'objet créé !'
    })
})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app