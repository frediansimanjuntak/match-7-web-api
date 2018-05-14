import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import interestSchema from "../model/interest-model";

interestSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Interest.find(_query)
            .exec((err, interests) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: interests});
            });
    });
});

interestSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("Interest is not a valid object."));
        }

        Interest.findById(id)
            .exec((err, interest) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: interest});
            });
    });
});

interestSchema.static("createInterest", (interest:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(interest)) {
        return reject(new TypeError("Interest is not a valid object."));
      }

      var _interest = new Interest(interest);

      _interest.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

interestSchema.static("updateInterest", (id:string, interest:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(interest)) {
            return reject(new TypeError("interest is not a valid object."));
        }        

        Interest.findByIdAndUpdate(id, interest)
            .exec((err, interest) => {
                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: interest});
            });
    });
});

interestSchema.static("deleteInterest", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Interest.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let Interest = mongoose.model("Interest", interestSchema);
  
export default Interest;
