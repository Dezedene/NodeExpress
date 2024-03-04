const mongoose = require("mongoose");

// La méthode Schema permet de créer un schéma de données pour BDD MongoDB.
// La méthode model transforme ce modèle en un modèle utilisable.
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
