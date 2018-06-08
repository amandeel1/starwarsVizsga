const Starwars = require('../models/starwars');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    // TODO: list spacehips
    Starwars.find({})
      .then(starwars => res.json(starwars));
  },

  find: (req, res) => {
    // TODO: find a spacehip
    Starwars.findById(req.params.id)
      .then(starwars => res.json(starwars));
  },

  create: (req, res) => {
    Starwars.create(req.body)
      .then(starwars => res.json(starwars))
      .catch(err => res.send(err));
  },


  update: (req, res) => {
    // TODO: update a spacehip
    Starwars.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(starwars => res.json(starwars));
  },

  remove: (req, res) => {
    // TODO: delete spacehip
    Starwars.findByIdAndRemove(req.params.id)
      .then(starwars => res.json(starwars));
  },
};
