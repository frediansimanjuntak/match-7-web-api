// / <reference path="../typings/index.d.ts" />

"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "production")
    require("newrelic");


import * as express from "express";
import * as os from "os";
import * as https from 'https';
import * as http from 'http';
// import * as http2 from "spdy";
import * as fs from "fs";
import {RoutesConfig} from "./config/routes.conf";
import {DBConfig} from "./config/db.conf";
import {Routes} from "./routes/index";

const app = express();

var PORT = process.env.PORT || 7777;

RoutesConfig.init(app);
DBConfig.init();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type")
//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
//   next()
// })
process.env.PWD = process.cwd()
app.use(express.static(process.env.PWD + '/temp_img'));


Routes.init(app, express.Router());

const opts = {
  key: fs.readFileSync(__dirname + "/cert/server.key"),
  cert: fs.readFileSync(__dirname + "/cert/server.crt")
}


var server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
  console.log(`enviroment: ${process.env.NODE_ENV}`);
});
