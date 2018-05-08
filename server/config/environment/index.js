"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*eslint no-process-env:0*/
var path = require("path");
var _ = require("lodash");
var shared_1 = require("./shared");
/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
}*/
// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,
    // Root path of server
    root: path.normalize(__dirname + "/../../.."),
    // Browser-sync port
    browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
    // Server port
    port: process.env.PORT || 9000,
    // Server IP
    ip: process.env.IP || "0.0.0.0",
    // Should we populate the DB with sample data?
    seedDB: true,
    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: "interest-matching-secret"
    },
    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};
// Export the config object based on the NODE_ENV
// ==============================================
exports.default = _.merge(all, shared_1.default, require("./" + process.env.NODE_ENV).default || {});
//# sourceMappingURL=index.js.map