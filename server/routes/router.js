/* eslint-disable new-cap */
"use strict";

var express = require( "express" );
var router = express.Router();
var users = require( "./users/users.js" );

router.use( "/users", users );

module.exports = router;
