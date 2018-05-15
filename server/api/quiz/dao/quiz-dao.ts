import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import quizSchema from "../model/quiz-model";

quizSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Quiz.find(_query)
            .exec((err, quizzes) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: quizzes});
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
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: quiz});
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
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

quizSchema.static("updateQuiz", (id:string, quiz:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(quiz)) {
            return reject(new TypeError("quiz is not a valid object."));
        }        

        Quiz.findByIdAndUpdate(id, quiz)
            .exec((err, quiz) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: quiz});
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
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let Quiz = mongoose.model("Quiz", quizSchema);
  
export default Quiz;
