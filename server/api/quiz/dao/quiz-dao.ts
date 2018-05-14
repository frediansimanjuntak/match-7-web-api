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

quizSchema.static("addQuestion", (id:string, question:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(question)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        let body:any = question;
        let updatePushObj = {$push: {}};        
        updatePushObj.$push['question'] = ({'name': body.name, 'type': body.type, 'select_options': body.select_options});

        Quiz.findByIdAndUpdate(id, updatePushObj)
            .exec((err, quiz) => {
                if (err) {
                    reject({success:false, message: err.message});
                }
                else {
                    Quiz.findById(id)
                        .exec((err, quiz) => {
                        err ? reject({success:false, message: err.message})
                            : resolve({success:true, data: quiz});
                        });
                }
            });
    });
});

quizSchema.static("editQuestion", (id:string, id_question:string, question:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(question)) {
            return reject(new TypeError("User is not a valid object."));
        }        
        
        let ObjectID = mongoose.Types.ObjectId;  
        let body:any = question;
        
        Quiz.update({'_id':id, 'question':{$elemMatch: {'_id': new ObjectID(id_question)}}}, {
            $set: {
                'question.$.name':body.name,
                'question.$.type':body.type,
                'question.$.select_options': body.select_option
            }
        })
            .exec((err, quiz) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: quiz});
            });
    });
});

let Quiz = mongoose.model("Quiz", quizSchema);
  
export default Quiz;
