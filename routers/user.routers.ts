import { Router } from 'express';
import { getStudentsList } from './user/getStudentsList';

export const userRouter = Router()
  .get('/:page/:limit', async (req, res, next) => {
    // Students list
    // Example url http://localhost:3001/user/2/10
    getStudentsList(req, res, next);
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
