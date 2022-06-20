const db = require("../models/index.js")
const getImages = require('../utils/getImages.util.js')
const getMainImage = require('../utils/getMainImage.util.js')
const imageNamesToLinks = require('../utils/imageNamesToLinks.util.js')
const fs = require('fs');
const isInteger = require("../utils/isInteger.util.js");
const Superhero = db.superhero;

async function create(data) {
  const mainImage = getMainImage(data.files)
  const images = getImages(data.files)

  let newSuperhero = await Superhero.create({
    nickname: data.body.nickname,
    real_name: data.body.real_name,
    origin_description: data.body.origin_description,
    superpowers: data.body.superpowers,
    catch_phrase: data.body.catch_phrase,
    mainImage: mainImage,
    images: [...images],
  })

  if (newSuperhero) {
    newSuperhero.images = imageNamesToLinks(newSuperhero.images)
    newSuperhero.mainImage = imageNamesToLinks(newSuperhero.mainImage)
    const { updatedAt, createdAt, ...formattedNewSuperhero } = newSuperhero
    return formattedNewSuperhero
  } else {
    const err = new Error('Error occured while creating a superhero');
    err.statusCode = 500;
    throw err;
  }
}

async function getRowNumber() {
  const rowNumber = await Superhero.count()
  return rowNumber
}

async function findAll(page) {
  let superheroes = await Superhero.findAll({
    offset: (page - 1) * 5,
    limit: 5,
    attributes: ['id', 'nickname', 'mainImage'],
    order: [['updatedAt', 'DESC']],
    raw: true
  })
  if (superheroes) {
    return superheroes.map(superhero => ({ ...superhero, mainImage: imageNamesToLinks(superhero.mainImage) }))
  } else {
    const err = new Error('Error occured while retreaving superheroes');
    err.statusCode = 500;
    throw err;
  }
}

async function findOne(id) {

  if (!isInteger(id)) {
    const err = new Error(`Invalid superhero id`);
    err.statusCode = 400;
    throw err;
  }
  const superhero = await Superhero.findOne({ where: { id: id }, raw: true })

  if (superhero) {
    superhero.images = imageNamesToLinks(superhero.images)
    superhero.mainImage = imageNamesToLinks(superhero.mainImage)
    const { updatedAt, createdAt, ...formattedSuperhero } = superhero
    return formattedSuperhero
  } else {
    const err = new Error(`No superhero with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
}

async function deleteOne(id) {

  const folder = __dirname + "/../../static/images/"
  const superhero = await Superhero.findByPk(id)

  if (!superhero) {
    const err = new Error(`No superhero with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
  const superheroDestr = await Superhero.destroy({
    where: { id: id }
  })
  if (superheroDestr !== 1) {
    const err = new Error(`"Error deleting superhero with id=${id}`);
    err.statusCode = 409;
    throw err;
  }
  superhero.images.map(image => fs.unlink(folder + image, (err) => {
    if (err) {
      const err = new Error(`"Error deleting image for superhero with id=${id}`);
      err.statusCode = 500;
      throw err;
    }
  }))
  fs.unlink(folder + superhero.mainImage, (err) => {
    if (err) {
      const err = new Error(`"Error deleting main image for superhero with id=${id}`);
      err.statusCode = 500;
      throw err;
    }
  })
  return;
}

async function deleteAll() {
  const folder = __dirname + "/../../static/images/"

  const superheroDestr = await Superhero.destroy({
    where: {},
    truncate: false
  })

  if (!superheroDestr) {
    const err = new Error(`Error deleting superheroes`);
    err.statusCode = 409;
    throw err;
  }

  fs.readdir(folder, (err, files) => {
    if (err) {
      const err = new Error(`Error finding superhero images`);
      err.statusCode = 500;
      throw err;
    }

    for (const file of files) {
      fs.unlinkSync(folder + file, (err) => {
        if (err) {
          const err = new Error(`Error deleting a superhero image `);
          err.statusCode = 500;
          throw err;
        }
      });
    }
  })
  return;
}

async function update(id, data) {
  
  if(!data.body.nickname){
    const err = new Error('Superhero nickname is required and was not provided');
    err.statusCode = 500;
    throw err;
  }

  const mainImage = getMainImage(data.files)
  const images = getImages(data.files)

  let superhero = await Superhero.findOne({ where: { id: id } })

  const updatedSuperhero = await superhero.update({
    nickname: data.body.nickname || superhero.nickname,
    real_name: data.body.real_name || superhero.real_name,
    origin_description: data.body.origin_description || superhero.origin_description,
    superpowers: data.body.superpowers || superhero.superpowers,
    catch_phrase: data.body.catch_phrase || superhero.catch_phrase,
    mainImage: mainImage || superhero.mainImage,
    images: images
  })

  if (updatedSuperhero) {
    updatedSuperhero.images = imageNamesToLinks(updatedSuperhero.images)
    updatedSuperhero.mainImage = imageNamesToLinks(updatedSuperhero.mainImage)
    const { updatedAt, createdAt, ...formattedUpdatedSuperhero } = updatedSuperhero
    return formattedUpdatedSuperhero
  } else {
    const err = new Error('Error occured while updating a superhero');
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  create,
  getRowNumber,
  update,
  findAll,
  findOne,
  deleteOne,
  deleteAll,
}