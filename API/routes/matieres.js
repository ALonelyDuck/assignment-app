let Matiere = require('../model/matiere');

// Récupérer toutes les Matieres (GET)
function getMatieres(req, res){
    Matiere.find().sort({nom: 1}).exec((err, matieres) => {
        if(err){
            res.send(err)
        }

        res.send(matieres);
    });
}

// Récupérer une Matiere par son id (GET)
function getMatiere(req, res){
    let matieresId = req.params.id;

    Matiere.findOne({id: matieresId}, (err, matieres) =>{
        if(err){res.send(err)}
        res.json(matieres);
    })
}

module.exports = { getMatieres, getMatiere };