"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_quiz_answer_controller_1 = require("../controller/user_quiz_answer-controller");
var TodoRoutes = /** @class */ (function () {
    function TodoRoutes() {
    }
    TodoRoutes.init = function (router) {
        router
            .route("/api/user/quiz/answer")
            .get(user_quiz_answer_controller_1.UserQuizAnswerController.getAll)
            .post(user_quiz_answer_controller_1.UserQuizAnswerController.createUserQuizAnswer);
        router
            .route("/api/user/quiz/answer/:id")
            .delete(user_quiz_answer_controller_1.UserQuizAnswerController.deleteUserQuizAnswer);
    };
    return TodoRoutes;
}());
exports.TodoRoutes = TodoRoutes;
//# sourceMappingURL=user_quiz_answer-route.js.map