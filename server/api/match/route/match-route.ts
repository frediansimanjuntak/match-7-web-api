"use strict";

import * as express from "express";
import {MatchController} from "../controller/match-controller";
import * as auth from '../../../auth/auth-service';

export class MatchRoutes {
    static init(router: express.Router) {
      router
        .route("/api/match")
        .get(auth.isAuthenticated(), MatchController.getAll)
        .post(auth.isAuthenticated(), MatchController.createMatch);

      router
        .route("/api/match/:id")
        .put(auth.isAuthenticated(), MatchController.updateMatch)
        .delete(auth.isAuthenticated(), MatchController.deleteMatch);
    }
}
