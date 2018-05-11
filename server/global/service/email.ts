'use strict';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as mandrill from 'mandrill-api/mandrill';
import config from '../../config/environment/index';
import * as nodemailer from 'nodemailer';
import * as mandrillTransport  from 'nodemailer-mandrill-transport';

var smtpTransport = nodemailer.createTransport(mandrillTransport({
    auth: {
      apiKey : config.mandrill.apiKey
    }
}));

// const mandrill_client = new mandrill.Mandrill(config.mandrill.apiKey);

export class EmailService {
    static sendEmail(emailTo:string, emailToName:string, emailSubject:string, emailText:string, emailHtml:string) {
        return new Promise((resolve:Function, reject:Function) => {
            let mailOptions={
                from : config.mandrill.fromEmail,
                to : emailTo,
                subject : emailSubject,
                html : emailHtml
             };
             
             // Sending email.
             smtpTransport.sendMail(mailOptions, function(error, response){
               if(error) {
                  throw new Error("Error in sending email");
               }
               console.log("Message sent: " + JSON.stringify(response));
             });
        });
    }
}