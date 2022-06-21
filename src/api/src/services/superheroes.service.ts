import { Request } from 'express'
import db from "../models/index"
import { ResponseError, SuperheroFull, SuperheroShort, RequestBody } from '../utils/interfaces'
import getImages from '../utils/getImages.util'
import getMainImage from '../utils/getMainImage.util'
import imageNamesToLinks from '../utils/imageNamesToLinks.util'
import fs from 'fs'
import isInteger from "../utils/isInteger.util"
const Superhero = db.superhero;

export async function create(data: Request<{}, {}, RequestBody>) {
  const mainImage = getMainImage((data as any).files)
  const images = getImages((data as any).files)

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
    return formattedNewSuperhero.dataValues
  } else {
    const err: ResponseError = new Error('Error occured while creating a superhero');
    err.statusCode = 500;
    throw err;
  }
}

export async function getRowNumber() {
  const rowNumber = await Superhero.count()
  return rowNumber
}

export async function findAll(page: number) {
  let superheroes: SuperheroShort[] = await Superhero.findAll({
    offset: (page - 1) * 5,
    limit: 5,
    attributes: ['id', 'nickname', 'mainImage'],
    order: [['updatedAt', 'DESC']],
    raw: true
  })
  if (superheroes) {
    return superheroes.map(superhero => ({ ...superhero, mainImage: imageNamesToLinks(superhero.mainImage) }))
  } else {
    const err: ResponseError = new Error('Error occured while retreaving superheroes');
    err.statusCode = 500;
    throw err;
  }
}

export async function findOne(id: string) {

  if (!isInteger(id)) {
    const err: ResponseError = new Error(`Invalid superhero id`);
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
    const err: ResponseError = new Error(`No superhero with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
}

export async function deleteOne(id: number) {

  const folder = __dirname + "/../../static/images/"
  const superhero: SuperheroFull = await Superhero.findByPk(id)

  if (!superhero) {
    const err: ResponseError = new Error(`No superhero with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
  const superheroDestr = await Superhero.destroy({
    where: { id: id }
  })
  if (superheroDestr !== 1) {
    const err: ResponseError = new Error(`"Error deleting superhero with id=${id}`);
    err.statusCode = 409;
    throw err;
  }
  superhero.images.map(image => fs.unlink(folder + image, (err: ResponseError | null) => {
    if (err) {
      const err: ResponseError = new Error(`"Error deleting image for superhero with id=${id}`);
      err.statusCode = 500;
      throw err;
    }
  }))

  fs.unlink(folder + superhero.mainImage, (err: ResponseError | null) => {
    if (err) {
      const err: ResponseError = new Error(`"Error deleting main image for superhero with id=${id}`);
      err.statusCode = 500;
      throw err;
    }
  })
  return;
}

export async function deleteAll() {
  const folder = __dirname + "/../../static/images/"

  const superheroDestr = await Superhero.destroy({
    where: {},
    truncate: false
  })

  if (!superheroDestr) {
    const err: ResponseError = new Error(`Error deleting superheroes`);
    err.statusCode = 409;
    throw err;
  }

  fs.readdir(folder, (err: ResponseError | null, files: string[]) => {
    if (err) {
      const err: ResponseError = new Error(`Error finding superhero images`);
      err.statusCode = 500;
      throw err;
    }

    for (const file of files) {
      fs.unlink(folder + file, (err: ResponseError | null) => {
        if (err) {
          const err: ResponseError = new Error(`Error deleting a superhero image `);
          err.statusCode = 500;
          throw err;
        }
      });
    }
  })
  return;
}

export async function update(id: number, data: Request<{}, {}, RequestBody>) {
  
  if(!data.body.nickname){
    const err: ResponseError = new Error('Superhero nickname is required and was not provided');
    err.statusCode = 500;
    throw err;
  }

  const mainImage = getMainImage((data as any).files)
  const images = getImages((data as any).files)

  let superhero = await Superhero.findOne({ where: { id: id } })

  const updatedSuperhero = await superhero.update({
    nickname: data.body.nickname,
    real_name: data.body.real_name || superhero.real_name,
    origin_description: data.body.origin_description || superhero.origin_description,
    superpowers: data.body.superpowers || superhero.superpowers,
    catch_phrase: data.body.catch_phrase || superhero.catch_phrase,
    mainImage: mainImage,
    images: images || superhero.images
  })

  if (updatedSuperhero) {
    updatedSuperhero.images = imageNamesToLinks(updatedSuperhero.images)
    updatedSuperhero.mainImage = imageNamesToLinks(updatedSuperhero.mainImage)
    const { updatedAt, createdAt, ...formattedUpdatedSuperhero } = updatedSuperhero
    return formattedUpdatedSuperhero
  } else {
    const err: ResponseError = new Error('Error occured while updating a superhero');
    err.statusCode = 500;
    throw err;
  }
}