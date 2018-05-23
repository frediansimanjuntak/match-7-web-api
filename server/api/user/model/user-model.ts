import * as mongoose from "mongoose";

const sha256 = require('sha256');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let UsersSchema = new mongoose.Schema({
    first_name: {type: String, lowercase: true, trim: true},
    last_name: {type: String, lowercase: true, trim: true},
    username: {type: String, unique: true, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true},
    phone: {type: String, unique: true, trim: true},
    password: {type: String, required: true, select: false},
    nickname: {type: String, trim: true},
    language: {type: String, trim: true},
    gender: {type: String,  enum: ['male','female'], trim: true},
    dob: {type: Date, trim: true},
    last_known_lat: {type: String, trim: true},
    last_known_lng: {type: String, trim: true},
    verification: {
      code:{type: String, trim: true},
      verified:{        
        type:{type: String,  enum: ['email','phone'], trim: true},
        status: {type: Boolean, default: false, trim: true}        
      }
    },
    google2fa:{
      disabled:{type: Boolean, default: false, trim: true},
      secret:{type: String, trim: true},
      barcode:{type: String, trim: true}
    },
    disabled: {type: Boolean, default: false, trim: true},
    status: {type: String, trim: true},
    role: {type: String,  enum: ['user','admin'], default: 'user', trim: true},
    education: [{
      type: {type: String, enum: ['degree','master','doctorate','diploma','high school'], trim: true},
      school_name: {type: String, trim: true},
    }],
    occupation: [{
      job_title: {type: String, trim: true},
      company_name: {type: String, trim: true},
    }],
    interest: [{
      type: Schema.Types.ObjectId,
		  ref: 'Interests'	
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Public profile information
UsersSchema
  .virtual('profile')
  .get(function() {
    return {
      name: this.name,
      role: this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UsersSchema
  .virtual('token')
  .get(function() {
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
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UsersSchema
  .path('password')
  .validate(function(password) {
    return password.length;
  }, 'password null');

// Validate email is not taken
UsersSchema
  .path('email')
  .validate(function(value, respond) {
    return this.constructor.findOne({ email: value }).exec()
      .then(user => {
        if(user) {
          if(this.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

  UsersSchema
  .path('username')
  .validate(function(value, respond) {
    return this.constructor.findOne({ username: value }).exec()
      .then(user => {
        if(user) {
          if(this.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified username is already in use.');


var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UsersSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if(!this.isModified('password')) {
      return next();
    }

    if(!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'));
    }
    this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
      if(encryptErr) {
        return next(encryptErr);
      }
      this.password = hashedPassword;
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
  authenticate(password, callback) {
    if(!callback) {
      return this.password === this.encryptPassword(password);
    }

    bcrypt.compare(sha256(password), this.password, function(err, res) {
        if(res) {
          return callback(null, true);
        }
        else{
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
  encryptPassword(password, callback) {
    if(!password) {
      if(!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    if(!callback) {
      bcrypt.hash(sha256(password), 10, function(err, hash){
        return hash;
      });
    }
    else{
      bcrypt.hash(sha256(password), 10, function(err, hash){
        if(err) {
          return callback(err);
        } else {
          return callback(null, hash);
        }
      });
    }
  }
};

export default UsersSchema;