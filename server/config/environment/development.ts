"use strict";
import * as Promise from "bluebird";
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
export default {

  // MongoDB connection options
  mongo: {
    uri: "mongodb://localhost/interest-matching-app",
    options: {
      promiseLibrary: Promise
    }
  },
  mandrill: {
    apiKey: '6J3fRtJmpBJKXqHnSRPyhg',
    fromEmail: 'no-reply@match7.co',
    username: 'match7',
    password: '5A3TV7VKpLOZ7vIZCRb1Qg',
    secret: '5A3TV7VKpLOZ7vIZCRb1Qg',
    address: 'no-reply@match7.co'
  },

  // Seed database on startup
  seedDB: false

};
