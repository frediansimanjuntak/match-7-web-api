'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require('passport');
var auth_service_1 = require("../auth-service");
var router = express.Router();
router.post('/', function (req, res, next) {
    passport.authenticate('local.user', function (err, user, info) {
        var error = err || info;
        var remember;
        if (error) {
            if (error.message == "Missing credentials") {
                return res.status(401).json({ message: "Incomplete Data Username/Password to logged in", code: 413 });
            }
            else {
                return res.status(401).json(error);
            }
        }
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong, please try again.', code: 404 });
        }
        if (user._id && user.email) {
            if (!req.body.remember) {
                remember = "false";
            }
            if (req.body.remember) {
                remember = "true";
            }
            var token = auth_service_1.signToken(user._id);
            res.json({ success: true, token: token });
        }
        else {
            res.json({ message: 'please login first.' });
        }
    })(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map