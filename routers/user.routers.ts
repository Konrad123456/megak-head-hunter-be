import { Router } from 'express';
import { getStudentsList } from './user/getStudentsList';
import { getStudentCV } from './user/getStudentCV';
import { getOneStudent } from './user/getOneStudent';
import { getAllStudentsCount } from './user/getAllStudentsCount';
import { updateStudentData } from './user/updateStudentData';
import { changePassword } from './user/changePassword';

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
    getOneStudent(req, res, next);
  })

  .get('/talk/', async (req, res, next) => {
    // Students to talk
    res.json(`Get to talk.`);
  })

  // add new user
  .post('/', async (req, res, next) => {
    res.json(`Post user`);
  })

  // Update students data
  .put('/', async (req, res, next) => {
    updateStudentData(req, res, next);
  })

  // update students or hr data
  .put('/password/', async (req, res, next) => {
    changePassword(req, res, next);
  })
