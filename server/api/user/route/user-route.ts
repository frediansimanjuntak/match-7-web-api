"use strict";

import * as express from "express";
import {UserController} from "../controller/user-controller";
import * as auth from '../../../auth/auth-service';

export class UserRoutes {
    static init(router: express.Router) {
      
      router
        .route("/api/me")
        .get(auth.isAuthenticated(), UserController.me);      
        
      router
        .route("/api/test")
        .get(UserController.getTest);

      router
        .route("/api/register")
        .post(UserController.register);

      router
        .route("/api/users")
        .get(UserController.getAll)
        .put(auth.isAuthenticated(), UserController.updateUser);

      router
        .route("/api/users/:id")
        .delete(auth.isAuthenticated(),UserController.deleteUser);      
      
      router
        .route("/api/users/activation")
        .post(UserController.activateUser); 

      router
        .route("/api/users/block-user")
        .post(UserController.blockedUsers);   
                    
      router
        .route("/api/users/change/location")
        .put(auth.isAuthenticated(), UserController.changeLocation);
              
      router
        .route("/api/users/change/status")
        .put(auth.isAuthenticated(), UserController.changeDisabled);

      router
        .route("/api/user/education")
        .post(auth.isAuthenticated(), UserController.addUserEducation);

      router
          .route("/api/user/occupation")
          .post(auth.isAuthenticated(), UserController.addUserOccupation);

      router
        .route("/api/user/interest")
        .post(auth.isAuthenticated(), UserController.addUserInterest);   
                  
      router
        .route("/api/user/photo/:id_photo/:id_attachment")
        .delete(auth.isAuthenticated(), UserController.deletePhoto);
              
      router
        .route("/api/user/photo/default/:id_photo")
        .post(auth.isAuthenticated(), UserController.changeDefaultPhoto)

      router
        .route("/api/users/google2fa/enable")
        .post(auth.isAuthenticated(), UserController.enableUserGoogle2fa);

      router
          .route("/api/users/google2fa/disable")
          .post(auth.isAuthenticated(), UserController.disableUserGoogle2fa);
    }
}
