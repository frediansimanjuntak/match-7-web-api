"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    initiator_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receiver_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    accepted: { type: Boolean, default: false, trim: true },
    meeting_address: { type: String, trim: true },
    meeting_datetime: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = schema;
//# sourceMappingURL=user_match-model.js.map