/* eslint-disable new-cap */
"use strict";

var express = require( "express" );
var router = express.Router();
var login = require( "./login/login.js" );
var users = require( "./users/users.js" );
var meets = require( "./meets/meets.js" );

router.use( "/login", login );
router.use( "/users", users );
router.use( "/meets", meets );

module.exports = router;
