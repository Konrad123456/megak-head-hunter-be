import { NextFunction, Request, Response } from "express";

export const getStudentsList = (req: Request, res: Response, next: NextFunction) => {
  res.send({ msg: 'get list' })
}