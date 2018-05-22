import * as express from "express";
import ChatDAO from "../dao/chat-dao";

export class ChatController {
  static getAll(req: express.Request, res: express.Response): void {
    ChatDAO
        ["getAll"]()
        .then(chats => res.status(200).json(chats))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    ChatDAO
        ["getById"](req.params.id)
        .then(chat => res.status(200).json(chat))
        .catch(error => res.status(400).json(error));
  }

  static createChat(req: express.Request, res: express.Response):void {
      let _chat = req.body;

      ChatDAO
        ["createChat"](_chat)
        .then(chat => res.status(201).json(chat))
        .catch(error => res.status(400).json(error));
  }
  
  static updateChat(req: express.Request, res: express.Response):void {
    let _id = req.params.id;
    let _chat = req.body;

    ChatDAO
        ["updateChat"](_id, _chat)
        .then(chat => res.status(200).json(chat))
        .catch(error => res.status(400).json(error));
  }

  static deleteChat(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    ChatDAO
      ["deleteChat"](_id)
      .then((chat) => res.status(200).json(chat))
      .catch(error => res.status(400).json(error));
  }  
}
