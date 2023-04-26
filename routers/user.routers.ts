import { Router } from 'express';
import { getStudentsList } from './user/getStudentsList';

export const userRouter = Router()
  .get('/', async (req, res, next) => {
    // Students list
    getStudentsList(req, res, next) ;
  })

  .post('/:id', async (req, res, next) => {
    // add new user
  })

  .put('/:id', async (req, res, next) => {
    // update students or hr data
  })

  .get('/cv/:id', async (req, res, next) => {
    // Student CV
  })

  .get('/talk/', async (req, res, next) => {
    // Students to talk
  })
