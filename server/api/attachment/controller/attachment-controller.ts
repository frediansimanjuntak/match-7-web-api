import * as express from "express";
import AttachmentDAO from "../dao/attachment-dao";

export class AttachmentController {
  static getAll(req: express.Request, res: express.Response): void {
    AttachmentDAO
        ["getAll"]()
        .then(attachments => res.status(200).json(attachments))
        .catch(error => res.status(400).json(error));
  }

  static getLink(req: express.Request, res: express.Response):void {
    AttachmentDAO
        ["getLink"](req.params.id)
        .then(attachment => res.status(200).json(attachment))
        .catch(error => res.status(400).json(error));
  }

  static getById(req: express.Request, res: express.Response):void {
    AttachmentDAO
        ["getById"](req.params.id)
        .then(attachment => res.status(200).json(attachment))
        .catch(error => res.status(400).json(error));
  }

  static createAttachment(req: express.Request, res: express.Response):void {
      let _files = req.files;
      let _userId = req["user"]._id;

      AttachmentDAO
        ["createAttachment"](_files, _userId)
        .then(attachment => res.status(201).json(attachment))
        .catch(error => res.status(400).json(error));
  }

  static changePhotoUser(req: express.Request, res: express.Response):void {
    let _files = req.files;
    let _userId = req["user"]._id;
    let _id_photo = req.params.id_photo;
    let _id_attachment = req.params.id_attachment;

    AttachmentDAO
      ["changePhotoUser"](_files, _userId, _id_photo, _id_attachment)
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
  
  static deleteFile(req: express.Request, res: express.Response): void {

    AttachmentDAO
      ["deleteFile"]()
      .then((attachment) => res.status(200).json(attachment))
      .catch(error => res.status(400).json(error));
  }  
}