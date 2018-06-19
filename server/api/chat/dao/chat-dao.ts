import * as mongoose from "mongoose";
import * as Promise from "bluebird";
import * as _ from "lodash";
import chatSchema from "../model/chat-model";

chatSchema.static("getAll", ():Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

        Chat.find(_query)
            .exec((err, chats) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: chats});
            });
    });
});

chatSchema.static("getByMatch", (userId: string, matchId: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {$or:[{'sender':userId}, {'receiver':userId}], 'matchId':matchId};

        Chat.find(_query)
            .exec((err, chats) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: chats});
            });
    });
});

chatSchema.static("getById", (id: string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!id) {
          return reject(new TypeError("Quiz is not a valid object."));
        }

        Chat.findById(id)
            .exec((err, chat) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: chat});
            });
    });
});

chatSchema.static("createChat", (chat:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(chat)) {
        return reject(new TypeError("Chat is not a valid object."));
      }

      var _chat = new Chat(chat);

      _chat.save((err, saved) => {
        err ? reject({success:false, message: err.message})
            : resolve({success:true, data: saved});
      });
    });
});

chatSchema.static("updateChat", (id:string, chat:Object):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isObject(chat)) {
            return reject(new TypeError("Chat is not a valid object."));
        }        
        Chat.update({'_id':id}, {
            $set: chat
        })
            .exec((err, chat) => {                
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: "Updated success"});
            });
    });
});

chatSchema.static("deleteChat", (id:string):Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError("Id is not a valid string."));
        }

        Chat.findByIdAndRemove(id)
            .exec((err, deleted) => {
              err ? reject({success:false, message: err.message})
                  : resolve({success:true, data: {message:"Deleted success"}});
            });
    });
});

let Chat = mongoose.model("Chat", chatSchema);
  
export default Chat;
