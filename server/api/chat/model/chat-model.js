"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    sender_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receive_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    is_read: { type: Boolean, default: false, trim: true },
    chat: { type: String, trim: true },
    type: { type: String, enum: ['text', 'file'], trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = schema;
//# sourceMappingURL=chat-model.js.map