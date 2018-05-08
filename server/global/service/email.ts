'use strict';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as mandrill from 'mandrill-api/mandrill';
import config from '../../config/environment/index';

const mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);

export class EmailService {
    static sendEmail(emailTo:string, emailToName:string, emailSubject:string, emailText:string, emailHtml:string) {
        return new Promise((resolve:Function, reject:Function) => {
            var message = {
                "html": emailHtml,
                "text": emailText,
                "subject": emailSubject,
                "from_email": config.mandrill.fromEmail,
                "from_name": config.mandrill.username,
                "to": [{
                        "email": emailTo,
                        "name": emailToName,
                        "type": "to"
                    }],
                "headers": {
                    "Reply-To": config.mandrill.fromEmail
                },
                "important": false
            };
            var async = false;
            var ip_pool = "Main Pool";
            var send_at = "example send_at";
            mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
                console.log(result);
                /*
                [{
                        "email": "recipient.email@example.com",
                        "status": "sent",
                        "reject_reason": "hard-bounce",
                        "_id": "abc123abc123abc123abc123abc123"
                    }]
                */
            }, function(e) {
                // Mandrill returns the error as an object with name and message keys
                console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            });
        });
    }
}