import * as express from "express";
import QuestionDAO from "../dao/question-dao";

export class QuestionController {
  static getAll(req: express.Request, res: express.Response): void {
    QuestionDAO
        ["getAll"]()
        .then(questions => res.status(200).json(questions))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    QuestionDAO
        ["getById"](req.params.id)
        .then(question => res.status(200).json(question))
        .catch(error => res.status(400).json(error));
  }

  static getByQuiz(req: express.Request, res: express.Response):void {
    QuestionDAO
        ["getByQuiz"](req.params.id_quiz)
        .then(question => res.status(200).json(question))
        .catch(error => res.status(400).json(error));
  }

  static createQuestion(req: express.Request, res: express.Response):void {
      let _question = req.body;

      QuestionDAO
        ["createQuestion"](_question)
        .then(question => res.status(201).json(question))
        .catch(error => res.status(400).json(error));
  }
  
  static updateQuestion(req: express.Request, res: express.Response):void {
    let _id = req.params.id;
    let _question = req.body;

    QuestionDAO
        ["updateQuestion"](_id, _question)
        .then(question => res.status(200).json(question))
        .catch(error => res.status(400).json(error));
  }

  static deleteQuestion(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    QuestionDAO
      ["deleteQuestion"](_id)
      .then((question) => res.status(200).json(question))
      .catch(error => res.status(400).json(error));
  }  
}