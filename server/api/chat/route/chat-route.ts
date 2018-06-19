"use strict";

import * as express from "express";
import {ChatController} from "../controller/chat-controller";
import * as auth from '../../../auth/auth-service';

export class ChatRoutes {
    static init(router: express.Router) {
      router
        .route("/api/chat")
        .get(auth.isAuthenticated(), ChatController.getAll)
        .post(auth.isAuthenticated(), ChatController.createChat);

      router
        .route("/api/chat/:id")
        .get(auth.isAuthenticated(), ChatController.getById)
        .put(auth.isAuthenticated(), ChatController.updateChat)
        .delete(auth.isAuthenticated(), ChatController.deleteChat);
      
      router
        .route("/api/chat/match/:match_id")
        .get(auth.isAuthenticated(), ChatController.getByMatch);
    }
}
