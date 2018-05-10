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
    quiz_qns: {type: String, required: true, trim: true},
    quiz_answer: {type: String, required: true, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
