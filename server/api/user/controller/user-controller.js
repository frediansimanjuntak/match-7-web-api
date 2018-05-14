"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_dao_1 = require("../dao/user-dao");
var passport = require('passport');
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getAll = function (req, res) {
        user_dao_1.default["getAll"]()
            .then(function (users) { return res.status(200).json(users); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.getById = function (req, res) {
        user_dao_1.default["getById"](req.params.id)
            .then(function (user) { return res.status(200).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.me = function (req, res) {
        var _userId = req["user"]._id;
        user_dao_1.default["me"](_userId)
            .then(function (user) { return res.status(200).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.updateUser = function (req, res) {
        var _userId = req["user"]._id;
        var _user = req.body;
        user_dao_1.default["updateUser"](_userId, _user)
            .then(function (user) { return res.status(200).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.activateUser = function (req, res) {
        var _user = req.body;
        user_dao_1.default["activateUser"](_user)
            .then(function (user) { return res.status(200).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.register = function (req, res) {
        var _user = req.body;
        user_dao_1.default["register"](_user)
            .then(function (user) { return res.status(201).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.deleteUser = function (req, res) {
        var _id = req.params.id;
        user_dao_1.default["deleteUser"](_id)
            .then(function (user) { return res.status(200).end(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.addUserEducation = function (req, res) {
        var _userId = req["user"]._id;
        var _user = req.body;
        user_dao_1.default["addUserEducation"](_userId, _user)
            .then(function (user) { return res.status(200).end(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.editUserEducation = function (req, res) {
        var _userId = req["user"]._id;
        var _idEducation = req.params.id_education;
        var _user = req.body;
        user_dao_1.default["editUserEducation"](_userId, _idEducation, _user)
            .then(function (user) { return res.status(200).end(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map