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
            .post(user_controller_1.UserController.createTodo);
        router
            .route("/api/users/:id")
            .delete(user_controller_1.UserController.deleteTodo);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user-route.js.map