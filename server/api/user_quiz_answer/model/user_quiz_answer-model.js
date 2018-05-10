"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: 'quiz'
    },
    quiz_qns: { type: String, required: true, trim: true },
    quiz_answer: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = schema;
//# sourceMappingURL=user_quiz_answer-model.js.map