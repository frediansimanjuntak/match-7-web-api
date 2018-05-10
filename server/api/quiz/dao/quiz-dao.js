"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Promise = require("bluebird");
var _ = require("lodash");
var quiz_model_1 = require("../model/quiz-model");
quiz_model_1.default.static("getAll", function () {
    return new Promise(function (resolve, reject) {
        var _query = {};
        Quiz.find(_query)
            .exec(function (err, quizs) {
            err ? reject(err)
                : resolve(quizs);
        });
    });
});
quiz_model_1.default.static("getById", function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            return reject(new TypeError("Quiz is not a valid object."));
        }
        Quiz.findById(id)
            .exec(function (err, quiz) {
            err ? reject(err)
                : resolve(quiz);
        });
    });
});
quiz_model_1.default.static("createQuiz", function (quiz) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(quiz)) {
            return reject(new TypeError("Quiz is not a valid object."));
        }
        var _quiz = new Quiz(quiz);
        _quiz.save(function (err, saved) {
            err ? reject(err)
                : resolve(saved);
        });
    });
});
quiz_model_1.default.static("deleteQuiz", function (id) {
    return new Promise(function (resolve, reject) {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        Quiz.findByIdAndRemove(id)
            .exec(function (err, deleted) {
            err ? reject(err)
                : resolve();
        });
    });
});
var Quiz = mongoose.model("Quiz", quiz_model_1.default);
exports.default = Quiz;
//# sourceMappingURL=quiz-dao.js.map