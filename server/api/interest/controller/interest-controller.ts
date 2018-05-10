import * as express from "express";
import InterestDAO from "../dao/interest-dao";

export class InterestController {
  static getAll(req: express.Request, res: express.Response): void {
    InterestDAO
        ["getAll"]()
        .then(interests => res.status(200).json(interests))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    InterestDAO
        ["getById"](req.params.id)
        .then(interest => res.status(200).json(interest))
        .catch(error => res.status(400).json(error));
  }

  static createInterest(req: express.Request, res: express.Response):void {
      let _interest = req.body;

      InterestDAO
        ["createInterest"](_interest)
        .then(interest => res.status(201).json(interest))
        .catch(error => res.status(400).json(error));
  }

  static deleteInterest(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    InterestDAO
      ["deleteInterest"](_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
