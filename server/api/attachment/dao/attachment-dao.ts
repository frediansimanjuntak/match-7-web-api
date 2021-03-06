import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import attachmentSchema from "../model/attachment-model";
import User from '../../user/dao/user-dao';
var tmp = require('tmp');
var fs = require('fs');
const fse = require('fs-extra');
var path = require('path');

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

attachmentSchema.static("getLink", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {        
    Attachment.findById(id)
        .exec((err, attachment) => {
            if (err) reject({success:false, message: err.message});
            else if (attachment) {
                let fileName = attachment.filename;
                let ext = path.extname(fileName);
                tmp.file({postfix: ext, dir: path.join('temp_img')}, function (err, path, fd, cleanupCallback) {
                    if (err) throw err;
                    fs.readFile('./uploads/'+fileName, function(err, data) {                            
                        fs.writeFileSync(path, data);
                    })
                    resolve(path);
                });
            }
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

attachmentSchema.static("createAttachment", (attachments:Object, userId:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      let files = [].concat(attachments);
        var newArr = _.map(files, function(element) { 
            return _.extend(element, {user: userId});
        });
        Attachment.insertMany(newArr, (err, saved) => {
            if (err) {
                reject({success:false, message: err.message})
            }
            else if (saved) {
                var attArr = _.map(saved, (element, index) => {
                    let data = {
                        attachment: element._id
                    }
                    return data;
                })           
                let updatePushObj = {$push: {}};        
                updatePushObj.$push['photos'] = ({$each: attArr});
                User.updateUser(userId, updatePushObj);
                resolve({success:true, data: saved});
            }
        })
    });
});

attachmentSchema.static("changePhotoUser", (attachments:Object, userId:string, id_photo:string, id_attachment:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        User.deletePhoto(userId, id_photo, id_attachment);
      let files = [].concat(attachments);
        var newArr = _.map(files, function(element) { 
            return _.extend(element, {user: userId});
        });
        Attachment.insertMany(newArr, (err, saved) => {
            if (err) {
                reject({success:false, message: err.message})
            }
            else if (saved) {
                var attArr = _.map(saved, (element, index) => {
                    let data = {
                        attachment: element._id
                    }
                    return data;
                })           
                let updatePushObj = {$push: {}};        
                updatePushObj.$push['photos'] = ({$each: attArr});
                User.updateUser(userId, updatePushObj);
                resolve({success:true, data: saved});
            }
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
        Attachment.findOne({'_id':id, 'user':userId})
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
                            Attachment.findOneAndRemove({'_id':id, 'user':userId})
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

attachmentSchema.static("deleteFile", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        try {
            fse.emptyDir('./temp_img');
            resolve({success:true, data: {message:"Deleted success"}});
        } 
        catch (err) {
            reject({success:false, message: err.message})
            // handle the error
        }
    });
});

let Attachment = mongoose.model("Attachment", attachmentSchema);
  
export default Attachment;
