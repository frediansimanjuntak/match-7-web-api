// / <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production")
    require("newrelic");
var express = require("express");
var os = require("os");
var http = require("http");
// import * as http2 from "spdy";
var fs = require("fs");
var routes_conf_1 = require("./config/routes.conf");
var db_conf_1 = require("./config/db.conf");
var index_1 = require("./routes/index");
var app = express();
var PORT = process.env.PORT || 6666;
routes_conf_1.RoutesConfig.init(app);
db_conf_1.DBConfig.init();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
index_1.Routes.init(app, express.Router());
var opts = {
    key: fs.readFileSync(__dirname + "/cert/server.key"),
    cert: fs.readFileSync(__dirname + "/cert/server.crt")
};
var server = http.createServer(app);
server.listen(PORT, function () {
    console.log("up and running @: " + os.hostname() + " on port: " + PORT);
    console.log("enviroment: " + process.env.NODE_ENV);
});
//# sourceMappingURL=server.js.map