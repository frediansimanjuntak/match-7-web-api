import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userSchema from "../model/user-model";
import {email} from '../../../global/func/email';

userSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        User.find(_query)
            .exec((err, users) => {
              err ? reject(err)
                  : resolve(users);
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
              err ? reject(err)
                  : resolve(user);
            });
    });
});

userSchema.static("createUser", (user:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(user)) {
        return reject(new TypeError("User is not a valid object."));
      }
        let randomCode = Math.random().toString(36).substr(2, 6);
        let _user = new User(user);
        _user.verification.code = randomCode;
        _user.verification.verified.type = "email";
        _user.save((err, saved) => {
            if (err) reject(err);
            else if (saved) {
                email.signUp(saved);
                resolve(saved);
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
                
              err ? reject(err)
                  : resolve(user);
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
              err ? reject(err)
                  : resolve();
            });
    });
});

let User = mongoose.model("User", userSchema);
  
export default User;
