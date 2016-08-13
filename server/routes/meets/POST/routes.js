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


module.exports = function handleUserPost( req, res ){
    var results = [];

    // get data through http request
    var data = {
        "name": req.body.name,
        "adminId": req.body.adminId,
        "date": req.body.date
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
                "INSERT INTO meets(name, adminid, date) values($1, $2, $3)",
                [ data.name, data.adminId, data.date ]
            );

            query = client.query(
                "SELECT * FROM meets ORDER BY id ASC"
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
