"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    disabled: { type: Boolean, default: false, trim: true },
    question: [{
            name: { type: String, trim: true },
            type: { type: String, enum: ['select', 'text', 'date', 'number'], trim: true },
            select_options: [],
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now }
        }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
exports.default = schema;
//# sourceMappingURL=quiz-model.js.map