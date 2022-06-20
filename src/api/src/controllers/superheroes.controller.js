const superheroes = require('../services/superheroes.service');
const isInteger = require('../utils/isInteger.util.js')

exports.create = async (req, res, next) => {
  try {
    res.status(200).json(await superheroes.create(req));
  } catch (err) {
    console.error(`Error while creating superhero:`, err.message);
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const rowNumber = await superheroes.getRowNumber()
    const page = isInteger(req.query.page) ? req.query.page : 1
    const findedSuperheroes = await superheroes.findAll(page)
    res.status(200).set({'X-total-count': rowNumber}).json(findedSuperheroes)
  } catch (err) {
    console.error(`Error while retreaving superheroes:`, err.message);
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    res.status(200).json(await superheroes.findOne(req.params.id));
  } catch (err) {
    console.error(`Error while retreaving a superhero:`, err.message);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    res.status(200).json(await superheroes.update(req.params.id, req));
  } catch (err) {
    console.error(`Error while updating a superhero:`, err.message);
    next(err);
  }
}

exports.delete = async(req, res, next) => {
  try{
    res.status(204).json(await superheroes.deleteOne(req.params.id))
  } catch (err) {
    console.error(`Error while deleting superhero with id=${req.params.id}:`, err.message);
    next(err);
  }
}

exports.deleteAll = async(req, res, next) => {
  try{
    res.status(204).json(await superheroes.deleteAll())
  } catch (err) {
    console.error(`Error while deleting superheroes:`, err.message);
    next(err);
  }
}


