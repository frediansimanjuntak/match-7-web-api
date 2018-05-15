"use strict";

import * as express from "express";
import {UserController} from "../controller/user-controller";
import * as auth from '../../../auth/auth-service';

export class UserRoutes {
    static init(router: express.Router) {
      
      router
        .route("/api/register")
        .post(UserController.register);

      router
        .route("/api/users")
        .get(auth.isAuthenticated(), UserController.getAll)
        .put(auth.isAuthenticated(), UserController.updateUser);

      router
        .route("/api/users/:id")
        .delete(auth.isAuthenticated(),UserController.deleteUser);      
      
      router
        .route("/api/users/activation")
        .post(auth.isAuthenticated(), UserController.activateUser);
      
      router
        .route("/api/me")
        .get(auth.isAuthenticated(), UserController.me);
              
      router
        .route("/api/user/education/add")
        .post(auth.isAuthenticated(), UserController.addUserEducation);
      
      router
        .route("/api/user/education/edit/:id_education")
        .post(auth.isAuthenticated(), UserController.editUserEducation);
    }
}
