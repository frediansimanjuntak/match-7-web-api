import * as express from "express";
import UserDAO from "../dao/user-dao";

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
        .then(todo => res.status(200).json(todo))
        .catch(error => res.status(400).json(error));
  }

  static createTodo(req: express.Request, res: express.Response):void {
      let _todo = req.body;

    UserDAO
        ["createUser"](_todo)
        .then(todo => res.status(201).json(todo))
        .catch(error => res.status(400).json(error));
  }

  static deleteTodo(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    UserDAO
        ["deleteUser"](_id)
        .then(() => res.status(200).end())
        .catch(error => res.status(400).json(error));
  }
}
