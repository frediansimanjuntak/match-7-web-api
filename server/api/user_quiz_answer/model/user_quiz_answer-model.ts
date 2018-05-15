import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: 'quiz'
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    answer: {type: String, required: true, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
