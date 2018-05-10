import * as mongoose from "mongoose";

let schema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    disabled: {type: Boolean, default: false, trim: true},
    question:[{
        name: {type: String, trim: true},
        type: {type: String, trim: true},
        select_options: [{
            name: {type: String, trim: true},
        }],        
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
