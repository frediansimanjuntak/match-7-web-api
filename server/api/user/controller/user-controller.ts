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

  static getTest(req: express.Request, res: express.Response): void {
    UserDAO
        ["getTest"]()
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

  static updateUser(req: express.Request, res: express.Response):void {
    let _userId = req["user"]._id;
    let _user = req.body;

    UserDAO
        ["updateUser"](_userId, _user)
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

  static register(req: express.Request, res: express.Response):void {
      let _user = req.body;

    UserDAO
        ["register"](_user)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json(error));
  }

  static deleteUser(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    UserDAO
        ["deleteUser"](_id)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static addUserEducation(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;
    let _user = req.body;

    UserDAO
        ["addUserEducation"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static addUserOccupation(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;
    let _user = req.body;

    UserDAO
        ["addUserOccupation"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static addUserInterest(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;
    let _user = req.body;

    UserDAO
        ["addUserInterest"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static enableUserGoogle2fa(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;
    UserDAO
        ["enableUserGoogle2fa"](_userId)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static disableUserGoogle2fa(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;

    UserDAO
        ["disableUserGoogle2fa"](_userId)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }
  
  static changeLocation(req: express.Request, res: express.Response): void {
    let _userId = req["user"]._id;
    let _user = req.body;

    UserDAO
        ["changeLocation"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static changePassword(req: express.Request, res: express.Response): void {    
    let _user = req.body;
    let _userId = req["user"].role == "user" ? req["user"]._id : _user.id_user;

    UserDAO
        ["changePassword"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static changeDisabled(req: express.Request, res: express.Response): void {
    let _user = req.body;
    let _userId = req["user"].role == "user" ? req["user"]._id : _user.id_user;

    UserDAO
        ["changeDisabled"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }

  static blockedUsers(req: express.Request, res: express.Response): void {
    let _user = req.body;
    let _userId = req["user"].role == "user" ? req["user"]._id : _user.id_user;

    UserDAO
        ["blockedUsers"](_userId, _user)
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
  }
}
