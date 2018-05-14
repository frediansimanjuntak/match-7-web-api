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
        .get(QuizController.getById)
        .delete(QuizController.deleteQuiz);
      
      router
        .route("/api/quiz/question/add/:id")
        .post(QuizController.addQuestion);
      
      router
        .route("/api/quiz/question/update/:id/:id_question")
        .post(QuizController.editQuestion);
    }
}
