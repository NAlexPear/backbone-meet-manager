/* eslint-disable no-console, complexity */
"use strict";

// Libraries
var _ = require( "underscore" );

// Express Application
var express = require( "express" );
var app = express();
var bodyParser = require( "body-parser" );
var router = require( "./routes/router.js" );

// Authentication
var passport = require( "passport" );
var Strategy = require( "passport-http" ).BasicStrategy;
var queryUsersByUsername = require( "./helpers/queryUsers.js" );

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

app.use( bodyParser.urlencoded( {
    "extended": true
} ) );

app.use( bodyParser.json() );

app.use( function setAccessControl( req, res, next ){
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    next();
} );

app.use( "/api/v1", router );

app.get(
    "/test/login",
    passport.authenticate( "basic", { "session": false } ),
    function handleAuthentication( req, res ){
        res.json( {
            "username": req.user.username,
            "email": req.user.email
        } );
    }
);

app.listen( 3000, function confirmListener(){
    process.stdout.write( "\nExpress application listening on port 3000...\n\n" );
} );
