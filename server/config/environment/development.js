"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/*eslint no-process-env:0*/
// Development specific configuration
// ==================================
exports.default = {
    // MongoDB connection options
    mongo: {
        uri: "mongodb://localhost/interest-matching-app",
        options: {
            promiseLibrary: Promise
        }
    },
    mandrill: {
        apiKey: '6J3fRtJmpBJKXqHnSRPyhg',
        fromEmail: 'us@quarkspark.com',
        username: 'us.qs',
        password: '5A3TV7VKpLOZ7vIZCRb1Qg',
        secret: '5A3TV7VKpLOZ7vIZCRb1Qg',
        address: 'us@quarkspark.com'
    },
    // Seed database on startup
    seedDB: false
};
//# sourceMappingURL=development.js.map