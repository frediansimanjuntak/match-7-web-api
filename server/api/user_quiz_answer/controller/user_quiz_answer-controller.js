"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_quiz_answer_dao_1 = require("../dao/user_quiz_answer-dao");
var UserQuizAnswerController = /** @class */ (function () {
    function UserQuizAnswerController() {
    }
    UserQuizAnswerController.getAll = function (req, res) {
        user_quiz_answer_dao_1.default["getAll"]()
            .then(function (answers) { return res.status(200).json(answers); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserQuizAnswerController.getById = function (req, res) {
        user_quiz_answer_dao_1.default["getById"](req.params.id)
            .then(function (answer) { return res.status(200).json(answer); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserQuizAnswerController.createUserQuizAnswer = function (req, res) {
        var _answer = req.body;
        user_quiz_answer_dao_1.default["createUserQuizAnswer"](_answer)
            .then(function (answer) { return res.status(201).json(answer); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserQuizAnswerController.deleteUserQuizAnswer = function (req, res) {
        var _id = req.params.id;
        user_quiz_answer_dao_1.default["deleteUserQuizAnswer"](_id)
            .then(function () { return res.status(200).end(); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return UserQuizAnswerController;
}());
exports.UserQuizAnswerController = UserQuizAnswerController;
//# sourceMappingURL=user_quiz_answer-controller.js.map