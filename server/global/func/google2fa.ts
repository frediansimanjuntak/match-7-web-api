'use strict';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

export class google2fa{
	static createToken(){
        return new Promise((resolve:Function, reject:Function) => {
            var secret = speakeasy.generateSecret({length: 20});            
            QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
                // console.log(secret.base32);
                // console.log(image_data); // A data URI for the QR code image
                var data = {
                    'secret':secret.base32,
                    'barcode':image_data
                }
                resolve(data);
            });
        })
        
    }
}