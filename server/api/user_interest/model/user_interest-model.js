"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    interest_id: {
        type: Schema.Types.ObjectId,
        ref: 'interests'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = schema;
//# sourceMappingURL=user_interest-model.js.map