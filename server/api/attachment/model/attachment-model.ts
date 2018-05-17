import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    filename: {type: String},
	path: {type: String},
	size: {type: String},
	mimetype: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
