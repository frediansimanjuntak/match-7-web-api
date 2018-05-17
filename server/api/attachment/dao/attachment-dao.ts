import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import attachmentSchema from "../model/attachment-model";
import User from '../../user/dao/user-dao';
import * as fs from "fs";

attachmentSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Attachment.find(_query)
            .populate('user')
            .exec((err, attachments) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: attachments});
            });
    });
});

attachmentSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Attachment.findById(id)
            .populate('user')
            .exec((err, attachment) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: attachment});
            });
    });
});

attachmentSchema.static("createAttachment", (body:Object, attachments:Object, userId:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(body)) {
        return reject(new TypeError("Attachment is not a valid object."));
      }
      let files = [].concat(attachments);
        var newArr = _.map(files, function(element) { 
            return _.extend(element, {user: userId});
        });
        Attachment.insertMany(newArr, (err, saved) => {
            err ? reject({success:false, message: err.message})
                : resolve({success:true, data: saved});
        })
    });
});

attachmentSchema.static("updateAttachment", (id:string, attachment:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(attachment)) {
            return reject(new TypeError("Attachment is not a valid object."));
        }        

        Attachment.findByIdAndUpdate(id, attachment)
            .exec((err, attachment) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: attachment});
            });
    });
});

attachmentSchema.static("deleteAttachment", (id:string, userId:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        Attachment.findByOne({'_id':id, 'user':userId})
            .exec((err, data) => {
                if (err) {
                    reject({success:false, message: err.message})
                }
                else {
                    fs.unlink(data.path, (error) => {            
                        if (error) {
                            reject({success:false, message: error})
                        }
                        else {
                            Attachment.findByOneAndRemove({'_id':id, 'user':userId})
                                .exec((err, deleted) => {
                                err ? reject({success:false, message: err.message})
                                    : resolve({success:true, data: {message:"Deleted success"}});
                                });
                        }
                    });
                }
            });
    });
});

let Attachment = mongoose.model("Attachment", attachmentSchema);
  
export default Attachment;
