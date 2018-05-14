"use strict";

import * as express from "express";
import {UserController} from "../controller/user-controller";
import * as auth from '../../../auth/auth-service';

export class UserRoutes {
    static init(router: express.Router) {
      router
        .route("/api/users")
        .get(UserController.getAll)
        .post(UserController.createUser);

      router
        .route("/api/users/:id")
        .delete(UserController.deleteUser);      
      
      router
        .route("/api/users/activation")
        .post(UserController.activateUser);
      
      router
        .route("/api/me")
        .get(auth.isAuthenticated(), UserController.me);
    }
}
