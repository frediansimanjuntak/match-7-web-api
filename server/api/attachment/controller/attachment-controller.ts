import * as express from "express";
import AttachmentDAO from "../dao/attachment-dao";

export class AttachmentController {
  static getAll(req: express.Request, res: express.Response): void {
    AttachmentDAO
        ["getAll"]()
        .then(attachments => res.status(200).json(attachments))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    AttachmentDAO
        ["getById"](req.params.id)
        .then(attachment => res.status(200).json(attachment))
        .catch(error => res.status(400).json(error));
  }

  static createAttachment(req: express.Request, res: express.Response):void {
      let _body = req.body;
      let _files = req.files;
      let _userId = req["user"]._id;

      AttachmentDAO
        ["createAttachment"](_body, _files, _userId)
        .then(attachment => res.status(201).json(attachment))
        .catch(error => res.status(400).json(error));
  }
  
  static updateAttachment(req: express.Request, res: express.Response):void {
    let _id = req.params.id;
    let _attachment = req.body;

    AttachmentDAO
        ["updateAttachment"](_id, _attachment)
        .then(attachment => res.status(200).json(attachment))
        .catch(error => res.status(400).json(error));
  }

  static deleteAttachment(req: express.Request, res: express.Response): void {
    let _id = req.params.id;

    AttachmentDAO
      ["deleteAttachment"](_id)
      .then((attachment) => res.status(200).json(attachment))
      .catch(error => res.status(400).json(error));
  }  
}