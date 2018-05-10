import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import userQuizAnswerSchema from "../model/user_quiz_answer-model";

userQuizAnswerSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Answer.find(_query)
            .exec((err, answers) => {
              err ? reject(err)
                  : resolve(answers);
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
              err ? reject(err)
                  : resolve(answer);
            });
    });
});

userQuizAnswerSchema.static("createUserQuizAnswer", (answer:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(answer)) {
        return reject(new TypeError("Todo is not a valid object."));
      }

      var _answer = new Answer(answer);

      _answer.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
});

userQuizAnswerSchema.static("deleteUserQuizAnswer", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Answer.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
            });
    });
});

let Answer = mongoose.model("Answer", userQuizAnswerSchema);
  
export default Answer;
