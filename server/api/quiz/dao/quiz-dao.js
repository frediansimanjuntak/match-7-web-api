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
            .exec(function (err, quizzes) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: quizzes });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: quiz });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: saved });
        });
    });
});
quiz_model_1.default.static("updateQuiz", function (id, quiz) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(quiz)) {
            return reject(new TypeError("quiz is not a valid object."));
        }
        Quiz.findByIdAndUpdate(id, quiz)
            .exec(function (err, quiz) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: quiz });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: { message: "Deleted success" } });
        });
    });
});
quiz_model_1.default.static("addQuestion", function (id, question) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(question)) {
            return reject(new TypeError("User is not a valid object."));
        }
        var body = question;
        var updatePushObj = { $push: {} };
        updatePushObj.$push['question'] = ({ 'name': body.name, 'type': body.type, 'select_options': body.select_options });
        Quiz.findByIdAndUpdate(id, updatePushObj)
            .exec(function (err, quiz) {
            if (err) {
                reject({ success: false, message: err.message });
            }
            else {
                Quiz.findById(id)
                    .exec(function (err, quiz) {
                    err ? reject({ success: false, message: err.message })
                        : resolve({ success: true, data: quiz });
                });
            }
        });
    });
});
quiz_model_1.default.static("editQuestion", function (id, id_question, question) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(question)) {
            return reject(new TypeError("User is not a valid object."));
        }
        var ObjectID = mongoose.Types.ObjectId;
        var body = question;
        Quiz.update({ '_id': id, 'question': { $elemMatch: { '_id': new ObjectID(id_question) } } }, {
            $set: {
                'question.$.name': body.name,
                'question.$.type': body.type,
                'question.$.select_options': body.select_option
            }
        })
            .exec(function (err, quiz) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: quiz });
        });
    });
});
var Quiz = mongoose.model("Quiz", quiz_model_1.default);
exports.default = Quiz;
//# sourceMappingURL=quiz-dao.js.map