/* eslint-disable no-process-env */
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

client.connect();

query = client.query(
            "CREATE TYPE gender AS ENUM ('male', 'female', 'other');" +
            "CREATE TABLE users(" +
            "id SERIAL PRIMARY KEY," +
            "name VARCHAR(40) not null," +
            "gender gender);"
        );

query.on( "end", () => client.end() );
