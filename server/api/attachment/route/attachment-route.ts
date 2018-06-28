"use strict";

import * as express from "express";
import {AttachmentController} from "../controller/attachment-controller";
import * as auth from '../../../auth/auth-service';
import * as multer from "multer";
import * as mime from "mime";
import * as path from "path";
import * as crypto from "crypto";

const maxSize = 2 * 1048576 ; //1 Megabyte = 1,048,576 byte 
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {            
            callback(null, file.fieldname + '-' + raw.toString('hex') + Date.now()+ '.' + mime.getExtension(file.mimetype));
        })
    }
  });
const upload = multer({ 
    storage : storage, 
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: { fileSize: maxSize } 
});

export class AttachmentRoutes {
    static init(router: express.Router) {
      router
        .route("/api/attachment")
        .post(auth.isAuthenticated(), upload.array('attachment', 8), AttachmentController.createAttachment);

    router
        .route("/api/attachment")
        .get(auth.isAuthenticated(), AttachmentController.getAll);
    
    router
        .route("/api/attachment/link/:id")
        .get(auth.isAuthenticated(), AttachmentController.getLink);

      router
        .route("/api/attachment/:id")
        .get(auth.isAuthenticated(), AttachmentController.getById)
        .put(auth.isAuthenticated(), upload.array('attachment', 8), AttachmentController.updateAttachment)
        .delete(auth.isAuthenticated(), AttachmentController.deleteAttachment);
    }
}
