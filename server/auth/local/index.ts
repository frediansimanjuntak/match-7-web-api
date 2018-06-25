'use strict';

import * as express from 'express';
var passport = require('passport')
import {signToken} from '../auth-service';
import {api_qs} from '../../global/func/api_qs';
import User from '../../api/user/dao/user-dao';

var router = express.Router();


router.post('/', function(req, res, next) {
  api_qs.login(req.body).then((result) => {
    if(result.success == 1) {
      let data = {
        'user_id': result.user_id,
        'email': req.body.email,
        'authentication': {            
          'application_key':req.body.application_key,
          'session_key': result.session_key
        }
      }
      User.loginRegister(data).then((result) => {
        if (result.success == true) {
          passport.authenticate('local.user', function(err, user, info) {
            var error = err || info;
            var remember;
            if(error) {
              if(error.message == "Missing credentials"){
                return res.status(401).json({message: "Incomplete Data Username/Password to logged in", code: 413});
              }      
              else{
                return res.status(401).json(error);
              }
            }
            if(!user) {
              return res.status(404).json({message: 'Something went wrong, please try again.', code: 404});
            }    
            if(user._id && user.email) {
              User.updateAuthUser(user._id, data).then((result) => {  
                if (result.success == true) {              
                  var token = signToken(user._id);
                  res.json({ success: true, data:{token} });
                }          
              })
            }
            else{
              res.json({message: 'please login first.'});
            }    
          })(req, res, next);
        }
      })
      .catch(err => {return res.status(401).json({message: "Incomplete Data Username/Password to logged in", code: 413});})      
    }
    else if(result.success == 0) {
      return res.status(401).json({message: "Incorrect Username/Password", code: 413});
    }
    else {      
      return res.status(401).json({message: "Incomplete Data Username/Password to logged in", code: 413});
    }
  })  
  .catch(err => {return res.status(401).json({message: "Incomplete Data Username/Password to logged in", code: 413});})
});

export default router;
