var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
config = require('.././server/config');
usercontroller = require('../controllers/userController');
var request = require('request');
functions = require('../helpers/functions');
    


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Prospect');
});


router.use(function (req, res, next) {
  req.response = { status: false, message: "error" };
  next();
});



/* Function used for login. */
router.post('/login', usercontroller.login, (req, res, next) => {
  res.json(req.response)
});



router.use(function (req, res, next) {
  //console.log(req.headers);
  var token = req.headers['authtoken'];
  var refreshtoken = req.headers['refreshtoken'];
  if (refreshtoken) {
    jwt.verify(refreshtoken, config.jwt_secret, function (err, decoded) {
      if (err) {
        res.setHeader('Authentication', false)
        return res.json({ status: false, Authentication: false, message: "Failed to authenticate token.", invalidToken: true });
      } else {
        res.setHeader('Authentication', true)
        req.decoded = decoded;
        var newtoken = jwt.sign({ "email": req.decoded.email, "member_id": req.decoded.member_id }, config.jwt_secret, {
          expiresIn: "24h"
        });
        var newrefreshtoken = jwt.sign({ "email": req.decoded.email, "member_id": req.decoded.member_id }, config.jwt_secret, {
          expiresIn: "2400h"
        });
        res.setHeader('AuthToken', newtoken)
        res.setHeader('RefreshToken', newrefreshtoken)

        next();
      }
    });
  } else {

    if (token) {
      jwt.verify(token, config.jwt_secret, function (err, decoded) {
        if (err) {
          res.setHeader('Authentication', false)
          return res.json({ status: false, Authentication: false, message: "Failed to authenticate token.", invalidToken: true });
        } else {
          res.setHeader('Authentication', true)
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.setHeader('Authentication', false)
      return res.json({
        status: false,
        message: "Failed to authenticate token.",
      })
    }
  }

})



router.post('/getUserDetails',  usercontroller.userDetails, (req, res, next) => {
  res.json(req.response)
});

module.exports = router;
