"use strict";

import * as express from "express";
import {QuizController} from "../controller/quiz-controller";

export class QuizRoutes {
    static init(router: express.Router) {
      router
        .route("/api/quiz")
        .get(QuizController.getAll)
        .post(QuizController.createQuiz);

      router
        .route("/api/quiz/:id")
        .delete(QuizController.deleteQuiz);
    }
}
