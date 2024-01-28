let User = require('../model/user');

// Récupérer tous les Users (GET)
function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        res.send(users);
    });
}

// Récupérer un Users par son id (GET)
function getUser(req, res) {
    let userId = req.params.id;

    User.findOne({_id: userId}, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
}

module.exports = { getUsers, getUser };