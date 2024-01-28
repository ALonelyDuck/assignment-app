const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    nom: String,
    enseignant: ObjectId
});

module.exports = mongoose.model('Matiere', MatiereSchema);
