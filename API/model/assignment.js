let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    nom: String,
    auteur: String,
    matiere: String,
    note: Number,
    rendu: Boolean,
    dateDeRendu: Date,
    commentaire: String,
    description: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
