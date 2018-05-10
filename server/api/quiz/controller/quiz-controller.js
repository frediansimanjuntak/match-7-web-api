"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quiz_dao_1 = require("../dao/quiz-dao");
var QuizController = /** @class */ (function () {
    function QuizController() {
    }
    QuizController.getAll = function (req, res) {
        quiz_dao_1.default["getAll"]()
            .then(function (quizes) { return res.status(200).json(quizes); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    QuizController.getById = function (req, res) {
        quiz_dao_1.default["getById"](req.params.id)
            .then(function (quiz) { return res.status(200).json(quiz); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    QuizController.createQuiz = function (req, res) {
        var _quiz = req.body;
        quiz_dao_1.default["createQuiz"](_quiz)
            .then(function (quiz) { return res.status(201).json(quiz); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    QuizController.deleteQuiz = function (req, res) {
        var _id = req.params.id;
        quiz_dao_1.default["deleteQuiz"](_id)
            .then(function () { return res.status(200).end(); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return QuizController;
}());
exports.QuizController = QuizController;
//# sourceMappingURL=quiz-controller.js.map