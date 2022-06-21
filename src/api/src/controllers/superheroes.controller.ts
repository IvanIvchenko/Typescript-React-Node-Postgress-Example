import { Request, Response, NextFunction } from 'express'
import * as superheroes from '../services/superheroes.service'
import { RequestBody, RequestParams } from '../utils/interfaces';
import isInteger from '../utils/isInteger.util'

export const create = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await superheroes.create(req));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while creating superhero:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
};

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rowNumber = await superheroes.getRowNumber()
    const page =  typeof Number(req.query.page) === 'number' && isInteger(req.query.page as string) ? Number(req.query.page) : 1
    const findedSuperheroes = await superheroes.findAll(page)
    res.status(200).set({ 'X-total-count': rowNumber }).json(findedSuperheroes)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while retreaving superheroes:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
};

export const findOne = async (req: Request<RequestParams, {}, {}>, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await superheroes.findOne(req.params.id as string));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while retreaving a superhero:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
};

export const update = async (req: Request<RequestParams, {}, RequestBody>, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await superheroes.update(Number(req.params.id), req));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while updating a superhero:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
}

export const deleteOne = async (req: Request<RequestParams, {}, {}>, res: Response, next: NextFunction) => {
  try {
    res.status(204).json(await superheroes.deleteOne(Number(req.params.id)))
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while deleting superhero with id=${req.params.id}:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
}

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(204).json(await superheroes.deleteAll())
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while deleting superheroes:`, err.message);
      next(err);
    }
    console.error("Unknown error occured.")
    next(err);
  }
}


