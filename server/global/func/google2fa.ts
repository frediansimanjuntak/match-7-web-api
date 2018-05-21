'use strict';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

export class google2fa{
	static createToken(){
        var secret = speakeasy.generateSecret({length: 20});
        console.log(secret.base32);
        
        QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
            return {secret:secret.base32, barcode:image_data}
            // console.log(image_data); // A data URI for the QR code image
        });
    }

    static createBarcode(data){

	}
}