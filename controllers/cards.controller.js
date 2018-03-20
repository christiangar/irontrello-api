const mongoose = require('mongoose');
const Card = require('../models/card.model');
const ApiError = require('../models/api-error.model');

module.exports.index = (req, res, next) => {
  Card.find()
    .then(cards => {
      res.status(200).send(cards);
    })
    .catch(error => {
      next(new ApiError(error.errors, 400));
    })
};

module.exports.show = (req, res, next) => {
  const id = req.params.id;
  Card.findById(id)
  .then(card => res.status(200).send(card))
  .catch(error => next(new ApiError(error.errors, 400)));
};

module.exports.create = (req, res, next) => {
  const {title, description, due_date, position, list} = req.body
 card = new Card({
   title,
   description,
   due_date,
   position,
   list})
card.save()
.then(card => res.status(200).send(card))
.catch(error => next(new ApiError(error.errors, 400)));
};

module.exports.update = (req, res, next) => {
  const card = req.body
  const id =req.params.id;
  Card.findByIdAndUpdate(id,card, {new:true})
  .then(card => res.status(200).send(card))
  .catch(error => next(new ApiError(error.errors, 400)));
};

module.exports.destroy = (req, res, next) => {
  const id = req.params.id;
  Card.findByIdAndRemove(id)
  .then(card => res.status(200).json({message:"card deleted"}))
};
