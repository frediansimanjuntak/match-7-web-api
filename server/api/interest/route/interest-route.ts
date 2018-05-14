"use strict";

import * as express from "express";
import {InterestController} from "../controller/interest-controller";

export class InterestRoutes {
    static init(router: express.Router) {
      router
        .route("/api/interest")
        .get(InterestController.getAll)
        .post(InterestController.createInterest);

      router
        .route("/api/interest/:id")
        .put(InterestController.updateInterest)
        .delete(InterestController.deleteInterest);
    }
}
