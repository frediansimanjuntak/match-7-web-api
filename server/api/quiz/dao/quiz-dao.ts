import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import quizSchema from "../model/quiz-model";

quizSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Quiz.find(_query)
            .exec((err, quizs) => {
              err ? reject(err)
                  : resolve(quizs);
            });
    });
});

quizSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("Quiz is not a valid object."));
        }

        Quiz.findById(id)
            .exec((err, quiz) => {
              err ? reject(err)
                  : resolve(quiz);
            });
    });
});

quizSchema.static("createQuiz", (quiz:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(quiz)) {
        return reject(new TypeError("Quiz is not a valid object."));
      }

      var _quiz = new Quiz(quiz);

      _quiz.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
});

quizSchema.static("deleteQuiz", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Quiz.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
            });
    });
});

let Quiz = mongoose.model("Quiz", quizSchema);
  
export default Quiz;
