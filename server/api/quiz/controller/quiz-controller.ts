import * as express from "express";
import QuizDAO from "../dao/quiz-dao";

export class QuizController {
  static getAll(req: express.Request, res: express.Response): void {
    QuizDAO
        ["getAll"]()
        .then(quizes => res.status(200).json(quizes))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    QuizDAO
        ["getById"](req.params.id)
        .then(quiz => res.status(200).json(quiz))
        .catch(error => res.status(400).json(error));
  }

  static createQuiz(req: express.Request, res: express.Response):void {
      let _quiz = req.body;

      QuizDAO
        ["createQuiz"](_quiz)
        .then(quiz => res.status(201).json(quiz))
        .catch(error => res.status(400).json(error));
  }

  static deleteQuiz(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    QuizDAO
      ["deleteQuiz"](_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
