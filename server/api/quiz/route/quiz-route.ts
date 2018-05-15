"use strict";

import * as express from "express";
import {QuizController} from "../controller/quiz-controller";
import * as auth from '../../../auth/auth-service';

export class QuizRoutes {
    static init(router: express.Router) {
      router
        .route("/api/quiz")
        .get(auth.isAuthenticated(), QuizController.getAll)
        .post(auth.isAuthenticated(), QuizController.createQuiz);

      router
        .route("/api/quiz/:id")
        .get(auth.isAuthenticated(), QuizController.getById)
        .put(auth.isAuthenticated(), QuizController.updateQuiz)
        .delete(auth.isAuthenticated(), QuizController.deleteQuiz);
      
      router
        .route("/api/quiz/question/add/:id")
        .post(auth.isAuthenticated(), QuizController.addQuestion);
      
      router
        .route("/api/quiz/question/update/:id/:id_question")
        .post(auth.isAuthenticated(), QuizController.editQuestion);
    }
}
