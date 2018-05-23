import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userSchema from "../model/user-model";
import {email} from '../../../global/func/email';
import {google2fa} from '../../../global/func/google2fa';

userSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        User.find(_query)
            .exec((err, users) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: users});
            });
    });
});

userSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("User is not a valid object."));
        }

        User.findById(id)
            .exec((err, user) => {
                err ? reject({success:false, message: err.message})
                    : resolve({success:true, data: user});
            });
    });
});

userSchema.static("me", (userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!userId) {
          return reject(new TypeError("User is not a valid."));
        }

        User.findById(userId)
            .exec((err, user) => {
                err ? reject({success:false, message: err.message})
                    : resolve({success:true, data: user});
            });
    });
});

userSchema.static("register", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(user)) {
        return reject(new TypeError("User is not a valid object."));
      }
        let randomCode = Math.random().toString(36).substr(2, 6);
        let _user = new User(user);
        _user.verification.code = randomCode;
        _user.verification.verified.type = "email";
        _user.save((err, saved) => {
            if (err) reject({success:false, message: err.message});
            else if (saved) {
                email.signUp(saved);
                resolve({success:true, data: saved});
            }
        });
    });
});

userSchema.static("activateUser", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
          }
        User.findOneAndUpdate({
            'email':user['email'],
            'verification.code':user['code'],
            'verification.verified.type':user['type']
        },{$set:{
            'verification.verified.status':true
        }})
            .exec((err, user) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("deleteUser", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        User.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

userSchema.static("updateUser", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        

        User.findByIdAndUpdate(id, user)
            .exec((err, user) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("addUserEducation", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        let body:any = user;
        let updatePushObj = {$push: {}};
        console.log()
        
        updatePushObj.$push['education'] = ({'type': body.type, 'school_name': body.school_name});

        User.findByIdAndUpdate(id, updatePushObj)
            .exec((err, user) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("editUserEducation", (id:string, id_education:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        
        let ObjectID = mongoose.Types.ObjectId;  
        let body:any = user;
        
        User.update({'_id':id, 'education':{$elemMatch: {'_id': new ObjectID(id_education)}}}, {
            $set: {
                'education.$' : {
                    'type':body.type,
                    'school_name':body.school_name  
                }
            }
        })
            .exec((err, user) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("enableUserGoogle2fa", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {     
        console.log(id);
        let google2fa_data = google2fa.createToken().then(google2fa_data => {
            
        User.findOneAndUpdate({
            '_id':id},{$set:{
            'google2fa.disabled':true,
            'google2fa.secret':google2fa_data['secret'],
            'google2fa.barcode':google2fa_data['barcode'],
        }})
            .exec((err, user) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
        });
    });
});

userSchema.static("disableUserGoogle2fa", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {        
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }
        User.findOneAndUpdate({
            '_id':id},{$set:{
            'google2fa.disabled':false
        }})
            .exec((err, user) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("changeLocation", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOneAndUpdate({
            '_id':id},{$set:{
            'last_known_lat':body.lat,
            'last_known_lng':body.lng
        }})
            .exec((err, user) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: user});
            });
    });
});

userSchema.static("changePassword", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOne({
            $or: [
                {'username': body.username.toLowerCase()}, 
                {'email': body.username.toLowerCase()}
            ]
        })
        .exec((err, user) => {    
            if (err) {
                reject({success:false, message: err.message});
            }       
            else {
                user.password = body.password;
                user.save((err, saved) => {
                    if (err) reject({success:false, message: err.message});
                    else if (saved) {
                        resolve({success:true, data: saved});
                    }
                }) 
            }     
        });
    });
});

userSchema.static("changeDisabled", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOne({
            $or: [
                    {'username': body.username.toLowerCase()}, 
                    {'email': body.username.toLowerCase()}
                ]
        })
        .exec((err, user) => { 
            user.disabled = user.disabled == false ? true : false;
            user.save((err, saved) => {
                if (err) reject({success:false, message: err.message});
                else if (saved) {
                    resolve({success:true, data: saved});
                }
            })    
        });
    });
});

let User = mongoose.model("User", userSchema);
export default User;
