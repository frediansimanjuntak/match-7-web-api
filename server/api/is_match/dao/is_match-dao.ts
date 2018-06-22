import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import isMatchSchema from "../model/is_match-model";
import MatchDAO from "../../match/dao/match-dao";

isMatchSchema.static("createLikeIsMatch", (is_match:Object, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(is_match)) {
            return reject(new TypeError("Match is not a valid object."));
        }            

        IsMatch.checkAvailable(userId, is_match['to']).then((ava) => {
            if (ava.success == true && ava.data) {
            resolve({success:true, message: "You have like/unlike this people before"})
            }
            else if (ava.success == true && ava.available == true){
            var _match = new IsMatch(is_match);
                _match.status = "like";
                _match.from = userId;
                _match.save((err, saved) => {
                    if (err) {
                        reject({success:false, message: err.message})
                    }
                    else if (saved) {
                        IsMatch.createMatch(userId).then((match) => {
                            resolve(match);
                        })
                    }
                })
            }
        })
    });
});

isMatchSchema.static("createUnLikeIsMatch", (is_match:Object, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(is_match)) {
            return reject(new TypeError("Match is not a valid object."));
        }            

        IsMatch.checkAvailable(userId, is_match['to']).then((ava) => {
            var _match;
            if (ava.success == true && ava.data) {
                _match = ava.data;
            }
            else if (ava.success == true && ava.available == true){
                _match = new IsMatch(is_match);                
            }
            _match.status = "unlike";
            _match.from = userId;
            _match.save((err, saved) => {
                if (err) {
                    reject({success:false, message: err.message})
                }
                else if (saved) {
                    resolve(saved);
                }
            })
        })
    });
});

isMatchSchema.static("checkAvailable", (from: string, to: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {

        let _query = {'from':from, 'to':to, $or:[{'status':"like"}, {'status':"unlike"}]};
        IsMatch.findOne(_query)
            .exec((err, match) => {
                if (err) {
                    reject({success:false, message: err.message});
                }
                else if (match) {
                    resolve({success:true, data: match});
                }
                else {
                    resolve({success:true, available: true});
                }
            })
    });
});

isMatchSchema.static("createMatch", (to: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {

        let _query = {'to':to, 'status': "like"};
        IsMatch.findOne(_query)
            .exec((err, match) => {
                if (err) {
                    reject({success:false, message: err.message})
                }
                else if (match) {
                    console.log(match);
                    var data = {
                        initiator:match.from,
                        receiver:match.to
                    }
                    MatchDAO.createMatch(data).then(result => resolve({success:true, data: result}));
                }
                else {                                        
                    resolve({success:true, message: "match not created because one of them not like each other"});
                }
            });
    });
});

let IsMatch = mongoose.model("IsMatch", isMatchSchema);
  
export default IsMatch;