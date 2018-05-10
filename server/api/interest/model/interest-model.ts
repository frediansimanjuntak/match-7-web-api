import * as mongoose from "mongoose";

let schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
