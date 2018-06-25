import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userSchema from "../model/user-model";
import {email} from '../../../global/func/email';
import {api_qs} from '../../../global/func/api_qs';
import {google2fa} from '../../../global/func/google2fa';
import * as request from 'request'; 
import * as fetch from "node-fetch";
import * as FormData from "form-data";

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

userSchema.static("getTest", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {'message':"get success"};

        resolve (_query);
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

userSchema.static("me", (user_id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        User.findOne({'_id':user_id})
            .exec((err, user) => {
                err ? reject({success:false, message: err.message})
                    : resolve({success:true, data: user});
            });       
    });
});


userSchema.static("create", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _user = new User(user);
        _user.save((err, saved) => {
            console.log(saved);
            err ? reject({success:false, message: err.message})
                : resolve({success:true, data: saved});
        });      
    });
});

userSchema.static("register", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        api_qs.register(user).then((result) => {
            console.log(result);
            if(result.success == 1) {               
                User.create(user).then((res) => {
                    if (res.success == true) {
                        resolve({success:true, message: "regitration success"});
                    }
                })  
                .catch((err) => {reject({success:false, message: "Please check your input"})}); 
            }
            else if(result.message) {
                reject({success:false, message: result.message})
            }
            else {
                reject({success:false, message: "Please check your input"})
            }
        })
        .catch((err) => {reject({success:false, message: "System Error"})});    
    });
});

userSchema.static("loginRegister", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        User.findOne({
            user_id:user['user_id']
        })
        .exec((err, result) => {
            if (err) {
                reject({success:false, message: err.message})
            }
            else if (result) {
                resolve({success:true, data: result});
            }
            else {  
                User.create(user).then((res) => {
                    if (res.success == true) {
                        resolve({success:true, data: res});
                    }
                }) 
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

userSchema.static("updateAuthUser", (id:string, user:Object):Promise<any> => {
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

userSchema.static("addUserEducation", (id:string, user:any):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        let updatePushObj = {$push: {}};        
        updatePushObj.$push['education'] = ({$each: user});
        User.me(id).then((me_data) => {
            if(me_data.success == true) {
                if (me_data.data.education.length > 0) {
                    let query = { $set: { education: [] }}
                    User.updateUser(id, query);
                }               
                User.updateUser(id, updatePushObj)
                .then((result) => {
                    resolve({success:true, data: result});
                })
                .catch(err => {reject({success:false, message: err.message})})
            }
        })
        .catch(err => {reject({success:false, message: err.message})})
    });
});

userSchema.static("addUserOccupation", (id:string, user:any):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        let updatePushObj = {$push: {}};        
        updatePushObj.$push['occupation'] = ({$each: user});
        User.me(id).then((me_data) => {
            if(me_data.success == true) {
                if (me_data.data.occupation.length > 0) {
                    let query = { $set: { occupation: [] }}
                    User.updateUser(id, query);
                }               
                User.updateUser(id, updatePushObj)
                .then((result) => {
                    resolve({success:true, data: result});
                })
                .catch(err => {reject({success:false, message: err.message})})
            }
        })
        .catch(err => {reject({success:false, message: err.message})})
    });
});

userSchema.static("addUserInterest", (id:string, user:any):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        let updatePushObj = {$push: {}};        
        updatePushObj.$push['interest'] = ({$each: user});
        User.me(id).then((me_data) => {
            if(me_data.success == true) {
                if (me_data.data.interest.length > 0) {
                    let query = { $set: { interest: [] }}
                    User.updateUser(id, query);
                }               
                User.updateUser(id, updatePushObj)
                .then((result) => {
                    resolve({success:true, data: result});
                })
                .catch(err => {reject({success:false, message: err.message})})
            }
        })
        .catch(err => {reject({success:false, message: err.message})})
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

userSchema.static("changePassword", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOne({'_id':id})
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

userSchema.static("changeDisabled", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOne({'_id':id})
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

userSchema.static("blockedUsers", (id:string, user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        if (!_.isObject(user)) {
            return reject(new TypeError("User is not a valid object."));
        }                
        let body:any = user;
        User.findOne({"_id": id, "blocked_users": {$in: [body.id_block]}})
        .exec((err, user) => { 
            if(err){
                reject({message: err.message});
            }
            if(user){
                if(user.length == 0){
                    User.findByIdAndUpdate(id, {
                            $push: {
                                "blocked_users": body.id_block 
                            }
                        })
                        .exec((err, update) => {
                            err ? reject({success:false, message: err.message})
                                : resolve({success:true, data: update});
                        });
                }
                else if(user.length >= 1){
                    resolve({message: "This User Already Block"})
                }
            }   
        });
    });
});

userSchema.static("checkSessionAPIQS", (app_key: string, ses_key: string, usr_email: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {    
        const form = new FormData();
        form.append('application_key', app_key);
        form.append('session_key', ses_key);
        form.append('user_email', usr_email);

        const url = 'https://api.quarkspark.com/session/check';
        fetch(url, {
        method: 'POST', 
        body: form
        }).then(res => res.json())
        .catch(error => reject(error))
        .then(response => resolve(response));
    });
});

let User = mongoose.model("User", userSchema);
export default User;
