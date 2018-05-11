import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    initiator_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receiver_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    accepted: {type: Boolean, default: false, trim: true},
    meeting_address: {type: String, trim: true},
    meeting_datetime: {type: Date},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;