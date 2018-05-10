"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var sha256 = require('sha256');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UsersSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phone: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, select: false },
    first_name: { type: String, lowercase: true, trim: true },
    last_name: { type: String, lowercase: true, trim: true },
    nickname: { type: String, trim: true },
    language: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female'], trim: true },
    dob: { type: Date, trim: true },
    last_known_lat: { type: String, trim: true },
    last_known_lng: { type: String, trim: true },
    verification: {
        code: { type: String, required: true, trim: true },
        verified: {
            type: { type: String, enum: ['email', 'phone'], trim: true },
            status: { type: Boolean, default: false, trim: true }
        }
    },
    disabled: { type: Boolean, default: false, trim: true },
    status: { type: String, trim: true },
    role: { type: String, enum: ['user', 'admin'], trim: true },
    education: [{
            type: { type: String, trim: true },
            school_name: { type: String, trim: true },
        }],
    occupation: [{
            job_title: { type: String, trim: true },
            company_name: { type: String, trim: true },
        }],
    interest: [{
            type: Schema.Types.ObjectId,
            ref: 'interest'
        }],
    photo: [{
            name: { type: String, trim: true },
            url: { type: String, trim: true },
        }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// Public profile information
UsersSchema
    .virtual('profile')
    .get(function () {
    return {
        name: this.name,
        role: this.role
    };
});
// Non-sensitive info we'll be putting in the token
UsersSchema
    .virtual('token')
    .get(function () {
    return {
        _id: this._id,
        role: this.role,
    };
});
/**
 * Validations
 */
// Validate empty email
UsersSchema
    .path('email')
    .validate(function (email) {
    return email.length;
}, 'Email cannot be blank');
// Validate empty password
UsersSchema
    .path('password')
    .validate(function (password) {
    return password.length;
}, 'password null');
// Validate email is not taken
UsersSchema
    .path('email')
    .validate(function (value, respond) {
    var _this = this;
    return this.constructor.findOne({ email: value }).exec()
        .then(function (user) {
        if (user) {
            if (_this.id === user.id) {
                return respond(true);
            }
            return respond(false);
        }
        return respond(true);
    })
        .catch(function (err) {
        throw err;
    });
}, 'The specified email address is already in use.');
UsersSchema
    .path('username')
    .validate(function (value, respond) {
    var _this = this;
    return this.constructor.findOne({ username: value }).exec()
        .then(function (user) {
        if (user) {
            if (_this.id === user.id) {
                return respond(true);
            }
            return respond(false);
        }
        return respond(true);
    })
        .catch(function (err) {
        throw err;
    });
}, 'The specified username is already in use.');
var validatePresenceOf = function (value) {
    return value && value.length;
};
/**
 * Pre-save hook
 */
UsersSchema
    .pre('save', function (next) {
    var _this = this;
    // Handle new/update passwords
    if (!this.isModified('password')) {
        return next();
    }
    if (!validatePresenceOf(this.password)) {
        return next(new Error('Invalid password'));
    }
    this.encryptPassword(this.password, function (encryptErr, hashedPassword) {
        if (encryptErr) {
            return next(encryptErr);
        }
        _this.password = hashedPassword;
        return next();
    });
});
/**
 * Methods
 */
UsersSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate: function (password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }
        bcrypt.compare(sha256(password), this.password, function (err, res) {
            if (res) {
                return callback(null, true);
            }
            else {
                return callback(null, false);
            }
        });
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword: function (password, callback) {
        if (!password) {
            if (!callback) {
                return null;
            }
            else {
                return callback('Missing password or salt');
            }
        }
        if (!callback) {
            bcrypt.hash(sha256(password), 10, function (err, hash) {
                return hash;
            });
        }
        else {
            bcrypt.hash(sha256(password), 10, function (err, hash) {
                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, hash);
                }
            });
        }
    }
};
exports.default = UsersSchema;
//# sourceMappingURL=user-model.js.map