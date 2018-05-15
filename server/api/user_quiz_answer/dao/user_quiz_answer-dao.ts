import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userQuizAnswerSchema from "../model/user_quiz_answer-model";

userQuizAnswerSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Answer.find(_query)
            .exec((err, answers) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: answers});
            });
    });
});

userQuizAnswerSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("Todo is not a valid object."));
        }

        Answer.findById(id)
            .exec((err, answer) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: answer});
            });
    });
});

userQuizAnswerSchema.static("createUserQuizAnswer", (answer:Object, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(answer)) {
        return reject(new TypeError("Todo is not a valid object."));
      }      
      let body:any = answer;
      body['user_id'] = userId;
      var _answer = new Answer(body);

      _answer.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});


userQuizAnswerSchema.static("updateUserQuizAnswer", (id:string, userId: string, answer:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(answer)) {
            return reject(new TypeError("quiz is not a valid object."));
        }        

        Answer.findOneAndUpdate({'_id':id, 'user_id':userId}, answer)
            .exec((err, answer) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: answer});
            });
    });
});

userQuizAnswerSchema.static("deleteUserQuizAnswer", (id:string, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Answer.findByIdAndRemove({'_id':id, 'user_id':userId})
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let Answer = mongoose.model("Answer", userQuizAnswerSchema);
  
export default Answer;
