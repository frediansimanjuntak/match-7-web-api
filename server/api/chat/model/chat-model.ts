import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    sender_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receive_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    is_read: {type: Boolean, default: false, trim: true},
    chat: {type: String, trim: true},
    type:{type: String,  enum: ['text','file'], trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;