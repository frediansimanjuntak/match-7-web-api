"use strict";

import * as express from "express";
import {UserQuizAnswerController} from "../controller/user_quiz_answer-controller";
import * as auth from '../../../auth/auth-service';

export class UserQuizAnswerRoutes {
    static init(router: express.Router) {
      router
        .route("/api/user/quiz/answer")
        .get(auth.isAuthenticated(), UserQuizAnswerController.getAll)
        .post(auth.isAuthenticated(), UserQuizAnswerController.createUserQuizAnswer);

      router
        .route("/api/user/quiz/answer/:id")
        .put(auth.isAuthenticated(), UserQuizAnswerController.updateUserQuizAnswer)
        .delete(auth.isAuthenticated(), UserQuizAnswerController.deleteUserQuizAnswer);
    }
}
