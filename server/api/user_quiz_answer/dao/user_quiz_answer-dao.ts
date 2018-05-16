import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userQuizAnswerSchema from "../model/user_quiz_answer-model";
import Quiz from '../../quiz/dao/quiz-dao';
import Question from '../../question/dao/question-dao';
import User from '../../user/dao/user-dao';

userQuizAnswerSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        UserQuizAnswer.find(_query)
            .populate('quiz question user')
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

        UserQuizAnswer.findById(id)            
            .populate('quiz question user')
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
      body['user'] = userId;
      var _answer = new UserQuizAnswer(body);

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

        UserQuizAnswer.findOneAndUpdate({'_id':id, 'user':userId}, answer)
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

        UserQuizAnswer.findByIdAndRemove({'_id':id, 'user':userId})
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let UserQuizAnswer = mongoose.model("UserQuizAnswer", userQuizAnswerSchema);
  
export default UserQuizAnswer;
