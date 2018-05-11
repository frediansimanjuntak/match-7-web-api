"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controller/user-controller");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.init = function (router) {
        router
            .route("/api/users")
            .get(user_controller_1.UserController.getAll)
            .post(user_controller_1.UserController.createUser);
        router
            .route("/api/users/:id")
            .delete(user_controller_1.UserController.deleteUser);
        router
            .route("/api/users/activation")
            .post(user_controller_1.UserController.activateUser);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user-route.js.map