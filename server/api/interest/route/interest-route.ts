"use strict";

import * as express from "express";
import {InterestController} from "../controller/interest-controller";
import * as auth from '../../../auth/auth-service';

export class InterestRoutes {
    static init(router: express.Router) {
      router
        .route("/api/interest")
        .get(auth.isAuthenticated(), InterestController.getAll)
        .post(auth.isAuthenticated(), InterestController.createInterest);

      router
        .route("/api/interest/:id")
        .put(auth.isAuthenticated(), InterestController.updateInterest)
        .delete(auth.isAuthenticated(), InterestController.deleteInterest);
    }
}
