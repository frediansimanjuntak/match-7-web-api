"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Promise = require("bluebird");
var _ = require("lodash");
var user_model_1 = require("../model/user-model");
var email_1 = require("../../../global/func/email");
user_model_1.default.static("getAll", function () {
    return new Promise(function (resolve, reject) {
        var _query = {};
        User.find(_query)
            .exec(function (err, users) {
            err ? reject(err)
                : resolve(users);
        });
    });
});
user_model_1.default.static("getById", function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            return reject(new TypeError("User is not a valid object."));
        }
        User.findById(id)
            .exec(function (err, user) {
            err ? reject(err)
                : resolve(user);
        });
    });
});
user_model_1.default.static("createUser", function (user) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }
        var randomCode = Math.random().toString(36).substr(2, 6);
        var _user = new User(user);
        _user.verification.code = randomCode;
        _user.verification.verified.type = "email";
        _user.save(function (err, saved) {
            if (err)
                reject(err);
            else if (saved) {
                email_1.email.signUp(saved);
                resolve(saved);
            }
        });
    });
});
user_model_1.default.static("activateUser", function (user) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }
        User.findOneAndUpdate({
            'email': user['email'],
            'verification.code': user['code'],
            'verification.verified.type': user['type']
        }, { $set: {
                'verification.verified.status': true
            } })
            .exec(function (err, user) {
            err ? reject(err)
                : resolve(user);
        });
    });
});
user_model_1.default.static("deleteUser", function (id) {
    return new Promise(function (resolve, reject) {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        User.findByIdAndRemove(id)
            .exec(function (err, deleted) {
            err ? reject(err)
                : resolve();
        });
    });
});
var User = mongoose.model("User", user_model_1.default);
exports.default = User;
//# sourceMappingURL=user-dao.js.map