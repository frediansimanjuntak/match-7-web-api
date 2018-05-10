"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interest_controller_1 = require("../controller/interest-controller");
var TodoRoutes = /** @class */ (function () {
    function TodoRoutes() {
    }
    TodoRoutes.init = function (router) {
        router
            .route("/api/interest")
            .get(interest_controller_1.InterestController.getAll)
            .post(interest_controller_1.InterestController.createInterest);
        router
            .route("/api/interest/:id")
            .delete(interest_controller_1.InterestController.deleteInterest);
    };
    return TodoRoutes;
}());
exports.TodoRoutes = TodoRoutes;
//# sourceMappingURL=interest-route.js.map