/* eslint-disable new-cap, no-console, complexity */
"use strict";

// Libraries
var _ = require( "underscore" );

// Express
var express = require( "express" );
var router = express.Router();

// Authentication
var passport = require( "passport" );
var Strategy = require( "passport-http" ).BasicStrategy;
var queryUsersByUsername = require( "../../helpers/queryUsers.js" );

passport.use( new Strategy(
    function authenticate( username, password, callback ){
        queryUsersByUsername( username, function handleResponse( error, user ){
            if( error && !_.isEmpty( error ) ){
                return callback( error );
            }
            if( _.isEmpty( user ) || user.password != password ){
                return callback( null, false );
            }

            return callback( null, user );
        } );
    }
) );

router.route( "/" ).get(
    passport.authenticate( "basic", { "session": false } ),
    function handleAuthentication( req, res ){
        res.json( {
            "username": req.user.username,
            "email": req.user.email,
            "id": req.user.id
        } );
    }
);

module.exports = router;
