"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interest_controller_1 = require("../controller/interest-controller");
var InterestRoutes = /** @class */ (function () {
    function InterestRoutes() {
    }
    InterestRoutes.init = function (router) {
        router
            .route("/api/interest")
            .get(interest_controller_1.InterestController.getAll)
            .post(interest_controller_1.InterestController.createInterest);
        router
            .route("/api/interest/:id")
            .put(interest_controller_1.InterestController.updateInterest)
            .delete(interest_controller_1.InterestController.deleteInterest);
    };
    return InterestRoutes;
}());
exports.InterestRoutes = InterestRoutes;
//# sourceMappingURL=interest-route.js.map