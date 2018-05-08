'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../config/environment/index");
var jwt = require("jsonwebtoken");
// import * as expressJwt from 'express-jwt';
var expressJwt = require('express-jwt');
var compose = require("composable-middleware");
var user_dao_1 = require("../api/user/dao/user-dao");
var validateJwt = expressJwt({
    secret: index_1.default.secrets.session
});
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function (req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = "Bearer " + req.query.access_token;
        }
        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        if (req.query && typeof req.headers.authorization === 'undefined') {
            req.headers.authorization = "Bearer " + req.cookies.token;
        }
        validateJwt(req, res, function (err, validate) {
            if (err) {
                if (err.message == "jwt expired") {
                    return res.status(err.status).send({ message: "Your session has been expired", code: 411 });
                }
                if (err.message == "jwt malformed") {
                    return res.status(err.status).send({ message: "You must be logged in to do this", code: 412 });
                }
                else {
                    return res.status(err.status).send({ message: err.message });
                }
            }
            else {
                validateJwt(req, res, next);
            }
        });
    })
        // Attach user to request
        .use(function (req, res, next) {
        user_dao_1.default.findById(req.user._id).exec()
            .then(function (user) {
            if (!user) {
                return res.status(401).end();
            }
            req.user = user;
            next();
        })
            .catch(function (err) { return next(err); });
    });
}
exports.isAuthenticated = isAuthenticated;
/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
        if (index_1.default.userRoles.indexOf(req.user.role) >= index_1.default.userRoles.indexOf(roleRequired)) {
            return next();
        }
        else {
            return res.status(403).send('Forbidden');
        }
    });
}
exports.hasRole = hasRole;
/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
    // let session
    // if(remember == "true"){
    //   session = config.secrets.session, {expiresIn: 60 * 60 * 60 * 60 };
    // }
    // if(remember == "false"){
    //   session = config.secrets.session, {expiresIn: 30};
    // }
    return jwt.sign({ _id: id }, index_1.default.secrets.session, { expiresIn: 60 * 60 });
}
exports.signToken = signToken;
// export function signToken(id, role, default_development) {
//   return jwt.sign({ _id: id, role, default_development });
// }
/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
    if (!req.user) {
        return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    var token = signToken(req.user._id);
    res.cookie('token', token);
    res.redirect('/');
}
exports.setTokenCookie = setTokenCookie;
//# sourceMappingURL=auth-service.js.map