import * as mongoose from "mongoose";

var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    status: {type: String,  enum: ['like','unlike'], trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;