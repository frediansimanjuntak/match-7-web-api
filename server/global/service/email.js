'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var mandrill = require("mandrill-api/mandrill");
var index_1 = require("../../config/environment/index");
var mandrill_client = new mandrill.Mandrill(index_1.default.mandrill.apiKey);
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.sendEmail = function (emailTo, emailToName, emailSubject, emailText, emailHtml) {
        return new Promise(function (resolve, reject) {
            var message = {
                "html": emailHtml,
                "text": emailText,
                "subject": emailSubject,
                "from_email": index_1.default.mandrill.fromEmail,
                "from_name": index_1.default.mandrill.username,
                "to": [{
                        "email": emailTo,
                        "name": emailToName,
                        "type": "to"
                    }],
                "headers": {
                    "Reply-To": index_1.default.mandrill.fromEmail
                },
                "important": false
            };
            var async = false;
            var ip_pool = "Main Pool";
            var send_at = "example send_at";
            mandrill_client.messages.send({ "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at }, function (result) {
                console.log(result);
                /*
                [{
                        "email": "recipient.email@example.com",
                        "status": "sent",
                        "reject_reason": "hard-bounce",
                        "_id": "abc123abc123abc123abc123abc123"
                    }]
                */
            }, function (e) {
                // Mandrill returns the error as an object with name and message keys
                console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            });
        });
    };
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.js.map