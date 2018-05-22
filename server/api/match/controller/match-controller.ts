import * as express from "express";
import MatchDAO from "../dao/match-dao";

export class MatchController {
  static getAll(req: express.Request, res: express.Response): void {
    MatchDAO
        ["getAll"]()
        .then(matches => res.status(200).json(matches))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    MatchDAO
        ["getById"](req.params.id)
        .then(match => res.status(200).json(match))
        .catch(error => res.status(400).json(error));
  }

  static createMatch(req: express.Request, res: express.Response):void {
      let _match = req.body;

      MatchDAO
        ["createMatch"](_match)
        .then(match => res.status(201).json(match))
        .catch(error => res.status(400).json(error));
  }

  static updateMatch(req: express.Request, res: express.Response):void {
    let _id = req.params.id;
    let _match = req.body;

    MatchDAO
        ["updateMatch"](_id, _match)
        .then(match => res.status(200).json(match))
        .catch(error => res.status(400).json(error));
  }

  static deleteMatch(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    MatchDAO
      ["deleteMatch"](_id)
      .then((match) => res.status(200).json(match))
      .catch(error => res.status(400).json(error));
  }
}
