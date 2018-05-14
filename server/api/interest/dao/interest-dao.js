"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Promise = require("bluebird");
var _ = require("lodash");
var interest_model_1 = require("../model/interest-model");
interest_model_1.default.static("getAll", function () {
    return new Promise(function (resolve, reject) {
        var _query = {};
        Interest.find(_query)
            .exec(function (err, interests) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: interests });
        });
    });
});
interest_model_1.default.static("getById", function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            return reject(new TypeError("Interest is not a valid object."));
        }
        Interest.findById(id)
            .exec(function (err, interest) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: interest });
        });
    });
});
interest_model_1.default.static("createInterest", function (interest) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(interest)) {
            return reject(new TypeError("Interest is not a valid object."));
        }
        var _interest = new Interest(interest);
        _interest.save(function (err, saved) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: saved });
        });
    });
});
interest_model_1.default.static("updateInterest", function (id, interest) {
    return new Promise(function (resolve, reject) {
        if (!_.isObject(interest)) {
            return reject(new TypeError("interest is not a valid object."));
        }
        Interest.findByIdAndUpdate(id, interest)
            .exec(function (err, interest) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: interest });
        });
    });
});
interest_model_1.default.static("deleteInterest", function (id) {
    return new Promise(function (resolve, reject) {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        Interest.findByIdAndRemove(id)
            .exec(function (err, deleted) {
            err ? reject({ success: false, message: err.message })
                : resolve({ success: true, data: { message: "Deleted success" } });
        });
    });
});
var Interest = mongoose.model("Interest", interest_model_1.default);
exports.default = Interest;
//# sourceMappingURL=interest-dao.js.map