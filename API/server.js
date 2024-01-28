let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users');
let matiere = require('./routes/matieres');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// Get the default connection depending on the user
// const config = require('./config');
// const environment = process.env.NODE_ENV || 'dev';
// const mongoConfig = config[environment];

mongoUsername = 'clementcolin';
mongoPassword = '7caSc1qyTybb5Dzk';

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@projetangular.i9oo62s.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

// Users
app.route(prefix + '/users')
  .get(user.getUsers);

app.route(prefix + '/users/:id')
  .get(user.getUser);

// Assignments  
app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/count')
  .get(assignment.getAssignmentsCount);

app.route(prefix + '/assignments/paginate')
  .get(assignment.getAssignmentsPagine);

app.route(prefix + '/assignments/limit')
  .get(assignment.getAssignmentsLimit);

app.route(prefix + '/assignments/deleteAll')
  .delete(assignment.deleteAllAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

// Matieres
app.route(prefix + '/matieres')
  .get(matiere.getMatieres);

app.route(prefix + '/matieres/:id')
  .get(matiere.getMatiere);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


