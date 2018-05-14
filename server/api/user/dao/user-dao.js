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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: users });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
        });
    });
});
user_model_1.default.static("me", function (userId) {
    return new Promise(function (resolve, reject) {
        if (!userId) {
            return reject(new TypeError("User is not a valid."));
        }
        User.findById(userId)
            .exec(function (err, user) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
        });
    });
});
user_model_1.default.static("register", function (user) {
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
                reject({ success: false, message: err.message });
            else if (saved) {
                email_1.email.signUp(saved);
                resolve({ success: true, data: saved });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
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
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: { message: "Deleted success" } });
        });
    });
});
user_model_1.default.static("updateUser", function (id, user) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }
        User.findByIdAndUpdate(id, user)
            .exec(function (err, user) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
        });
    });
});
user_model_1.default.static("addUserEducation", function (id, user) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }
        var body = user;
        var updatePushObj = { $push: {} };
        console.log();
        updatePushObj.$push['education'] = ({ 'type': body.type, 'school_name': body.school_name });
        User.findByIdAndUpdate(id, updatePushObj)
            .exec(function (err, user) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
        });
    });
});
user_model_1.default.static("editUserEducation", function (id, id_education, user) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }
        var ObjectID = mongoose.Types.ObjectId;
        var body = user;
        User.update({ '_id': id, 'education': { $elemMatch: { '_id': new ObjectID(id_education) } } }, {
            $set: {
                'education.$': {
                    'type': body.type,
                    'school_name': body.school_name
                }
            }
        })
            .exec(function (err, user) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: user });
        });
    });
});
var User = mongoose.model("User", user_model_1.default);
exports.default = User;
//# sourceMappingURL=user-dao.js.map