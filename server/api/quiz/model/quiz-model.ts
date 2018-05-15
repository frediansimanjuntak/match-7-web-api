import * as mongoose from "mongoose";

var Schema = mongoose.Schema;
let schema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    disabled: {type: Boolean, default: false, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
