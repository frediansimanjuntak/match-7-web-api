import * as express from "express";
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
var tmp = require('tmp');
var fs = require('fs');
const fse = require('fs-extra');
var CronJob = require('cron').CronJob;
var path = require('path');

export class tempFile {
  static autoRemoveAllFile():void{
    return new Promise((resolve:Function, reject:Function) => {
      new CronJob('00 30 * * * *', function() {
        /* runs once at the specified date. */    
        try {
            fse.emptyDir('./temp_img');
            console.log('successfully deleted');
          } catch (err) {
            console.log(err);
            // handle the error
          }
        tmp.setGracefulCleanup();
        }, function () {
          /* This function is executed when the job stops */
          console.log('success!')
        },
        true,
        'Asia/Jakarta'
      );
    });
  }
}