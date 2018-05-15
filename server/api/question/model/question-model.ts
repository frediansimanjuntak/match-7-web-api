import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    question: {type: String, trim: true},
    type: {type: String, enum: ['select','text', 'date', 'number'], trim: true},
    select_options: [],        
    disabled: {type: Boolean, default: false, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
