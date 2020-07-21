dependancies


const db = require('../models');
const { builtinModules } = require('module');

module.exports = app => {
    app.get('api/goals/', funcction(req, res) {
        db.goals.findAll9({})
            .then(function(dbgoals) {
                res.json(dbgoals);
            });
    });

    app.post('/api/goals', function(req, res) {
        console.log(req.body);
        db.goals.create
    })
};