"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quiz_controller_1 = require("../controller/quiz-controller");
var QuizRoutes = /** @class */ (function () {
    function QuizRoutes() {
    }
    QuizRoutes.init = function (router) {
        router
            .route("/api/quiz")
            .get(quiz_controller_1.QuizController.getAll)
            .post(quiz_controller_1.QuizController.createQuiz);
        router
            .route("/api/quiz/:id")
            .delete(quiz_controller_1.QuizController.deleteQuiz);
    };
    return QuizRoutes;
}());
exports.QuizRoutes = QuizRoutes;
//# sourceMappingURL=quiz-route.js.map