"use strict";

var express = require( "express" );
var app = express();
var bodyParser = require( "body-parser" );
var router = require( "./routes/router.js" );

app.use( bodyParser.urlencoded( {
    "extended": true
} ) );

app.use( bodyParser.json() );

app.use( function setAccessControl( req, res, next ){
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

app.use( "/api/v1", router );

app.listen( 3000, function confirmListener(){
    process.stdout.write( "\nBackbone application listening on port 3000...\n\n" );
} );
