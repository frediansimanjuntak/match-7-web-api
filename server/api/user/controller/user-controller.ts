import * as express from "express";
import UserDAO from "../dao/user-dao";
var passport = require('passport');

export class UserController {
  static getAll(req: express.Request, res: express.Response): void {
    UserDAO
        ["getAll"]()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    UserDAO
        ["getById"](req.params.id)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static me(req: express.Request, res: express.Response):void {
    let _userId = req["user"]._id;

    UserDAO
        ["me"](_userId)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static activateUser(req: express.Request, res: express.Response):void {
    let _user = req.body;

    UserDAO
        ["activateUser"](_user)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static createUser(req: express.Request, res: express.Response):void {
      let _user = req.body;

    UserDAO
        ["createUser"](_user)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json(error));
  }

  static deleteUser(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    UserDAO
        ["deleteUser"](_id)
        .then((user) => res.status(200).end(user))
        .catch(error => res.status(400).json(error));
  }
}
