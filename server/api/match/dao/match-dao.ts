import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import matchSchema from "../model/match-model";

matchSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Match.find(_query)
            .exec((err, matches) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: matches});
            });
    });
});

matchSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("Match is not a valid object."));
        }

        Match.findById(id)
            .exec((err, match) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: match});
            });
    });
});

matchSchema.static("createMatch", (match:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(match)) {
        return reject(new TypeError("Match is not a valid object."));
      }

      var _match = new Match(match);

      _match.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

matchSchema.static("updateMatch", (id:string, match:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(match)) {
            return reject(new TypeError("Match is not a valid object."));
        }        

        Match.findByIdAndUpdate(id, match)
            .exec((err, match) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: match});
            });
    });
});

matchSchema.static("deleteMatch", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Match.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});


let Match = mongoose.model("Match", matchSchema);
  
export default Match;