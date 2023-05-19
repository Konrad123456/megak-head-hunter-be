import { Router } from 'express';
import { getStudentsList } from './user/getStudentsList';
import { getStudentCV } from './user/getStudentCV';
import { getOneStudent } from './user/getOneStudent';
import { getAllStudentsCount } from './user/getAllStudentsCount';
import { updateStudentData } from './user/updateStudentData';
import { changePassword } from './user/changePassword';
import { addToTalk } from './user/addToTalk';
import { getToTalkList } from './user/getToTalkList';
import { removeFromTalk } from './user/removeFromTalk';
import { studentHired } from './user/studentHired';

export const userRouter = Router()
  // Get students count
  // Example url: http://localhost:3001/user/count
  .get('/count', async (req, res, next) => {
    getAllStudentsCount(req, res, next);
  })

  // Students to talk
  .get('/talk/:page/:limit', async (req, res, next) => {
    getToTalkList(req, res, next);
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
  .get('/', async (req, res, next) => {
    getOneStudent(req, res, next);
  })

  
  // Add Student to talk
  .post('/talk', async (req, res, next) => {
    addToTalk(req, res, next);
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
  .put('/password', async (req, res, next) => {
    changePassword(req, res, next);
  })

  // update students or hr data
  .put('/hired/:id', async (req, res, next) => {
    studentHired(req, res, next);
  })

  // update students or hr data
  .delete('/talk', async (req, res, next) => {
    removeFromTalk(req, res, next);
  })
