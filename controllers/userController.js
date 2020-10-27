    let express = require('express');
    app = express();
    jwt = require('jsonwebtoken');
    user = require('.././models/userModel');
    functions = require('../helpers/functions');
    Password = require("node-php-password");
    config = require('.././server/config');

    const assert = require('assert');
    var request = require('request');
    moment = require('moment');

 

let handler = {

    index(req, res, next) {
        next();
    },



    login(req, res, next) {
       
        if (!req.body.email) {
            req.response.message = "Email is required.";
            next();
        } else if (!req.body.password) {
            req.response.message = "Password is required.";
            next();
        } else {
            user.getUserDetailsForLogin(req.body.email).then((result) => {
                if (result.length) {
  
                
                    if(result[0].active == 'Y'){
                        if(Password.verify( req.body.password , result[0].password)){ 
                            
                            req.response.user_id = result[0].user_id;
                            var newtoken = jwt.sign({ "email": result[0].email, "user_id": result[0].user_id ,"office_id" : result[0].office_id , "region_id" : result[0].region_id , "division_id" : result[0].division_id, "dealer_id" : result[0].dealer_id , "user_type" : result[0].user_type ,"first_name": result[0].first_name,"last_name": result[0].last_name,"phone": result[0].phone,version : parseInt(process.env.VERSION)
                            }, config.jwt_secret, {
                                expiresIn: "336h"
                            });
                            var newrefreshtoken = jwt.sign({ "email": result[0].email, "user_id": result[0].user_id ,"office_id" : result[0].office_id , "region_id" : result[0].region_id , "division_id" : result[0].division_id, "dealer_id" : result[0].dealer_id ,"user_type" : result[0].user_type,"first_name": result[0].first_name,"last_name": result[0].last_name,"phone": result[0].phone, version : parseInt(process.env.VERSION) }, config.jwt_secret, {
                                expiresIn: "360h"
                            });
                            res.setHeader('AuthToken', newtoken)
                            res.setHeader('RefreshToken', newrefreshtoken)
                            // if(req.body.fcm_token != '' && req.body.fcm_token != undefined){
                            //     let fcmArray = { "fcm_token": req.body.fcm_token };
                            //     functions.update('user_master', fcmArray, { user_id: result[0]['user_id'] })
                            //     .then((respo) => {
                            //     })
                            // }
                            
                            delete result[0].password;
                            req.response.data = result[0];
                            req.response.status = true;
                            req.response.message = "Logged In Successfully.";
                            next();
                        }else{
                            req.response.message = "Incorrect password.";
                            next();
                        }
                    }else{
                        req.response.message = "You are blocked by admin.";
                        next();
                    }
            
                        
                } else {
                    req.response.message = "Incorrect login credentials. Please retry.";
                    next();
                }
            }).catch((err) => {
                req.response.message = err + "Oops! something went wrong.";
                next();
            })
        }

    },

   

    userDetails(req, res, next) {
        user.getUserByEmail('user@gmail.com').then((result) => {
            req.response.data = result[0];
            req.response.status = true;
            req.response.message = "Logged In Successfully.";
            next();
        }).catch((err) => {
            req.response.message = err + "Oops! something went wrong.";
            next();
        })
    },


}

module.exports = handler;
