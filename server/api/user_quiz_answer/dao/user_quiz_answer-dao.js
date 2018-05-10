"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Promise = require("bluebird");
var _ = require("lodash");
var user_quiz_answer_model_1 = require("../model/user_quiz_answer-model");
user_quiz_answer_model_1.default.static("getAll", function () {
    return new Promise(function (resolve, reject) {
        var _query = {};
        Answer.find(_query)
            .exec(function (err, answers) {
            err ? reject(err)
                : resolve(answers);
        });
    });
});
user_quiz_answer_model_1.default.static("getById", function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            return reject(new TypeError("Todo is not a valid object."));
        }
        Answer.findById(id)
            .exec(function (err, answer) {
            err ? reject(err)
                : resolve(answer);
        });
    });
});
user_quiz_answer_model_1.default.static("createUserQuizAnswer", function (answer) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(answer)) {
            return reject(new TypeError("Todo is not a valid object."));
        }
        var _answer = new Answer(answer);
        _answer.save(function (err, saved) {
            err ? reject(err)
                : resolve(saved);
        });
    });
});
user_quiz_answer_model_1.default.static("deleteUserQuizAnswer", function (id) {
    return new Promise(function (resolve, reject) {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        Answer.findByIdAndRemove(id)
            .exec(function (err, deleted) {
            err ? reject(err)
                : resolve();
        });
    });
});
var Answer = mongoose.model("Answer", user_quiz_answer_model_1.default);
exports.default = Answer;
//# sourceMappingURL=user_quiz_answer-dao.js.map