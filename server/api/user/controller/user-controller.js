"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_dao_1 = require("../dao/user-dao");
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
    UserController.activateUser = function (req, res) {
        var _user = req.body;
        user_dao_1.default["activateUser"](_user)
            .then(function (user) { return res.status(200).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.createUser = function (req, res) {
        var _user = req.body;
        user_dao_1.default["createUser"](_user)
            .then(function (user) { return res.status(201).json(user); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    UserController.deleteUser = function (req, res) {
        var _id = req.params.id;
        user_dao_1.default["deleteUser"](_id)
            .then(function () { return res.status(200).end(); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user-controller.js.map