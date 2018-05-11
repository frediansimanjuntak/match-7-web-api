import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    interest_id: {
        type: Schema.Types.ObjectId,
        ref: 'interests'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;