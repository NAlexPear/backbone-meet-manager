/* eslint-disable new-cap, no-console */
"use strict";

var express = require( "express" );
var router = express.Router();
var post = require( "./POST/routes.js" );
var read = require( "./GET/routes.js" );
var update = require( "./PUT/routes.js" );
var remove = require( "./DELETE/routes.js" );

router.route( "/" )
    .get( read )
    .post( post );

router.route( "/:user_id" )
    .put( update )
    .delete( remove );

module.exports = router;
