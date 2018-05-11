'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var index_1 = require("../../config/environment/index");
var nodemailer = require("nodemailer");
var mandrillTransport = require("nodemailer-mandrill-transport");
var smtpTransport = nodemailer.createTransport(mandrillTransport({
    auth: {
        apiKey: index_1.default.mandrill.apiKey
    }
}));
// const mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.sendEmail = function (emailTo, emailToName, emailSubject, emailText, emailHtml) {
        return new Promise(function (resolve, reject) {
            var mailOptions = {
                from: index_1.default.mandrill.fromEmail,
                to: emailTo,
                subject: emailSubject,
                html: emailHtml
            };
            // Sending email.
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    throw new Error("Error in sending email");
                }
                console.log("Message sent: " + JSON.stringify(response));
            });
        });
    };
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.js.map