import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import questionSchema from "../model/question-model";
import Quiz from '../../quiz/dao/quiz-dao'

questionSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Question.find(_query)
            .populate('quiz')
            .exec((err, questions) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: questions});
            });
    });
});

questionSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Question.findById(id)
            .populate('quiz')
            .exec((err, question) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: question});
            });
    });
});

questionSchema.static("createQuestion", (question:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(question)) {
        return reject(new TypeError("Question is not a valid object."));
      }

      var _question = new Question(question);

      _question.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

questionSchema.static("updateQuestion", (id:string, question:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(question)) {
            return reject(new TypeError("Question is not a valid object."));
        }        

        Question.findByIdAndUpdate(id, question)
            .exec((err, question) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: question});
            });
    });
});

questionSchema.static("deleteQuestion", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Question.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let Question = mongoose.model("Question", questionSchema);
  
export default Question;
