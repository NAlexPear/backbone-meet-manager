/* eslint-disable new-cap, no-process-env, no-console */
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


module.exports = function handleUserUpdate( req, res ){
    var results = [];

    // grab data from the url params
    var id = req.params.user_id;

    // compile data from the http request
    var data = {
        "name": req.body.name,
        "gender": req.body.gender
    };

    // set up universal error handler
    function handleError( error, done ){
        done();
        console.log( error );

        return res.status( 500 ).json( {
            "success": false,
            "data": error
        } );
    }

    // use connection pool to get postgres client
    pg.connect(
        connectionString,
        function handleConnection( error, client, done ){
            var query;

            if( error ){
                handleError( error, done );
            }

            client.query(
                "UPDATE users SET name=($1), gender=($2) WHERE id=($3);",
                [ data.name, data.gender, id ]
            );

            query = client.query(
                "SELECT * FROM users ORDER BY id ASC;"
            );

            query.on(
                "row",
                function streamByRow( row ){
                    results.push( row );
                }
            );

            query.on(
                "end",
                function finishQueries(){
                    done();

                    return res.json( results );
                }
            );
        }
    );
};
