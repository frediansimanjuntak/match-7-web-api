"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controller/user-controller");
var auth = require("../../../auth/auth-service");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.init = function (router) {
        router
            .route("/api/register")
            .post(user_controller_1.UserController.register);
        router
            .route("/api/users")
            .get(user_controller_1.UserController.getAll)
            .put(auth.isAuthenticated(), user_controller_1.UserController.updateUser);
        router
            .route("/api/users/:id")
            .delete(user_controller_1.UserController.deleteUser);
        router
            .route("/api/users/activation")
            .post(user_controller_1.UserController.activateUser);
        router
            .route("/api/me")
            .get(auth.isAuthenticated(), user_controller_1.UserController.me);
        router
            .route("/api/user/education/add")
            .post(auth.isAuthenticated(), user_controller_1.UserController.addUserEducation);
        router
            .route("/api/user/education/edit/:id_education")
            .post(auth.isAuthenticated(), user_controller_1.UserController.editUserEducation);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user-route.js.map