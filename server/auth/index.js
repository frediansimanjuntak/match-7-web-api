'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("../config/environment/index");
var user_dao_1 = require("../api/user/dao/user-dao");
var passport = require('passport');
// console.log(User);
// Passport Configuration
require('./local/passport').setup(user_dao_1.default, index_1.default);
var router = express.Router();
router.use('/local', require('./local').default);
exports.default = router;
//# sourceMappingURL=index.js.map