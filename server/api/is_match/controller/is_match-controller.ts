import * as express from "express";
import IsMatchDAO from "../dao/is_match-dao";

export class IsMatchController {
  static createLikeIsMatch(req: express.Request, res: express.Response):void {
      let _match = req.body;
      let _userId = req["user"]._id;

      IsMatchDAO
        ["createLikeIsMatch"](_match, _userId)
        .then(match => res.status(201).json(match))
        .catch(error => res.status(400).json(error));
  }

  static createUnLikeIsMatch(req: express.Request, res: express.Response):void {
    let _match = req.body;
    let _userId = req["user"]._id;

    IsMatchDAO
      ["createUnLikeIsMatch"](_match, _userId)
      .then(match => res.status(201).json(match))
      .catch(error => res.status(400).json(error));
}
}