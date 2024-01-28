let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
// Sort by dateDeRendu par défault
function getAssignments(req, res){
    Assignment.find().sort({dateDeRendu: 1}).exec((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getAssignmentsPagine(req, res){
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    Assignment.find().sort({dateDeRendu: 1}).exec((err, assignments) => {
        if(err){
            res.send(err)
        }

        let paginatedAssignments = assignments.slice(startIndex, endIndex);
        res.send(paginatedAssignments);
    });
}

function getAssignmentsLimit(req, res){
    // let page = parseInt(req.query.page) || parseInt(1);
    let limit = parseInt(req.query.limit) || parseInt(10);

    Assignment.find().sort({dateDeRendu: 1}).exec((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    }).limit(limit);
}

function getAssignmentsCount(req, res) {
    Assignment.countDocuments((err, count) => {
      if (err) {
        res.send(err);
      }
  
      res.json(count);
    });
  }

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur = req.body.auteur;
    assignment.matiere = req.body.matiere;
    assignment.note = req.body.note;
    assignment.commentaire = req.body.commentaire;
    assignment.description = req.body.description;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

function deleteAllAssignments(req, res) {
    Assignment.deleteMany({}, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({message: 'All assignments deleted'});
    });
}

module.exports = { getAssignments, getAssignmentsPagine, getAssignmentsCount, getAssignmentsLimit, getAssignment, postAssignment, updateAssignment, deleteAssignment, deleteAllAssignments };
