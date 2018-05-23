"use strict";

import * as express from "express";
import {QuestionController} from "../controller/question-controller";
import * as auth from '../../../auth/auth-service';

export class QuestionRoutes {
    static init(router: express.Router) {
      router
        .route("/api/quiz/question")
        .post(auth.isAuthenticated(), QuestionController.createQuestion);

    router
        .route("/api/quiz/question/all")
        .get(auth.isAuthenticated(), QuestionController.getAll);

    router
        .route("/api/quiz/question/:id")
        .get(auth.isAuthenticated(), QuestionController.getById)
        .put(auth.isAuthenticated(), QuestionController.updateQuestion)
        .delete(auth.isAuthenticated(), QuestionController.deleteQuestion);
    
    router
        .route("/api/quiz/question/by-quiz/:id_quiz")
        .get(auth.isAuthenticated(), QuestionController.getByQuiz);
    }
}
