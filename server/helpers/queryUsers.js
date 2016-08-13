/* eslint-disable no-process-env, no-console */
"use strict";

var pg = require( "pg" );
var path = require( "path" );
var configUrl = require(
    path.join(
        __dirname.split( "server" )[0],
        "conf",
        "db",
        "config.json"
    )
).url;
var connectionString = process.env.DATABASE_URL || configUrl;
var client = new pg.Client( connectionString );
var query;

function queryUsersByUsername( username, callback ){
    client.connect();

    console.log( `query made for user ${username}` );

    query = client.query(
        "SELECT * FROM users WHERE username=$1;",
        [ username ]
    );

    query.on(
        "row",
        ( row, result ) => {
            result.addRow( row );
        }
    );

    query.on(
        "error",
        ( error ) => {
            console.log( error );

            client.end();
        }
    );

    query.on(
        "end",
        ( result ) => {
            var error = {};
            var user;

            if( callback && typeof callback === "function" ){
                if( result.rows.length > 1 ){
                    error = new Error( "Duplicate users exist with that username" );
                }
                else{
                    user = result.rows[ 0 ];
                }

                callback( error, user );
            }

            client.end();
        }
    );
}

module.exports = queryUsersByUsername;
