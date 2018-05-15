import * as express from "express";
import UserQuizAnswerDAO from "../dao/user_quiz_answer-dao";

export class UserQuizAnswerController {
  static getAll(req: express.Request, res: express.Response): void {
    UserQuizAnswerDAO
        ["getAll"]()
        .then(answers => res.status(200).json(answers))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    let _userId = req["user"]._id;
    
    UserQuizAnswerDAO
        ["getById"](req.params.id)
        .then(answer => res.status(200).json(answer))
        .catch(error => res.status(400).json(error));
  }

  static createUserQuizAnswer(req: express.Request, res: express.Response):void {
      let _answer = req.body;
      let _userId = req["user"]._id;

      UserQuizAnswerDAO
        ["createUserQuizAnswer"](_answer)
        .then(answer => res.status(201).json(answer))
        .catch(error => res.status(400).json(error));
  }

  static deleteUserQuizAnswer(req: express.Request, res: express.Response): void {
    let _id = req.params.id;
    let _userId = req["user"]._id;

    UserQuizAnswerDAO
      ["deleteUserQuizAnswer"](_id)
      .then((answer) => res.status(200).json(answer))
      .catch(error => res.status(400).json(error));
  }
}
