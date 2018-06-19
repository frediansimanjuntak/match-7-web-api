"use strict";

import * as express from "express";
import {IsMatchController} from "../controller/is_match-controller";
import * as auth from '../../../auth/auth-service';

export class IsMatchRoutes {
    static init(router: express.Router) {
    router
        .route("/api/is_match/like")
        .post(auth.isAuthenticated(), IsMatchController.createLikeIsMatch);
    
    router
        .route("/api/is_match/unlike")
        .post(auth.isAuthenticated(), IsMatchController.createUnLikeIsMatch);
    }
}
