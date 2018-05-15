import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: {type: String, required: true, trim: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default schema;
