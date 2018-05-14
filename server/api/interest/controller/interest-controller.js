"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interest_dao_1 = require("../dao/interest-dao");
var InterestController = /** @class */ (function () {
    function InterestController() {
    }
    InterestController.getAll = function (req, res) {
        interest_dao_1.default["getAll"]()
            .then(function (interests) { return res.status(200).json(interests); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    InterestController.getById = function (req, res) {
        interest_dao_1.default["getById"](req.params.id)
            .then(function (interest) { return res.status(200).json(interest); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    InterestController.createInterest = function (req, res) {
        var _interest = req.body;
        interest_dao_1.default["createInterest"](_interest)
            .then(function (interest) { return res.status(201).json(interest); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    InterestController.updateInterest = function (req, res) {
        var _id = req.params.id;
        var _interest = req.body;
        interest_dao_1.default["updateInterest"](_id, _interest)
            .then(function (interest) { return res.status(200).json(interest); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    InterestController.deleteInterest = function (req, res) {
        var _id = req.params.id;
        interest_dao_1.default["deleteInterest"](_id)
            .then(function (interest) { return res.status(200).json(interest); })
            .catch(function (error) { return res.status(400).json(error); });
    };
    return InterestController;
}());
exports.InterestController = InterestController;
//# sourceMappingURL=interest-controller.js.map