import { Router } from 'express';
import { getStudentsList } from './user/getStudentsList';
import { getStudentCV } from './user/getStudentCV';
import { getOneStudent } from './user/getOneStudent';
import { getAllStudentsCount } from './user/getAllStudentsCount';

export const userRouter = Router()
  // Get students count
  // Example url: http://localhost:3001/user/count
  .get('/count', async (req, res, next) => {
    getAllStudentsCount(req, res, next);
  })

  // Student CV
  // Example url: http://localhost:3001/user/cv/0c43b548-8b89-4931-a8a2-715d8f531ecd
  .get('/cv/:id', async (req, res, next) => {
    getStudentCV(req, res, next);
  })

  // Students list
  // Example url: http://localhost:3001/user/2/10
  .get('/:page/:limit', async (req, res, next) => {
    getStudentsList(req, res, next);
  })

  // Student CV
  // Example url: http://localhost:3001/user/0c43b548-8b89-4931-a8a2-715d8f531ecd
  .get('/:id', async (req, res, next) => {
    // add new user
    getOneStudent(req, res, next);
  })

  .get('/talk/', async (req, res, next) => {
    // Students to talk
    res.json(`Get to talk.`);
  })

  .post('/:id', async (req, res, next) => {
    // add new user
    res.json(`Post user: ${req.params.id}`);
  })

  .put('/:id', async (req, res, next) => {
    // update students or hr data
    res.json(`Put user: ${req.params.id}`);
  })

  .put('/password/:id', async (req, res, next) => {
    // update students or hr data
    res.json(`Put pass: ${req.params.id}`);
  })
