"use strict";

import * as express from "express";
import {UserController} from "../controller/user-controller";

export class UserRoutes {
    static init(router: express.Router) {
      router
        .route("/api/users")
        .get(UserController.getAll)
        .post(UserController.createTodo);

      router
        .route("/api/users/:id")
        .delete(UserController.deleteTodo);
    }
}
