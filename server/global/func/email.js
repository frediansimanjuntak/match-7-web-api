'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var email_1 = require("../service/email");
var email = /** @class */ (function () {
    function email() {
    }
    email.signUp = function (data) {
        var body = data;
        return new Promise(function (resolve, reject) {
            var emailSubject = 'Sign Up';
            var text = '';
            var content = '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"><title></title></head><body>Hi ' + body.fullname + ',<p style="align:justify;">Welcome to Match7!</p><p style="align:justify;">Thank you for joining us. This is Your Account, please Login with this account and Activated your account.</p><table><tbody><tr><td>Username</td><td>:</td><td><b>' + body.username + '</b></td></tr><tr><td>Activation Code</td><td>:</td><td><b>' + body.verifyCode + '</b></td></tr></tbody></table><p><table cellspacing="0" cellpadding="0"><tr><td align="center" width="300" height="40" bgcolor="#d62828" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;"> <a href="' + body.link + '" style="font-size:16px; font-weight: bold; font-family:sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"> <span style="color: #ffffff;"> Match7 Login </span> </a></td></tr></table></p><p style="align:justify;">In the meantime if you have any queries, do feel free to contact us at ' + body.from + '.</p> <br> <br>Thanks, <br>QS Team</body></html>';
            email_1.EmailService.sendEmail(body.emailTo, body.emailToName, emailSubject, text, content).then(function (res) {
                resolve(res);
            });
        });
    };
    return email;
}());
exports.email = email;
//# sourceMappingURL=email.js.map