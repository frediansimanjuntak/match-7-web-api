"use strict";

import * as express from "express";
import {UserQuizAnswerController} from "../controller/user_quiz_answer-controller";

export class TodoRoutes {
    static init(router: express.Router) {
      router
        .route("/api/user/quiz/answer")
        .get(UserQuizAnswerController.getAll)
        .post(UserQuizAnswerController.createUserQuizAnswer);

      router
        .route("/api/user/quiz/answer/:id")
        .delete(UserQuizAnswerController.deleteUserQuizAnswer);
    }
}
