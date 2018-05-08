"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_route_1 = require("../api/todo/route/todo-route");
var user_route_1 = require("../api/user/route/user-route");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.init = function (app, router) {
        todo_route_1.TodoRoutes.init(router);
        user_route_1.UserRoutes.init(router);
        app.use('/auth', require('../auth').default);
        app.use("/", router);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=index.js.map