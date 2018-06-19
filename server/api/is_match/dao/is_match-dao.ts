import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import isMatchSchema from "../model/is_match-model";
import MatchDAO from "../../match/dao/match-dao";

isMatchSchema.static("createLikeIsMatch", (match:Object, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(match)) {
        return reject(new TypeError("Match is not a valid object."));
      }      

      var _match = new IsMatch(match);
      _match.status = "like";
      _match.from = userId;
      _match.save((err, saved) => {
          if (err) {
            reject({success:false, message: err.message})
          }
          else if (saved) {
            let _query = {'to':userId, 'status': "like"};
            IsMatch.findOne(_query)
                .exec((err, match) => {
                    if (err) {
                        reject({success:false, message: err.message})
                    }
                    else if (match) {
                        var data = {
                            initiator:match.from,
                            receiver:match.to
                        }
                        MatchDAO.createMatch(data);
                        resolve({success:true, data: saved});
                    }
                });
          }
      });
    });
});

isMatchSchema.static("createUnLikeIsMatch", (match:Object, userId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(match)) {
        return reject(new TypeError("Match is not a valid object."));
      }      

      var _match = new IsMatch(match);
      _match.status = "unlike";
      _match.from = userId;
      _match.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

let IsMatch = mongoose.model("IsMatch", isMatchSchema);
  
export default IsMatch;