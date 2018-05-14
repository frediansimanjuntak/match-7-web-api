import * as mongoose from "mongoose";

var Schema = mongoose.Schema;
let schema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    disabled: {type: Boolean, default: false, trim: true},
    question:[{
        name: {type: String, trim: true},
        type: {type: String, enum: ['select','text', 'date', 'number'], trim: true},
        select_options: [],        
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
